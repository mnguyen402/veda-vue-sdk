<template>
  <div class="auth-container">
    <h1>Veda Authentication</h1>
    <div v-if="isAuthenticated">
      <button @click="sign_out" class="logout-button">Logout</button>
      <div class="user-info">
        <pre>{{user}}</pre>
      </div>
    </div>
    <div v-else>
      <button @click="login" class="login-button">Login</button>
    </div>
  </div>
</template>
<script>
import { useAuth } from 'veda-auth-vue';

export default {
  setup() {
    const { fetchAuthorizationEndpoint, handleRedirect, fetchUserInfo, user, isAuthenticated, logout } = useAuth();
    const login = () => {
      fetchAuthorizationEndpoint();
    };

    const sign_out = () => {
      logout();
    };

    handleRedirect().then(fetchUserInfo);

    return {
      login,
      sign_out,
      user,
      isAuthenticated
    };
  },
};
</script>



<style scoped>


.auth-container {
  text-align: center;
  margin-bottom: 300px;
  margin-right: -120px;


}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;

}

.login-button{
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.logout-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.user-info {
  margin-top: 20px;
}
</style>