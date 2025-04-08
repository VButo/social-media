<template>
    <div class="comments">
        <Comment v-for="comment in comments" :key="comment.id" :comment="comment"/>
    </div>
    <CommentResponse />
</template>

<script setup>
import CommentResponse from './CommentResponse.vue';
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