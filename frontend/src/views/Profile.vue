<template>
    <main>
        <div id="profile">
            <div class="profile-header">
                <img v-if="profile.profilePicture" :src="`http://localhost:5173/${profile.profilePicture}`" alt="Profile picture">
                <div v-if="profile.userId === authStore.userId">
                    <button @click="toggleEdit = !toggleEdit">Edit profile</button>
                    <button>Logout</button>
                </div>
                <div v-else>
                    <button v-if="!following" @click="toggleFollow">Follow</button>
                    <button v-else @click="toggleFollow">Unfollow</button>
                </div>
            </div>
            <hr>
            <div>
                <div>
                    <h1>{{ profile.fullName }}</h1>
                    <p>{{ profile.username }}</p>
                    <p>{{ profile.bio }}</p>
                    <hr v-if="posts.length > 0">
                </div>
                <div>
                    <p>Followers</p>
                    <p>{{ profile.followerCount }}</p>
                    <p>Following</p>
                    <p>{{ profile.followingCount }}</p>
                </div>
            </div>
        </div>
        <div id="posts">
            <p v-if="posts.length === 0"></p>
            <h1 v-if="posts.length === 0" style="margin: 0 auto;">No posts yet!</h1>
            <ProfilePost v-for="post in posts" :key="post.id" :post="post"/>
        </div>
        <EditProfile v-if="toggleEdit" :profile="profile" @editProfile="handleEditProfile" @close="handleClose"/>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProfilePost from '../components/ProfilePost.vue'
import EditProfile from '@/components/EditProfile.vue'
import { useAuthStore } from '@/stores/auth.js'
import axios from 'axios'

window.scrollTo(0, 0)
const authStore = useAuthStore()
const postExists = ref(false)

const props = defineProps({
    clickedUserId: {
        type: Number,
        required: false
    }
})

const profile = ref({})
const posts = ref([])
const toggleEdit = ref(false);
const followers = ref([])
const following = ref(false)

const route = useRoute()
const userId = route.params.id

onMounted(async () => {
  try {
    const profileResponse = await axios.get(`http://localhost:3000/api/users/${userId}`, { withCredentials: true });
    profile.value = profileResponse.data;
    console.log('profile', profile.value)
    const postsResponse = await axios.get(`http://localhost:3000/api/posts/${userId}`, { withCredentials: true });
    const response = await axios.get(`http://localhost:3000/api/users/${authStore.userId}/followers`, { withCredentials: true });
    followers.value = response.data;
    console.log('Followers:', followers.value)
    if(followers.value.some(follower => follower.userId === profile.value.userId)) {
        following.value = true
    } else {
        following.value = false
    }
    posts.value = postsResponse.data;
    console.log('posts', posts.value)
  } catch (error) {
    console.error('Error fetching profile or posts:', error);
  }
});

const toggleFollow = () => {
    following.value = !following.value
    const url = `http://localhost:3000/api/users/${props.profile.userId}/${following.value? '':'un'}follow`;
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

const handleEditProfile = (editedProfile) => {
    profile.value = {
        ...profile.value,
        ...editedProfile
    };
    console.log('Profile updated:', profile.value);
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
    object-fit: cover;
    border: 5px solid #333;
    border-radius: 50%;
    margin: 20px;
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