<script setup>
import { RouterLink, RouterView } from 'vue-router'

const logout = () => {
}

const routeHome = () => {
  
}
</script>

<template>
  <nav>
    <h1 id="logo" @click="routeHome">Social media</h1>
    <input type="text" id="search" placeholder="Search" />
    <div id="nav-links">
      <RouterLink to="/">Feed</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <button @click="logout">Logout</button>
    </div>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

input[type="text"] {
  width: 30%;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid #ccc;
  background-color: #222;
  color: white;
}
</style>
