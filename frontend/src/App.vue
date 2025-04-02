<template>
  <nav class="topnav" :class="{responsive: navBar}">
    <h1 id="logo" @click="routeHome">Social media</h1>
    <input type="text" id="search" placeholder="Search" v-model="search" @input="searchFunc" />
    <div id="nav-links">
      <RouterLink to="/" class="navLinks">Feed</RouterLink>
      <RouterLink to="/profile/1" class="navLinks">Profile</RouterLink>
      <RouterLink to="/login" class="navLinks">Login</RouterLink>
      <RouterLink to="/register" class="navLinks">Register</RouterLink>
      <button @click="logout" class="navLinks">Logout</button>
      <a @click="navToggle" class="icon"><FontAwesomeIcon :icon="faBars"/></a>
    </div>
  </nav>
  <main>
    <RouterView />
  </main>
</template>


<script setup>
import { ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { RouterLink, RouterView, useRouter } from 'vue-router'

const search = ref('')
const router = useRouter()

watch(search, (newSearch) => {
  router.push({ path: '/users', query: { search: newSearch } });
});

const logout = () => {
}

const routeHome = () => {
  
}

const navBar = ref(false)
const navToggle = () => {
  navBar.value = !navBar.value
}
</script>

<style scoped>
.icon {
  display: none;
}

#search {
  width: 50%;
  padding: 10px;
  margin-left: 20px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid #ccc;
  background-color: #222;
  color: white;
}

@media screen and (max-width: 900px){
  #search{
    width: 100%;
    margin: 2, auto;
  }

  .topnav .navLinks {display: none;}
  .icon {
    float: right;
    display: block;
  }
  .topnav.responsive #search {
    width: 95%;
    margin: auto;
  }
  #nav-links{
    margin-right: 20px;
    display: block;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    width: 95%;
  }

  #nav-links a{
    color: white;
    padding: 10px 20px;
    text-decoration: none;
  }

  #nav-links a:hover{
    border: 1px solid #777;
    padding: 9px 19px;
    border-radius: 6px;
  }

  .topnav.responsive{
    display: block;
    position: relative;
    padding: 5px;
    width: 100%;
    height: 100%;
    background-color: #222;
  }
  .topnav.responsive #logo{
    width: 80%;
  }
  .topnav.responsive .icon {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .topnav.responsive button {
    width: 100%;
    margin: auto;
  }
  .topnav.responsive .navLinks {
    float: none;
    display: block;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }
}
</style>
