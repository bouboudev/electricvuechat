<template>
    <div class="view login">
        <form class="login-form" @submit.prevent="register">
            <div class="form-inner">
                <h1>S'inscrire à Electric Chat ⚡</h1>
                <label for="username">Email</label>
                <input type="email" v-model="register_form.email" placeholder="Email..." />
                <label for="username">Pseudo</label>
                <input type="text" v-model="register_form.username" placeholder="Pseudo..." />
                <label for="password">Mot de passe</label>
                <input type="password" v-model="register_form.password" placeholder="Mot de passe" />
                <label for="password">Confirmer le mot de passe</label>
                <input type="password" v-model="register_form.password_confirmation" placeholder="Confirmer le mot de passe" />
                <input type="submit" value="S'inscrire" />
                <p>J'ai déjà un compte  <router-link to="/">Se connecter</router-link></p>

            </div>
        </form>
    </div>
</template>

<script>
import { reactive,  } from "vue";
import {useStore} from "vuex";

export default {
    setup() {
        const register_form = reactive({
            email: "",
            password: "",
            username: "",
        });
        const store = useStore();


        const register = async () => {
            if (register_form.password !== register_form.password_confirmation) {
                alert("Les mots de passe ne correspondent pas");
                return;
            }
            store.dispatch('register', { email: register_form.email, password: register_form.password, username: register_form.username });
        }

        return {
            register_form,
            register,
        }
    }
}
</script>

<style lang="scss"></style>
