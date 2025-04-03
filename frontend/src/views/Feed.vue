<template>
  <main>
    <div id="posts">
        <Post v-for="post in posts" :key="post.id" :post="post"/>
    </div>
    <aside class="sidebar left-sidebar">
        <CreatePost/>
    </aside>
    <aside class="sidebar right-sidebar">
        <Chat />
    </aside>
    <div id="create-post-small-full-screen" v-if="createPost">
        <FontAwesomeIcon id="close-create-post" :icon="faArrowLeft" @click="toggleCreatePost"/>
        <CreatePost/>
    </div>
  </main>
    <div id="create-post-small" v-if="!createPost" @click="toggleCreatePost">
        <FontAwesomeIcon class="closeCreatePost" :icon="faUsersViewfinder"/>
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CreatePost from '@/components/CreatePost.vue'
import Post from '../components/Post.vue'
import { ref, onMounted } from 'vue'
import Chat from '@/components/Chat.vue'

const url = 'http://localhost:3000/api/users'

async function fetchFollowers(userId){
    try{
        const response = await fetch(`${url}/${userId}/followers`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
    } catch(error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

onMounted(() => {
    fetchFollowers(3)
})

const createPost = ref(false)
const toggleCreatePost = () => {
    createPost.value = !createPost.value
}

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
    { id: 3, profile: profiles.value[2], image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'This is a third post', comments: comments3, likes: 123, shares: 5 }
])
</script>

<style scoped>
#create-post-small-full-screen{
    display: none;
}
#create-post-small{
    position: fixed;
    top: 70px;
    left: 10px;
    background-color: #333;
    color: white;
    border-radius: 50%;
    padding: 10px;
    display: none;
}

.closeCreatePost:hover{
    cursor: pointer;
}

main{
    margin-top: 100px;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#posts{
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sidebar{
    width: 25%;
    position: fixed;
    top: 10%;
    overflow-y: auto;
}

.left-sidebar{
    overflow: hidden;
    height: 200px;
    left: 10px;
    border: 1px solid #333;
    border-radius: 10px;
}

@media screen and (max-width: 900px){
    #close-create-post{
        color: white;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    #close-create-post:hover{
        cursor: pointer;
    }
    
    main{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: left;
    }
    #posts{
        width: 70%;
        align-items: left;
        border: none;
    }
    .left-sidebar{
        display: none;

    }
    .right-sidebar{
        width: 100%;
    }
    #create-post-small{
        display: block;
    }
    #create-post-small-full-screen{
        position: fixed;
        top: 70px;
        background-color: #111;
        left: 10px;
        width: 85%;
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
}
</style>