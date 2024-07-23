import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createAuth } from 'veda-auth-vue';

createApp(App)
    .use(
        createAuth({
            clientId: "veda-pkqyyfdzz6ynfry2drcm-10000000",
            clientSecret: "KU637WRB7ZwesSJMZPxN1PRtaDArALjhiwMlPqWI",
            vedaAuthBaseUrl: "http://localhost:8081/api/v1",
            redirectUri: "http://localhost:5173/callback/",
        })
    )
    .mount("#app");