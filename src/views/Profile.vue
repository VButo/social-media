<template>
    <main>
        <div id="profile">
            <div class="profile-header">
                <img :src="image" alt="Profile picture">
                <div>
                    <button>Edit profile</button>
                    <button>Logout</button>
                </div>
            </div>
            <hr>
            <h1>{{ nickname }}</h1>
            <p>{{ username }}</p>
            <p>{{ bio }}</p>
            <hr v-if="posts.length > 0">
        </div>
        <div id="posts">
            <Post v-for="post in posts" :key="post.id" :post="post"/>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'

const nickname = ref('Miso')
const bio = ref('I am a web developer')
const username = ref('miso_kolac')
const image = ref('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg')

const posts = ref([
    { id: 1, user:'Elon Musk', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'This is a post' },
    { id: 2, user:'Donald J. Trump', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'FIGHT, FIGHT, FIGHT!!!'},
    { id: 3, user: 'Alex', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'This is a third post' }
])

</script>

<style scoped>
main{
    margin-top: 100px;
    width: 60%;
    border: 1px solid #444;
}
#profile{
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

</style>