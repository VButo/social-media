<template>
  <main>
    <div id="posts">
        <Post v-for="post in posts" :key="post.id" :post="post"/>
    </div>
    <aside class="sidebar left-sidebar">
        <CreatePost/>
    </aside>

  </main>
</template>

<script setup>
import CreatePost from '@/components/CreatePost.vue'
import Post from '../components/Post.vue'
import { ref } from 'vue'
import ProfileListPage from './ProfileListPage.vue'

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

@media screen and (max-width: 900px){
    main{
        width: 100%;
    }
    .left-sidebar{
        display: none;
    }
    #posts{
        width: 90%;
        border: none;
    }
}

</style>