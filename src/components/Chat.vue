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
                    <div class="username">{{ message.username }}</div>
                    <div class="message-content">
                        <div class="content">{{ message.content }}</div>
                        <div v-if="message.username === state.username" class="delete" @click="DeleteMessage(message.id, message.username)">X</div>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <form @submit.prevent="SendMessage">
                <input type="text" v-model="inputMessage" placeholder="Écrire un message..." />
                <input type="submit" value="Envoyer" />
            </form>
        </footer>
    </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import { db } from '../firebase/index';
import { getDatabase, ref as firebaseRef, onValue, push, remove } from 'firebase/database';
import { useStore } from 'vuex';
import ModerateContentService from '../ModerateContentService';
import axios from 'axios';
import { BASE_URL, analyserTexte } from '../ModerateContentService';
export default {
    setup() {
        const inputMessage = ref("");
        const store = useStore();

        const state = reactive({
            username: store.state.user.displayName,
            email: store.state.user.email,
            messages: [],
        });


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
            };

            push(messagesRef, message);
                
            inputMessage.value = "";
        }
        const DeleteMessage = (id, messageUsername) => {
            console.log('messageusername',messageUsername);
            if (messageUsername === state.username) {
                const messageRef = firebaseRef(db, `messages/${id}`);
                remove(messageRef);
                console.log(id);
            }
        }

        onMounted(() => {
            console.log("mounted", state.value);
            const messagesRef = firebaseRef(db, "messages");

            onValue(messagesRef, (snapshot) => {
                const data = snapshot.val();
                let messages = [];

                if (data) {
                    Object.keys(data).forEach(key => {
                        messages.push({
                            id: key,
                            username: data[key].username,
                            content: data[key].content
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
        }
    }
}

</script>

<style lang="scss"></style>