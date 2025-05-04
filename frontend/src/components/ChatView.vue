<template>
    <div>
        <div class="header">
            <div class="header_close" @click="closeChat"><FontAwesomeIcon :icon="faArrowLeft"/></div>
            <div class="header_profile">
                <div class="message_user">{{ user?.fullName }}</div>
            </div>
        </div>
        <div class="chat-body">
            <div class="messages">
                <div v-for="msg in messages" :key="msg.timestamp" class="message" :class="{left: msg.senderId === targetUserId.value, right: msg.senderId === authStore.userId}">
                {{ msg.content }}
                </div>
            </div>
            <div class="chat-input">
                <input v-model="newMessage" type="text" placeholder="Type a message..." @keyup.enter="sendMessage" />
                <button @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import socket from '@/socket';

const authStore = useAuthStore();
const emit = defineEmits(['closeChat']);

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})
const currentUserId = ref(authStore.userId)
const targetUserId = ref(props.user.userId)
const messages = ref([])
const newMessage = ref()

const closeChat = () => {
    messages.value = []
    emit('closeChat')
}

const fetchMessages = async () => {
    try {
        const response = await axios.get(`${authStore.backendURL}/api/messages/${currentUserId.value}/${targetUserId.value}`, { withCredentials: true });
        messages.value = response.data.messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        messages.value = [];
    }
}

onMounted(async ()=> {
    socket.emit('join', currentUserId.value);
    socket.on('message', (data) => {
        messages.value.push(data);
    });
});

watch(() => props.user, async (newUser) => {
    targetUserId.value = newUser.userId;
    await fetchMessages();
}, { immediate: true });

function sendMessage() {
    if(!newMessage.value.trim()) return;

    const messageData = {
        senderId: currentUserId.value,
        receiverId: targetUserId.value,
        content: newMessage.value,
        timestamp: new Date().toISOString()
    }
    socket.emit('message', messageData);
    messages.value.push(messageData);
    newMessage.value = '';
}
</script>

<style scoped>
.header_close{
    cursor: pointer;
    font-size: 20px;
    color: white;
    padding: 5px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.chat-header {
    background: #333;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
}

.chat-header:hover {
    background: #444;
}
.message_user{
    font-size: 1.2em;
    font-weight: bold;
    margin-left: 20px;
}
.messages {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 450px;
    padding: 5px;
    overflow-y: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}
.messages::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

.message {
    width: 50%;
    background: #444;
    padding: 8px;
    margin: 5px 0;
    border-radius: 5px;
}

.message.right {
    align-self: flex-end;
    background: #007bff;
}

.chat-input {
    display: flex;
    gap: 5px;
    padding: 5px;
}

.chat-input input {
    flex: 1;
    padding: 5px;
    border-radius: 5px;
    border: none;
    background: #555;
    color: white;
}

.chat-input button {
    background: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
}

@media screen and (max-width: 900px){
    .chat-header{
        display: none;
    }
    .chat-small{
        display: block;
    }
}
</style>