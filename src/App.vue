<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <h1 id="logo">Social media</h1>
    <div id="nav-links">
      <RouterLink to="/">Feed</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <button>Logout</button>
    </div>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
