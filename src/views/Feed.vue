<template>
  <main>
    <div id="posts">
        <Post v-for="post in posts" :key="post.id" :post="post"/>
    </div>
    <textarea name="new-post" id="new-post" placeholder="Write post here"></textarea>
    <input type="file" name="post-image" id="post-image" accept="image/*">
    <button>Post</button>

  </main>
</template>

<script setup>
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
    margin-top: 30px;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#posts{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

textarea{
    color: white;
    background: #333;
    min-width: 20vw;
    height: 100px;
    margin: 10px;
    padding: 10px;
    font-size: 1.2em;
    border-radius: 15px;
    border: none;
}

textarea::-webkit-resizer{
  display: none;
}

button{
    border: none;
    background: #333;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 10px;
}

input[type="file"]{
    border: 1px solid #444;
    padding: 5px;
    color: white;
    border-radius: 5px;
}
@media screen and (max-width: 800px){
    main{
        width: 100%;
    }
}
</style>