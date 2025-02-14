import { createApp } from 'vue'; // Import the createApp function from Vue
import App from './App.vue'; // Import the root component (make sure you have App.vue)
import 'vuetify/styles'; // Import Vuetify styles
import { createVuetify } from 'vuetify'; // Vuetify 3 uses createVuetify

const vuetify = createVuetify(); // No custom theme, just use the default Vuetify theme

createApp(App)
  .use(vuetify) // Use Vuetify in the app
  .mount('#app'); // Mount the app to the DOM

