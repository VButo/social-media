<template>
    <div class="comments">
        <Comment v-for="comment in comments" :key="comment.id" :comment="comment" @responseSubmitted="refresh"/>
    </div>
    <CommentResponse :postId="postId" @responseSubmitted="refresh"/>
</template>

<script setup>
import CommentResponse from './CommentResponse.vue';
import Comment from './Comment.vue';
import { ref, defineEmits } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { defineProps, onMounted } from 'vue';

const authStore = useAuthStore();

const props = defineProps({
    postId: {
        type: Number,
        required: true
    },
    showCommentResponse: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['responseSubmitted'])
const comments = ref([])

async function refresh() {
    try {
        const response = await authStore.getComments(props.postId);
        comments.value = response
        emit('responseSubmitted')
        console.log('Comment crear+ted, comments: ', comments.value)
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

onMounted(async () => {
    try {
        const response = await authStore.getComments(props.postId);
        comments.value = response
        console.log('comments', comments.value)
    } catch (error) {
        console.error('Error fetching comments:', error);
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