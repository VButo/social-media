<template>
    <div class="post">
        <div id="user-info" @click="visitProfile">
            <img :src="`http://localhost:5173/${post.profilePicture}`" id="profile-picture">
            <div id="user-data">
                <p style="font-weight: bold;" id="u-name">{{ post.username }}</p>
                <p>{{ post.caption }}</p>
            </div>
            <p id="post-time">{{ timeAgo(post.createdAt) }}</p>
        </div>
        <img v-if="post.image" :src="`http://localhost:5173/${post.image}`" alt="Post image" v-on:dblclick="toggleLike">
        <div>
            <button v-if="!liked" @click="toggleLike"><FontAwesomeIcon :icon="faHeart"/> {{ formattedLikes }}</button>
            <button v-else @click="toggleLike" style="color: red;"><FontAwesomeIcon :icon="faHeartSolid"/> {{ formattedLikes }}</button>
            <button><FontAwesomeIcon :icon="faComment" @click="toggleComments" /> {{ post.commentCount }}</button>
            <button><FontAwesomeIcon :icon="faPaperPlane"/> {{ formatedShares }}</button>
        </div>
        <Comments v-if="commentsVisible" :postId="post.postId"/>
    </div>
</template>

<script setup>
import Comments from './Comments.vue';
import { watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { defineProps, ref, computed, onMounted } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { usePostsStore } from '@/stores/posts.js'
import { timeAgo } from '@/utils/date.js';

const authStore = useAuthStore()
const postsStore = usePostsStore()

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})

const liked = ref(false)
const commentsVisible = ref(false)

onMounted(async () => {
    liked.value = await authStore.checkIfLiked(props.post.postId);
    console.log('liked', liked.value);
});

const formatedShares = computed(() => {
    const shares = props.post.shares;
    if (shares >= 1000000) {
        return (shares / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; // 2M
    } else if (shares >= 1000) {
        return (shares / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; // 200K
    }
    return shares;
});

// Computed property to format likes
const formattedLikes = computed(() => {
    const likes = props.post.likeCount;
    if (likes >= 1000000) {
        return (likes / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; // 2M
    } else if (likes >= 1000) {
        return (likes / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; // 200K
    }
    return likes;
});

async function toggleLike() {
    liked.value = !liked.value;

    const url = `http://localhost:3000/api/posts/${props.post.postId}/${!liked.value ? 'un' : ''}like`;

    await authStore.fetchUser();

    if (!authStore.isAuthenticated) {
        console.error('You must be logged in to like a post');
        return;
    }

    try {
        await axios.post(url, { userId: authStore.userId }, { withCredentials: true });
        const response = await axios.get(`http://localhost:3000/api/posts/${props.post.postId}/likeCount`, { withCredentials: true });
        props.post.likeCount = response.data.likeCount;
        console.log('Post:', props.post.postId, 'liked:', liked.value, 'likeCount:', props.post.likeCount);
    } catch (error) {
        console.error('Error toggling like:', error);
    }
}
const toggleComments = () => {
    if (postsStore.openPostComment !== null && postsStore.openPostComment !== props.post.postId) {
        postsStore.closePostCommentModal();
    }

    if (commentsVisible.value) {
        postsStore.closePostCommentModal();
    } else {
        postsStore.openPostCommentModal(props.post.postId);
    }

    commentsVisible.value = !commentsVisible.value
}

watch(() => postsStore.openPostComment, (newOpenReply) => {
    commentsVisible.value = newOpenReply === props.post.postId;
});

const router = useRouter()

const visitProfile = () => {
    router.push(`/profile/${props.post.authorId}`);
}
</script>

<style scoped>
#user-info{
    display: flex;
    align-items: center;
    width: 100%;
}
#user-data{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
}

#post-time{
    font-size: 0.8em;
    text-align: right;
    color: #888;
    margin-right: 5%;
    width: 100%;
}

#profile-picture{
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin: 10px;
}

img{
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
}

#u-name{
    font-weight: bold;
}

.post{
    width: 100%;
    margin: 10px;
    border: 1px solid #333;
    text-align: center;
}

p{  
    width: 100%;
    text-align: left;
    font-family: 'Arial';
    font-weight: lighter;
    margin: 5px;

     /* Prevent line breaks */
     white-space: nowrap; 
    
    /* Hide overflow */
    overflow: hidden; 
    
    /* Show "..." when text overflows */
    text-overflow: ellipsis; 
}

button{
    border: none;
    background: #111;
    color: white;
    padding: 10px;
    margin: 5px;
    font-size: 1.2em;
}

@media screen and (max-width: 900px){
    #profile-picture{
        width: 50px;
    }

    p{
        width: 70%;
        margin: 2px;
    }
}
@media screen and (max-width: 600px){
    #profile-picture{
        width: 40px;
    }
    img{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    p{
        width: 90%;
        margin: 2px;
        font-size: 0.8em;
    }
    button{
        font-size: 1em;
    }
}
</style>
