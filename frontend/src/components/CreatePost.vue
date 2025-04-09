<template>
    <div class="create-post">
        <textarea name="new-post" class="new-post" placeholder="Write post here" v-model="postText"></textarea>
        <label for="file-upload" class="custom-file-upload">
            Upload image
        </label>
        <input id="file-upload" type="file" accept="image/png, image/jpeg, image/jpg" @change="handleFileUpload"/>
        <button @click="post">Post</button>
    </div>
</template>


<script setup>
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'
import { ref } from 'vue'

const authStore = useAuthStore()
const postText = ref('')
const postImage = ref(null)

async function post() {
    const formData = new FormData();
    formData.append('text', postText.value);

    if(postImage.value) {
        formData.append('image', postImage.value);
    }
    try{
        const result = await axios.post(`http://localhost:3000/api/posts/${authStore.userId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
        });
        console.log(result.data);  
    } catch(error) {
        console.error('There was an error while uploading the post!', error)
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
        postImage.value = file;
    } else {
        alert('Please upload a valid image file (PNG, JPEG, JPG)');
    }
}
</script>


<style scoped>
button:hover{
    background: #444;
}
textarea{
    color: white;
    background: #333;
    min-width: 20vw;
    margin: 10px;
    height: 100px;
    padding: 10px;
    font-size: 1.2em;
    border-radius: 15px;
    border: none;
    overflow: hidden;
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

input[type="file"] {
  display: none;
  overflow: hidden;
}

.custom-file-upload {
    margin-left: 10px;
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 5px;
}

@media screen and (max-width: 900px){
    .create-post{
        width: 100%;
        height: 90%;
    }
    textarea{
        color: white;
        background: #333;
        width: 90%;
        height: 70%;
        margin-left: 20px;
        padding: 10px;
        border: none;
        overflow: hidden;
    }
}
</style>