<template>
  <div>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import { useAuth } from 'veda-auth-vue';

export default {
  setup() {
    const { fetchAuthorizationEndpoint } = useAuth();

    return {
      login: () => {
        fetchAuthorizationEndpoint();
      },
    };
  },
};
</script>
