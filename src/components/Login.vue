<template>
    <div class="view login">
        <form class="login-form" @submit.prevent="Login">
            <div class="form-inner">
                <h1>Se connecter à Electric Chat ⚡</h1>
                <label for="username">Pseudo</label>
                <input type="text" v-model="inputUsername" placeholder="Pseudo..." />
                <label for="password">Mot de passe</label>
                <input type="text" v-model="inputPassword" placeholder="Mot de passe" />
                <input type="submit" value="Se connecter" />
                <p>Pas de compte ? <router-link to="/register">S'inscrire</router-link></p>
            </div>
        </form>
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

<style lang="scss"></style>
