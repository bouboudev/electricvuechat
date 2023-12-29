import { createStore } from 'vuex';
import router from '../router';
// import { auth } from '../db';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { sendEmailVerification,   } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';

export default createStore({
    state: {
        user: null,
        pseudo: null,
    },
    mutations: {
        SET_USER(state, { user }) {
            state.user = user;
            state.pseudo = user ? user.displayName : null;
        },

        CLEAR_USER(state) {
            state.user = null;
        },
    },
    actions: {
        async login({ commit }, { email, password }) {
            const auth = getAuth();
        
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                if (user.emailVerified) {
                    commit('SET_USER', {user});

                    if (user) {
                        router.push('/Chat');
                    } else {
                        console.error('User not defined after login.');
                    }
                } else {

                    alert("Veuillez vérifier votre email avant de vous connecter.");
                }
            } catch (error) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('User not found');
                        break;
                    case 'auth/wrong-password':
                        alert('Wrong password');
                        break;
                    default:
                        alert('Something went wrong');
                }
            }
        },
        

        async register({ commit }, { email, password, username}) {

            const auth = getAuth();
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
                await updateProfile(auth.currentUser, {
                    displayName: username,
                });

                
                
                await sendEmailVerification(auth.currentUser);
                const updatedUser = await getAuth().currentUser;

                commit('SET_USER', { user: updatedUser });
            } catch (error) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        alert('Email already in use');
                        break;
                    case 'auth/invalid-email':
                        alert('Invalid email');
                        break;
                    case 'auth/operation-not-allowed':
                        alert('Operation not allowed');
                        break;
                    case 'auth/weak-password':
                        alert('Weak password');
                        break;
                    default:
                        alert('Something went wrong');
                }

                return;
            }

            router.push('/');
        },

        async logout({ commit }) {
            const auth = getAuth();
            await signOut(auth);

            commit('CLEAR_USER');

            router.push('/');
        },

        async fetchUser({ commit }) {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                commit('SET_USER', {user});
                console.log('User connecté:', user.displayName);
            } else {
                commit('CLEAR_USER');
                console.log('User déconnecté');
            }
        },
    },
});
