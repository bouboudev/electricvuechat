import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { getAuth } from 'firebase/auth';

// Créez une fonction asynchrone pour initier l'application
const initializeApp = async () => {
  const auth = getAuth();

  // Utilisez une promesse pour attendre la récupération de l'état de l'utilisateur
  return new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await store.dispatch('fetchUser');
      }

      // Résolvez la promesse pour indiquer que l'initialisation est terminée
      resolve();
    });
  });
};

// Appelez la fonction asynchrone et montez l'application une fois terminée
initializeApp().then(() => {
  createApp(App).use(store).use(router).mount('#app');
});
