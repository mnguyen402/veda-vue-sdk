import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createAuth } from "veda-auth-vue";

createApp(App)
    .use(
        createAuth({
            clientId: "veda-tk5a3inut1y0ot5rvoc7-10000000",
            clientSecret: "zQQUrVvsxSEwZhpLBi6nDVGaruULfZ0lhr2td62K",
            vedaAuthBaseUrl: "http://localhost:8081/api/v1",
            redirectUri: "http://localhost:5173/callback/",
        })
    )
    .mount("#app");