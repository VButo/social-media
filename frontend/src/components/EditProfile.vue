<template>
    <div>
        <div class="backdrop" @click="closeModal">
        </div> 
        <div class="modal">
            <div class="modal-header">
                <h1>Edit Profile</h1>
                <button @click="deleteProfile" style="background-color: red; color: black;">Delete profile</button>
            </div>
            <form @submit.prevent="saveEdit">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username">
                <label for="bio">Bio</label>
                <textarea id="bio" v-model="bio"></textarea>
                <label for="profilePicture">Profile Image</label>
                <input id="file-upload" type="file" accept="image/png, image/jpeg, image/jpg" @change="handleFileUpload"/>
                <button type="submit">Save</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import axios from 'axios'

const emit = defineEmits(['editProfile', 'close'])

const props = defineProps({
    profile: {
        type: Object,
        required: true
    }
})
const profilePicture = ref(null)
const username = ref(props.profile.username)
const bio = ref(props.profile.bio)

const closeModal = () => {
    emit('close')
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
        profilePicture.value = file;
    } else {
        alert('Please upload a valid image file (PNG, JPEG, JPG)');
    }
}

async function deleteProfile() {
    try {
        await axios.delete(`http://localhost:3000/api/users/${props.profile.userId}`, { withCredentials: true });
        emit('close');
    } catch (error) {
        console.error('Error deleting profile:', error);
        alert('Failed to delete profile. Please try again.');
    }
}

async function saveEdit() { 
    try {
        const formData = new FormData();
        formData.append('username', username.value);
        formData.append('bio', bio.value);
        let updatedProfilePicture = props.profile.profilePicture;

        if (profilePicture.value && profilePicture.value instanceof File) {
            formData.append('image', profilePicture.value);
            updatedProfilePicture = `images/profilePictures/${profilePicture.value.name}`;
        }
        
        const response = await axios.put(
            `http://localhost:3000/api/users/${props.profile.userId}`, 
            formData, 
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        emit('editProfile', {
            ...props.profile,
            username: username.value,
            bio: bio.value,
            profilePicture: updatedProfilePicture
        });
        
        emit('close');
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
}

</script>

<style>
    .modal-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .modal{
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
        width: 50%;
        height: 70%;
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