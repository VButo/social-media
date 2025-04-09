<template>
    <div>
        <h1>Users</h1>
        <User v-for="user in users" :key="user.id" :profile="user" />
    </div>
</template>

<script setup>
import User from '@/components/User.vue';
import { ref, onMounted, watch } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router'

const route = useRoute()
const users = ref([])

async function fetchUsers() {
    try {
        const searchQuery = route.query.search || '';
        const response = await axios.get(`http://localhost:3000/api/users?search=${searchQuery}`, { withCredentials: true });
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

watch(() => route.query.search, fetchUsers);

onMounted(fetchUsers);
</script>

<style scoped>

</style>