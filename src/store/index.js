import { createStore } from 'vuex';
import router from '../router';
// import { auth } from '../db';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { sendEmailVerification,   } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { getDatabase, ref as firebaseRef, onValue, push, remove } from 'firebase/database';
import { db } from '../firebase/index';

export default createStore({
    state: {
        user: null,
        pseudo: null,
        connectedUsers: [],
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
                    commit('SET_USER', { user });
                        const usersRef = firebaseRef(db, "usersConnected");
                        // envoi de l'uid de l'utilisateur dans la liste des utilisateurs connectés
                        const userConnected = {
                            userUId: user.uid,
                            userDisplayName: user.displayName,
                        }
                        push(usersRef, userConnected);

                    if (user) {
                        router.push('/Chat');
                    } else {
                        console.error('User not defined after login.');
                    }
                } else {
                    alert('Veuillez vérifier votre email avant de vous connecter.');
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

        async register({ commit }, { email, password, username }) {
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
            const user = auth.currentUser;

            //supprimer l'id de l'utilisateur de la liste des utilisateurs connectés
                const connectedUsersRef = firebaseRef(db, 'usersConnected');
                //créer un tableau d'objet avec les utilisateurs connectés
                const usersConnected = [];
                //récupérer la liste des utilisateurs connectés avec onValue
                onValue(connectedUsersRef, (snapshot) => {
                    const data = snapshot.val();
                    // tout récupérer dans un tableau meme l'id de l'objet de la collection
                    for (let id in data) {
                        usersConnected.push({ id, ...data[id] });
                    }
                });
                // parcourir le tableau usersConnected pour trouver l'objet avec l'id de l'utilisateur déconnecté
                for (let i = 0; i < usersConnected.length; i++) {
                    if (usersConnected[i].userUId === user.uid) {
                        // supprimer l'objet avec l'id de l'utilisateur déconnecté
                        const userRef = firebaseRef(db, `usersConnected/${usersConnected[i].id}`);
                        remove(userRef);
                    }
                }

            await signOut(auth);

            commit('CLEAR_USER');

            router.push('/');
        },

        async fetchUser({ commit }) {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                commit('SET_USER', { user });
            } else {
                commit('CLEAR_USER');
            }
        },
    },
});
