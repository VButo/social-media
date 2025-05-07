<template>
    <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <label for="identifier">username / email</label>
            <input v-model="identifier" type="text" id="identifier" name="identifier" required autocomplete="email username">
            <label for="password">password</label>
            <input v-model="password" type="password" id="password" name="password" required autocomplete="current-password">
            <button>Login</button>
        </form>
        <RouterLink to="/register">Don't have an account? Register here</RouterLink>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const identifier = ref('')
const password = ref('')
const router = useRouter()


onMounted(async () => {
  await authStore.fetchUser();
  if (authStore.isAuthenticated) {
    console.log('User is authenticated:', authStore.userId);
    router.push('/');
  } else {
    console.log('User is not authenticated');
  }
});


const login = async () => {
  console.log('Logging in with:', identifier.value, password.value);

  await authStore.login(identifier.value, password.value);
  console.log('user is loged in');
  router.push('/');
};
</script>

<style scoped>
    .login{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
        margin-left: 50px;
        width: 50%;
    }

    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;
        background: #222;
        padding: 20px;
    }
    label{
        margin: 10px;
    }
    input{
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        width: 70%;
        background: #111;
        color: white;
        border: none;
    }
    button{
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        background: #000;
        color: white;
        margin: 10px;
    }
    button:hover{
        cursor: pointer;
    }
    a{
        color: red;
        text-decoration: none;
        margin: 10px;
    }
    a:hover{
        text-decoration: underline;
    }
</style>
