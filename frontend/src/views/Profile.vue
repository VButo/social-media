<template>
    <main>
        <div id="profile">
            <div class="profile-header">
                <img :src="`http://localhost:5173/${profile.profilePicture}`" alt="Profile picture">
                <div>
                    <button @click="toggleEdit = !toggleEdit">Edit profile</button>
                    <button>Logout</button>
                </div>
            </div>
            <hr>
            <h1>{{ profile.fullName }}</h1>
            <p>{{ profile.username }}</p>
            <p>{{ profile.bio }}</p>
            <hr v-if="posts.length > 0">
        </div>
        <div id="posts">
            <p v-if="posts.length === 0"></p>
            <h1 v-if="posts.length === 0" style="margin: 0 auto;">No posts yet!</h1>
            <Post v-for="post in posts" :key="post.id" :post="post"/>
        </div>
        <EditProfile v-if="toggleEdit" :profile="profile" @editProfile="handleEditProfile" @close="handleClose"/>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Post from '../components/Post.vue'
import EditProfile from '@/components/EditProfile.vue'
import axios from 'axios'

window.scrollTo(0, 0)

const postExists = ref(false)

const profile = ref({})
const posts = ref([])
const toggleEdit = ref(false);

const route = useRoute()
const userId = route.params.id

onMounted(async () => {
  try {
    const profileResponse = await axios.get(`http://localhost:3000/api/users/${userId}`, { withCredentials: true });
    profile.value = profileResponse.data;

    const postsResponse = await axios.get(`http://localhost:3000/api/posts/${userId}`, { withCredentials: true });
    posts.value = postsResponse.data;
  } catch (error) {
    console.error('Error fetching profile or posts:', error);
  }
});

const handleEditProfile = (editedProfile) => {
    profile.value = editedProfile.value
    console.log('emitted profile', editedProfile)
}

const handleClose = () => {
    toggleEdit.value = false
}

</script>

<style scoped>
main{
    margin: 100px auto;
    width: 60%;
    padding: 20px;
    border: 1px solid #444;
    display: block;
}
#profile{
    margin: 0 auto;
    width: 90%;
}
.profile-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 20px;
}
#posts {
    width: 90%;
    margin: 50px auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 1fr)); /* 3 columns with flexible sizes */
    grid-auto-rows: auto; /* Allows posts to grow based on content */
    gap: 20px; /* Adds spacing between posts */
    align-items: start;
}
button{
    border: none;
    background: #333;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 10px;
}

@media screen and (max-width: 900px) {
    #posts {
        grid-template-columns: repeat(2, minmax(200px, 1fr)); /* Switch to 2 columns */
    }
}

@media screen and (max-width: 600px) {
    #posts {
        grid-template-columns: repeat(1, minmax(200px, 1fr)); /* Switch to 1 column */
    }
}

@media screen and (max-width: 650px){
    main{
        width: 100%;
    }
    img{
        width: 100px;
        height: 100px;
    }
    #profile{
        width: 100%;
    }
    #posts{
        width: 100%;
    }
    
}

</style>