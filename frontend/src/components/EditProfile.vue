<template>
    <div class="backdrop" @click="closeModal">
    </div> 
    <div class="modal">
            <h1>Edit Profile</h1>
            <form @submit.prevent="saveEdit">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username">
                <label for="bio">Bio</label>
                <textarea id="bio" v-model="bio"></textarea>
                <label for="profilePicture">Profile Image</label>
                <input type="text" id="profilePicture" v-model="profilePicture">
                <button type="submit">Save</button>
            </form>
        </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import axios from 'axios'

const emit = defineEmits(['editProfile', 'close'])

const props = defineProps({
    profile: {
        type: Object,
        required: true
    }
})
const profilePicture = ref(props.profile.profilePicture)
const username = ref(props.profile.username)
const bio = ref(props.profile.bio)

const closeModal = () => {
    emit('close')
}

async function saveEdit() { 
    console.log(props.profile)
    const editedProfile = ref({
        profilePicture: profilePicture.value,
        username: username.value,
        bio: bio.value
    })
    console.log('edited: '+ editedProfile.value)
    const response = await axios.put(`http://localhost:3000/api/users/${props.profile.userId}`, editedProfile.value, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    console.log(response.data)
    if (response.status !== 200) {
        throw new Error('Network response was not ok');
    }
    console.log(editedProfile)
    emit('editProfile', editedProfile)
    emit('close')
}

</script>

<style>
    .modal{
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
        width: 50%;
        padding: 20px;
        margin: 100px auto;
        background: #333;
        border-radius: 10px;
    }
    .backdrop{
        top: 0;
        left: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }
    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    label{
        margin: 10px;
    }
    input{
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        width: 70%;
        background: #111;
        color: white;
        border: none;
    }

    textarea {
        color: white;
        background: #111;
        width: 70%;
        height: 100px;
        margin: 10px;
        padding: 10px;
        font-size: 1.2em;
        border-radius: 5px;
        border: none;
    }

    textarea::-webkit-resizer{
        display: none;
    }
    button{
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        background: #000;
        color: white;
        margin: 10px;
    }
    button:hover{
        cursor: pointer;
    }
</style>