<template>
    <div class="comment-response">
        <textarea 
            v-model="response" 
            placeholder="Write your response..." 
            class="response-textarea">
        </textarea>
        <button @click="submitResponse" class="response-button">Submit</button>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

const props = defineProps({
    postId: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['responseSubmitted'])

const authStore = useAuthStore()
const response = ref('')
async function submitResponse() {
    if(response.value.trim() === '') {
        alert('Response cannot be empty!')
        return
    }
    
    try {
        const res = await axios.post(`${authStore.backendURL}/api/comments/${props.postId}`, {
            text: response.value,
            userId: authStore.userId
        }, { withCredentials: true })
        
        console.log('Response submitted:', res.data)
        response.value = ''
        
        emit('responseSubmitted')
    } catch (error) {
        console.error('Error submitting comment:', error)
    }
}
</script>

<style scoped>
.comment-response {
    display: flex;
    flex-direction: column;
    align-items: center;
}

textarea{
    width: 70%;
    resize: none;
    color: white;
    background: #333;
    min-width: 20vw;
    height: 80px;
    margin: 10px;
    padding: 10px;
    font-size: 1.2em;
    border: 1px solid #666;
    border-radius: 15px;
    border: none;
}

.response-button {
    align-self: flex-end;
    margin-right: 15%;
    margin-bottom: 10px;
    padding: 10px 20px;
    font-size: 14px;
    color: white;
    background: #333;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.response-button:hover {
    background-color: #555;
}
</style>