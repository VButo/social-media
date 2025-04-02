<template>
    <main>
        <div id="profile">
            <div class="profile-header">
                <img :src="profile.image" alt="Profile picture">
                <div>
                    <button @click="toggleEdit = !toggleEdit">Edit profile</button>
                    <button>Logout</button>
                </div>
            </div>
            <hr>
            <h1>{{ profile.nickname }}</h1>
            <p>{{ profile.username }}</p>
            <p>{{ profile.bio }}</p>
            <hr v-if="posts.length > 0">
        </div>
        <div id="posts">
            <Post v-for="post in posts" :key="post.id" :post="post"/>
        </div>
        <EditProfile v-if="toggleEdit" :profile="profile" @editProfile="handleEditProfile" @close="handleClose"/>
    </main>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import Post from '../components/Post.vue'
import EditProfile from '@/components/EditProfile.vue'

window.scrollTo(0, 0)
const route = useRoute()
const userId = route.params.id

const nickname = ref('Miso')
const bio = ref('I am a web developer')
const username = ref('miso_kolac')
const image = ref('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg')

const props = defineProps({
    profile: {
        type: Array,
        required: true
    }
})


const profile = ref({ nickname: nickname.value, bio: bio.value, username: username.value, image: image.value })

const comments1 = ref([
    { id: 1, user: 'User1', text: 'This is a comment', liked: false, likes: 54 },
    { id: 2, user: 'User2', text: 'This is another comment', liked: false, likes: 13},
    { id: 3, user: 'User3', text: 'Amazing post!', liked: false, likes: 23 },
    { id: 4, user: 'User4', text: 'I totally agree!', liked: false, likes: 45 },
    { id: 5, user: 'User5', text: 'Thanks for sharing!', liked: false, likes: 12 }
])
const comments2 = ref([
    { id: 1, user: 'User1', text: 'This is a comment', liked: false, likes: 54 },
    { id: 2, user: 'User2', text: 'This is another comment', liked: false, likes: 13},
])
const comments3 = ref([
    { id: 4, user: 'User4', text: 'I totally agree!', liked: false, likes: 45 },
    { id: 5, user: 'User5', text: 'Thanks for sharing!', liked: false, likes: 12 }
])

const profiles = ref([
    { id: 1, name: 'Elon Musk', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg' },
    { id: 2, name: 'Donald J. Trump', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg' },
    { id: 3, name: 'Alex', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg' }
])

const posts = ref([
    { id: 1, profile: profiles.value[0], image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'This is a post', comments: comments1, likes: 430232, shares: 32 },
    { id: 2, profile: profiles.value[1], image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'FIGHT, FIGHT, FIGHT!!!', comments: comments2, likes:202, shares: 13 },
    { id: 3, profile: profiles.value[2], image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'This is a third post', comments: comments3, likes: 123, shares: 5 },
    { id: 4, profile: profiles.value[0], image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'This is a post', comments: comments1, likes: 430232, shares: 32 },
    { id: 5, profile: profiles.value[1], image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'FIGHT, FIGHT, FIGHT!!!', comments: comments2, likes:202, shares: 13 },
    { id: 6, profile: profiles.value[2], image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'This is a third post', comments: comments3, likes: 123, shares: 5 }
])

const handleEditProfile = (editedProfile) => {
    profile.value = editedProfile.value
    console.log('emitted profile', editedProfile)
}

const handleClose = () => {
    toggleEdit.value = false
}
const toggleEdit = ref(false);

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