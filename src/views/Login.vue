<template>
    <div class="view login">
        <form class="login-form" @submit.prevent="login">
            <div class="form-inner">
                <h1>Se connecter à Electric Chat ⚡</h1>
                <label for="username">Email</label>
                <input type="email" v-model="login_form.email" placeholder="Email" />
                <label for="password">Mot de passe</label>
                <input type="password" v-model="login_form.password" placeholder="Mot de passe" />
                <input type="submit" value="Se connecter" />
                <p>Pas encore inscrit ? <router-link to="/register">Inscrivez-vous ici</router-link></p>
            </div>
        </form>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import {useStore} from "vuex";

export default {
    setup() {
        const login_form = reactive({
            email: "",
            password: "",
        });
        const store = useStore();

        const state = reactive({
            username: "",
            messages: [],
        });

        const login = async () => {
            store.dispatch('login', login_form);
        }

        return {
            login_form,
            login,
        }
    }
}
</script>

<style lang="scss"></style>
