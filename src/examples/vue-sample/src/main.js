import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { AuthPlugin } from 'veda-auth-vue';


const app = createApp(App);


const authConfig = {
    clientId: 'veda-tk5a3inut1y0ot5rvoc7-10000000',
    clientSecret: 'zQQUrVvsxSEwZhpLBi6nDVGaruULfZ0lhr2td62K',
    vedaAuthBaseUrl: 'http://localhost:8081/api/v1',
    redirectUri: 'http://localhost:5173/callback/'
};


const authPlugin = new AuthPlugin(authConfig);
app.use(authPlugin);

app.use(router);
app.mount('#app');
