<template>
    <div class="view chat">
        <header>
            <button class="logout" @click="Logout">Se déconnecter</button>
            <h1>Bienvenue, {{ state.username }}</h1>
        </header>

        <section class="chat-box">
            <div v-for="message in state.messages" :key="message.key" :class="message.username == state.username
                ? 'message current-user'
                : 'message'
                ">
                <div class="message-inner">
                    <div class="username">{{ message.username }}</div>
                    <div class="content">{{ message.content }}</div>
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
import db from "../db";
export default {

    setup() {
        const inputUsername = ref("");
        const inputMessage = ref("");

        const state = reactive({
            username: "",
            messages: [],
        });

        const Login = () => {
            if (inputUsername.value != "" || inputUsername.value != null) {
                state.username = inputUsername.value;
                inputUsername.value = "";
            }
        };

        const Logout = () => {
            state.username = "";
        }
        const SendMessage = () => {
            const messageRef = db.database().ref("messages");

            if (inputMessage.value === "" || inputMessage.value === null) {
                return;
            }
            const message = {
                username: state.username,
                content: inputMessage.value,
            };
            messageRef.push(message);
            inputMessage.value = "";
        }

        onMounted(() => {
            const messagesRef = db.database().ref("messages");
            // verifie si nouveau message ajouté si changement il envoi snapshot de la base de donné et mettra à jour
            messagesRef.on('value', snapshot => {
                const data = snapshot.val();
                let messages = [];
                // parcourir l'ensemble des messages de la base avec username id et content
                Object.keys(data).forEach(key => {
                    messages.push({
                        id: key,
                        username: data[key].username,
                        content: data[key].content
                    });
                });
                state.messages = messages;
            });
        });

        return {
            inputUsername,
            Login,
            state,
            inputMessage,
            SendMessage,
            Logout
        }
    }
}
</script>

<style lang="scss">

</style>