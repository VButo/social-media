<template>
    <div class="comments">
        <Comment v-for="comment in comments" :key="comment.id" :comment="comment"/>
    </div>
    <textarea name="new-comment" id="new-comment" placeholder="Write your comment here"></textarea>
    <button>Comment</button>
</template>

<script setup>
import { ref } from 'vue'
import Comment from './Comment.vue';
import { defineProps } from 'vue';

const props = defineProps({
    comments: {
        type: Array,
        required: true
    }
})
</script>

<style scoped>
.comments{
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
textarea{
    resize: none;
    color: white;
    background: #333;
    min-width: 20vw;
    height: 70px;
    margin: 10px;
    padding: 10px;
    font-size: 1.2em;
    border-radius: 15px;
    border: none;
}
button{
    border: none;
    background: #333;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 10px;
}
button:hover{
    cursor: pointer;
}
</style>