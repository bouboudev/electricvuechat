<template>
    <div class="view login">
        <form class="login-form" @submit.prevent="Register">
            <div class="form-inner">
                <h1>S'inscrire à Electric Chat ⚡</h1>
                <label for="username">Pseudo</label>
                <input type="text" v-model="inputUsername" placeholder="Pseudo..." />
                <label for="password">Mot de passe</label>
                <input type="password" v-model="inputPassword" placeholder="Mot de passe" />
                <label for="password">Confirmer mot de passe</label>
                <input type="password" v-model="inputSamePassword" placeholder="Mot de passe" />
                <input type="submit" value="S'inscrire" />
                <p>J'ai déjà un compte  <router-link to="/login">Se connecter</router-link></p>

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
        const inputPassword = ref("");
        const inputSamePassword = ref("");
        const inputMessage = ref("");


        const state = reactive({
            username: "",
            messages: [],
        });

        const Register = () => {
            console.log("register", inputUsername.value, inputPassword.value, inputSamePassword.value);
        };

        const Logout = () => {
            state.username = "";
        }

        onMounted(() => {
        });

        return {
            inputUsername,
            inputPassword,
            Register,
            state,
            inputMessage,
            Logout
        }
    }
}
</script>

<style lang="scss"></style>
