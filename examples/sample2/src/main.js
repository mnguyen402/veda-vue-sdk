import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createAuth } from "veda-auth-vue";

createApp(App)
    .use(
        createAuth({
            clientId: "",
            clientSecret: "",
            vedaAuthBaseUrl: "",
            redirectUri: "",
        })
    )
    .mount("#app");