<template>
    <main>
        <div id="profile" @click="visitProfile">
            <img :src="`http://localhost:5500/${profile.profilePicture}`" alt="">
            <div>
                <h1>{{ profile.fullName }}</h1>
                <p>{{ profile.username }}</p>
                <p>{{ profile.bio }}</p>
            </div>
        </div>
        <button v-if="!following" @click="toggleFollow">Follow</button>
        <button v-else @click="toggleFollow">Unfollow</button>
    </main>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

const followers = ref([])
const following = ref(false)
const router = useRouter()

const props = defineProps({
    profile: {
        type: Object,
        required: true
    }
})

const toggleFollow = () => {
    following.value = !following.value
    const url = `${authStore.backendURL}/api/users/${props.profile.userId}/${following.value? '':'un'}follow`;
    console.log('URL:', url);
    const method = 'POST';
    axios({
        method: method,
        url: url,
        withCredentials: true,
        data: {
            userId: authStore.userId
        }
    })
    .then(data => {
        console.log('Follow status updated:', data)
    })
    .catch(error => {
        console.error('Error updating follow status:', error)
    })
}

onMounted(async () => {
    if (props.profile.userId === authStore.userId) {
        following.value = false
    } else {
        try{
            const response = await axios.get(`${authStore.backendURL}/api/users/${authStore.userId}/followers`, { withCredentials: true });
            followers.value = response.data;
            console.log('Followers:', followers.value)
            if(followers.value.some(follower => follower.userId === props.profile.userId)) {
                following.value = true
            } else {
                following.value = false
            }
        } catch (error) {
            console.error('Error fetching followers:', error);
        }
    }
})

const visitProfile = () => {
    router.push({ name: 'profile', params: { id: props.profile.userId } })
}

</script>

<style scoped>
img{
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 2px solid #333;
    border-radius: 50%;
    margin-right: 20px;

}
#profile{
    display: flex;
    width: 100%;
}
main{
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
    width: 100%;
}
</style>