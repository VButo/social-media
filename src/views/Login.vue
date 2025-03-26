<template>
    <div>
        <h1>Login</h1>
        <form>
            <label for="username">Username</label>
            <input type="text" id="username" name="username">
            <label for="password">Password</label>
            <input type="password" id="password" name="password">
            <button>Login</button>
        </form>
        <RouterLink to="/register">Don't have an account? Register here</RouterLink>
    </div>
</template>

<script setup>

</script>

<style>

</style>