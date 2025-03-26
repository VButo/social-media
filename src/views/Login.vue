<template>
    <div class="login">
        <h1>Login</h1>
        <form>
            <label for="username">username / email</label>
            <input type="text" id="username" name="username">
            <label for="password">password</label>
            <input type="password" id="password" name="password">
            <button>Login</button>
        </form>
        <RouterLink to="/register">Don't have an account? Register here</RouterLink>
    </div>
</template>

<script setup>

</script>

<style>
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