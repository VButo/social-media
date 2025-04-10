<template>
<div id="comment">
    <div id="comment-header">
        <div>
            <p id="u-name">{{ comment.username }}</p>
            <p>{{ comment.text }}</p>
        </div>
        <p id="post-time">{{ timeAgo(comment.createdAt) }}</p>
    </div>
    <div>
        <button v-if="!liked" @click="toggleLike" class="commentActions"><FontAwesomeIcon :icon="faHeart"/> {{comment.likeCount}}</button>
        <button v-else @click="toggleLike" class="commentActions" style="color: red;"><FontAwesomeIcon :icon="faHeartSolid"/> {{comment.likeCount}}</button>
        <button class="commentActions" @click="toggleComments"><FontAwesomeIcon :icon="faComment"/>{{ comment.replyCount }}</button>
    </div>
    <div v-if="commentResponseVisible">
        <Reply v-for="reply in replies" :key="reply.replyId" :reply="reply"/>
        <CommentResponse :postId="comment.postId" @responseSubmitted="refreshComments"/>
    </div>
</div>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { defineProps } from 'vue'
import CommentResponse from './CommentResponse.vue';
import { usePostsStore } from '@/stores/posts';
import Reply from './Reply.vue';
import axios from 'axios';
import { timeAgo } from '@/utils/date.js';
import { useAuthStore } from '@/stores/auth';

const postsStore = usePostsStore()
const authStore = useAuthStore()

const props = defineProps({
    comment: {
        type: Object,
        required: true
    }
})

const replies = ref([])
const emit = defineEmits(['responseSubmitted'])
const commentResponseVisible = ref(false)
const liked = ref(props.liked)

const refreshComments = () =>{
    emit('responseSubmitted')
}

async function toggleLike() {
    liked.value = !liked.value

    const url = `http://localhost:3000/api/comments/${props.comment.commentId}/${!liked.value ? 'un' : ''}like`;

    await authStore.fetchUser();

    if (!authStore.isAuthenticated) {
        console.error('You must be logged in to like a post');
        return;
    }

    try{
        await axios.post(url, { userId: authStore.userId }, { withCredentials: true })
        const response = await axios.get(`http://localhost:3000/api/comments/get/${props.comment.commentId}`, { withCredentials: true })
        console.log(response.data.likeCount)
        props.comment.likeCount = response.data.likeCount
    } catch (error) {
        console.error('Error liking comment:', error);
    }  
}
const toggleComments = () => {
    if (postsStore.openCommentReply !== null && postsStore.openCommentReply !== props.comment.commentId) {
        postsStore.closeCommentReplyModal();
    }
    
    if (commentResponseVisible.value) {
        postsStore.closeCommentReplyModal();
    } else {
        postsStore.openCommentReplyModal(props.comment.commentId);
    }
    
    commentResponseVisible.value = !commentResponseVisible.value;
}

watch(() => postsStore.openCommentReply, (newOpenReply) => {
    commentResponseVisible.value = newOpenReply === props.comment.commentId;
});

onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/comments/${props.comment.commentId}/replies`, { withCredentials: true });
        replies.value = response.data;
        console.log('replies', replies.value);
    } catch (error) {
        console.error('Error fetching replies:', error);
        throw error;
    }
})
</script>

<style scoped>
div{
    width: 100%;
    text-align: left;
}
#comment-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#comment{
    margin-left: 50px;
    padding: 10px;
}
#post-time{
    color: #888;
    font-size: 0.9em;
    text-align: right;
    width: 100%;
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