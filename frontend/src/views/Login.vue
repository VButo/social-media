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
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const identifier = ref('')
const password = ref('')
const router = useRouter()

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Usage
if (getCookie('token')) {
  console.log('Token exists');
} else {
  console.log('Token does not exist');
}
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
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {
      identifier: identifier.value,
      password: password.value,
    }, { withCredentials: true });

    // Set userId and isAuthenticated in the auth store
    authStore.userId = response.data.userId;
    authStore.isAuthenticated = true;

    // Redirect to the feed
    router.push('/');
  } catch (error) {
    console.error('There was an error!', error);
    alert('Invalid credentials');
  }
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