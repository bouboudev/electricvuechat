<template>
    <div class="view chat">
        <header>
            <h1 class="title">Electric Chat ⚡</h1>
            <button class="logout" @click="Logout">Se déconnecter</button>
            <h1>Bienvenue, {{ state.username}}</h1>
        </header>

        <section class="chat-box">
            <div v-for="message in state.messages" :key="message.key" :class="message.username == state.username
                ? 'message current-user'
                : 'message'
                ">
                <div class="message-inner">
                    <div class="username">
                        <OnlineIndicator
                        :online="isUserConnected(message.userId)"
                        />
                        {{ message.username }}
                    </div>

                    <div class="message-content">
                        <div class="content">{{ message.content }}</div>
                        <div v-if="message.username === state.username" class="actions">
                            <div class="edit" @click="EditMessage(message.id, message.content)"> 
                                <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                            </div>
                            <div class="delete" @click="DeleteMessage(message.id, message.username)">
                                <svg xmlns="http://www.w3.org/2000/svg" height="13" width="11" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <form @submit.prevent="editingMessageId !== null ? UpdateMessage() : SendMessage()">
                <input type="text" v-model="inputMessage" placeholder="Écrire un message..." />
                <input type="submit" :value=" editingMessageId ? 'Modifier' : 'Envoyer'" />
            </form>
        </footer>
    </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import { db } from '../firebase/index';
import { ref as firebaseRef, onValue, push, remove, update } from 'firebase/database';
import { useStore } from 'vuex';
import { analyserTexte } from '../ModerateContentService';

import OnlineIndicator from "../components/OnlineIndicator.vue";

export default {
    components: {
        OnlineIndicator,
    },
    setup() {
        const inputMessage = ref("");
        const store = useStore();

        const state = reactive({
            username: store.state.user.displayName,
            email: store.state.user.email,
            messages: [],
        });
        const editingMessageId = ref(null);
        const editedMessageContent = ref("");

        const connectedUsers = ref([]); // Déplacer cette ligne ici

        // Fonction computed qui vérifie si un utilisateur est connecté
        const isUserConnected = (userId) => {
            return connectedUsers.value.some((user) => user.userUId === userId);
        }

        const color = ref('green');

        const Logout = () => {
            store.dispatch('logout');
                    }

        const SendMessage = async () => {
            const messagesRef = firebaseRef(db, "messages");

            if (inputMessage.value === "" || inputMessage.value === null) {
                return;
            }
            const moderationResult = await analyserTexte(inputMessage.value);

            if (moderationResult && moderationResult.bad_words.length > 0) {
            alert('Votre message contient des mots interdits. Veuillez reformuler.');
            return;
            }

            const message = {
                username: state.username,
                email: state.email,
                content: inputMessage.value,
                userId: store.state.user.uid,
            };

            await push(messagesRef, message);
            inputMessage.value = "";
        }
        const DeleteMessage = (id, messageUsername) => {
            if (messageUsername === state.username) {
                const messageRef = firebaseRef(db, `messages/${id}`);
                remove(messageRef);
            }
        }

        const EditMessage = (id, content) => {
            editingMessageId.value = id;
            editedMessageContent.value = content;
            inputMessage.value = content;
        };

        const UpdateMessage = (id, newContent) => {
            if (!editingMessageId.value) {
                return;
            }
            const messageRef = firebaseRef(db, `messages/${editingMessageId.value}`);
            update(messageRef, {
                content: inputMessage.value,
            });

            editingMessageId.value = null;
            editedMessageContent.value = "";
            inputMessage.value = "";
        };


        onMounted(() => {

            const connectedUsersRef = firebaseRef(db, "usersConnected");

            onValue(connectedUsersRef, (snapshot) => {
                const data = snapshot.val();
                let users = [];

                if (data) {
                    Object.keys(data).forEach((key) => {
                        users.push({
                            userUId: data[key].userUId,
                            userDisplayName: data[key].userDisplayName,
                        });
                    });
                }

                connectedUsers.value = users;
            });


            const messagesRef = firebaseRef(db, "messages");

            onValue(messagesRef, (snapshot) => {
                const data = snapshot.val();
                let messages = [];

                if (data) {
                    Object.keys(data).forEach(key => {
                        messages.push({
                            id: key,
                            username: data[key].username,
                            content: data[key].content,
                            userId: data[key].userId,
                            
                        });
                    });
                }

                state.messages = messages;
            });

        });

        return {
            state,
            inputMessage,
            SendMessage,
            Logout,
            DeleteMessage,
            EditMessage,
            UpdateMessage,
            editingMessageId,
            editedMessageContent,
            isUserConnected,
            color,
        }
    }
}

</script>

<style lang="scss" scoped>

.online-indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.online-indicator.online {
    background-color: green;
}

.online-indicator.offline {
    background-color: red;
}


</style>