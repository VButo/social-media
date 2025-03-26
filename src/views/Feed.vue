<template>
  <main>
    <div id="posts">
        <Post v-for="post in posts" :key="post.id" :post="post"/>
    </div>
    <aside class="sidebar left-sidebar">
        <CreatePost />
    </aside>

  </main>
</template>

<script setup>
import CreatePost from '@/components/CreatePost.vue'
import Post from '../components/Post.vue'
import { ref } from 'vue'

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

const posts = ref([
    { id: 1, user:'Elon Musk', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'This is a post', comments: comments1 },
    { id: 2, user:'Donald J. Trump', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'FIGHT, FIGHT, FIGHT!!!', comments: comments2 },
    { id: 3, user: 'Alex', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', content: 'This is a third post', comments: comments3 }
])
</script>

<style scoped>
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
    left: 10px;
    border: 1px solid #333;
    border-radius: 10px;
}

@media screen and (max-width: 800px){
    main{
        width: 100%;
    }
}
</style>