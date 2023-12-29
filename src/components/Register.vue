<template>
    <div class="view login">
        <form class="login-form" @submit.prevent="register">
            <div class="form-inner">
                <h1>S'inscrire à Electric Chat ⚡</h1>
                <label for="username">Email</label>
                <input type="email" v-model="register_form.email" placeholder="Email..." />
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
import { reactive, onMounted, ref } from "vue";
import {useStore} from "vuex";

export default {
    setup() {
        const register_form = reactive({
            email: "",
            password: "",
        });
        const store = useStore();


        const register = async () => {
            console.log("register", register_form);
            // confirmer le mot de passe
            if (register_form.password !== register_form.password_confirmation) {
                alert("Les mots de passe ne correspondent pas");
                return;
            }
            store.dispatch('register', register_form);
        }

        return {
            register_form,
            register,
        }
    }
}
</script>

<style lang="scss"></style>
