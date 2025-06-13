<template>
    <div class="register">
        <h1>Register</h1>
        <form @submit.prevent="register">
            <label for="username">Username</label>
            <input v-model="username" type="text" id="username" name="username" required>
            <label for="email">Email</label>
            <input v-model="email" type="email" id="email" name="email" @input="validateEmail" required>
            <p v-if="emailError" style="color: red">{{ emailError }}</p>
            <label for="fullName">Full Name</label>
            <input v-model="fullName" type="text" id="fullName" name="fullName" required>
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" name="password" required>
            <label for="repeatPassword">Confirm password</label>
            <input v-model="repeatPassword" type="password" id="repeatPassword" name="password" @input="validatePasswordMatch" required>
            <p v-if="passwordError" style="padding: 0; color: red; margin: 0 ">{{ passwordError }}</p>
            <button :disabled="!isFormValid">Register</button>
        </form>
        <RouterLink to="/login">Already have an account? Login here</RouterLink>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';

const username = ref('');
const email = ref();
const fullName = ref('');
const password = ref();
const repeatPassword = ref();
console.log(password.value, repeatPassword.value);

// Error messages
const emailError = ref('');
const passwordError = ref('');

// Validation logic
const validateEmail = () => {
  
};

const validatePasswordMatch = () => {
  passwordError.value =
    password.value === repeatPassword.value
      ? ''
      : 'Passwords do not match.';
};

const isFormValid = computed(() => {
  return (
    emailError.value === '' &&
    passwordError.value === '' &&
    email.value &&
    password.value &&
    repeatPassword.value
  );
});

const register = () => {
    axios.post(`${authStore.backendURL}/api/users/register`, {
        username: username.value,
        password: password.value,
        email: email.value,
        fullName: fullName.value
    }, {withCredentials: true}).then(res => console.log(res.data)).catch(err => {
        console.log(err.response.data);
        if (err.response.status === 400) {
            alert("Username or email already exists");
        } else if (err.response.status === 500) {
            alert("Server error, please try again later");
        } else {
            alert("An unexpected error occurred, please try again later");
        }
    });
}
</script>

<style scoped>
    .register{
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