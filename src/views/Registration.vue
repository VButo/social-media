<template>
    <form>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
        <label for="password">Confirm password</label>
        <input type="password" id="password" name="password" required>
        <button>Register</button>
    </form>
    <RouterLink to="/login">Already have an account? Login here</RouterLink>
</template>

<script setup>

</script>

<style>

</style>