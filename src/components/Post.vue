<template>
    <div class="post">
        <div id="user-info">
            <img :src="post.image" id="profile-picture">
            <div id="user-data">
                <p style="font-weight: bold;" id="u-name">{{ post.profile.name }}</p>
                <p>{{ post.content }}</p>
            </div>
        </div>
        <img :src="post.image" alt="Post image">
        <div>
            <button v-if="!liked" @click="toggleLike"><FontAwesomeIcon :icon="faHeart"/> {{ formattedLikes }}</button>
            <button v-else @click="toggleLike"><FontAwesomeIcon :icon="faHeartSolid"/> {{ formattedLikes }}</button>
            <button><FontAwesomeIcon :icon="faComment" @click="toggleComments"/> {{ post.comments.length }}</button>
            <button><FontAwesomeIcon :icon="faPaperPlane"/> {{ formatedShares }}</button>
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
import { defineProps, ref, computed } from 'vue'

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})
const liked = ref(false)
const commentsVisible = ref(false)

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
    const likes = props.post.likes;
    if (likes >= 1000000) {
        return (likes / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; // 2M
    } else if (likes >= 1000) {
        return (likes / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; // 200K
    }
    return likes;
});

const toggleLike = () => {
    liked.value = !liked.value
}
const toggleComments = () => {
    commentsVisible.value = !commentsVisible.value
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
    width: 100%;
}


#profile-picture{
    width: 50px;
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