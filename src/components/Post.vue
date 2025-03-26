<template>
    <div class="post">
        <p style="font-weight: bold;" id="u-name">{{ post.user }}</p>
        <p>{{ post.content }}</p>
        <img :src="post.image" alt="Post image">
        <div>
            <button v-if="!liked" @click="toggleLike"><FontAwesomeIcon :icon="faHeart"/></button>
            <button v-else @click="toggleLike"><FontAwesomeIcon :icon="faHeartSolid"/></button>
            <button><FontAwesomeIcon :icon="faComment" @click="toggleComments"/></button>
            <button><FontAwesomeIcon :icon="faPaperPlane"/></button>
        </div>
        <Comments v-if="commentsVisible" :comments="post.comments"/>
    </div>
</template>

<script setup>
import Comments from './Comments.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

import { defineProps } from 'vue'
import { ref } from 'vue'

const props = defineProps({
    /*user: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    }*/
    post: {
        type: Object,
        required: true
    }
})
const liked = ref(false)
const commentsVisible = ref(false)

const toggleLike = () => {
    liked.value = !liked.value
}
const toggleComments = () => {
    commentsVisible.value = !commentsVisible.value
}
</script>

<style scoped>
img{
    width: 70%;
    border-radius: 15px;
    margin: 10px;
    margin-top: 20px;
}

#u-name{
    font-weight: bold;
}

.post{
    width: 70%;
    margin: 10px;
    border: 1px solid #333;
    text-align: center;
}

p{  
    width: 70%;
    text-align: left;
    font-family: 'Arial';
    font-weight: lighter;
    margin: 7px;
}

button{
    border: none;
    background: #111;
    color: white;
    padding: 10px;
    margin: 5px;
    font-size: 1.2em;
}
button:hover{
    cursor: pointer;
}

@media screen and (max-width: 800px){
    .post{
        width: 90%;
    }
}
</style>