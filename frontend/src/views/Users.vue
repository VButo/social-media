<template>
    <div>
        <h1>Users</h1>
        <User v-for="user in filteredUsers" :key="user.id" :profile="user" />
    </div>
</template>

<script setup>
import User from '@/components/User.vue';
import { ref, computed, onMounted, withCtx } from 'vue'
import { useRoute } from 'vue-router'

const users = ref([
    { id: 1, uname: 'e_musk', name: 'Elon Musk', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', bio: 'CEO of Tesla' },
    { id: 2, uname: 'd_j_trump', name: 'Donald J. Trump', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', bio: '45th President of the United States' },
    { id: 3, uname: 'Alex1232', name: 'Alex', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', bio: 'Just a man named Alex' }
])

const route = useRoute()

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/users', { withCtredentials: true });
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
})

const filteredUsers = computed(() => {
    const searchQuery = route.query.search?.toLowerCase() || "";
    return users.value.filter(user => 
        user.name.toLowerCase().includes(searchQuery) || 
        user.uname.toLowerCase().includes(searchQuery)
    );
});
</script>

<style scoped>

</style>