<template>
<div>
    <div>
        <p id="u-name">{{ comment.user }}</p>
        <p>{{ comment.text }}</p>
    </div>
    <div>
        <button v-if="!liked" @click="toggleLike" class="commentActions"><FontAwesomeIcon :icon="faHeart"/> {{comment.likes}}</button>
        <button v-else @click="toggleLike" class="commentActions"><FontAwesomeIcon :icon="faHeartSolid"/> {{comment.likes}}</button>
        <button class="commentActions" @click="toggleComments"><FontAwesomeIcon :icon="faComment"/></button>
    </div>
    <CommentResponse v-if="commentResponseVisible"/>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { defineProps } from 'vue'
import CommentResponse from './CommentResponse.vue';

const props = defineProps({
    comment: {
        type: Object,
        required: true
    }
    /*
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    liked: {
        type: Boolean,
        required: true
    }
    */
})


const commentResponseVisible = ref(false)
const liked = ref(props.liked)

const toggleLike = () => {
    liked.value = !liked.value
}
const toggleComments = () => {
    commentResponseVisible.value = !commentResponseVisible.value
}
</script>

<style scoped>
div{
    width: 70%;
    text-align: left;
}
p{
    font-family: 'Arial';
    font-weight: lighter;
    margin: 10px;
}
#u-name{
    font-weight: bold;
}
.commentActions{
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
</style>