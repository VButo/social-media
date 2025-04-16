<template>
    <main>
        <div class="chat-small" @click="toggleChat">
            <FontAwesomeIcon :icon="faComments"/>
        </div>
        <div class="chat-container">
            <div class="chat-header" :class="{ 'show-header-mobile': isOpen }" @click="toggleChat">
                Chat
            </div>
            <div class="chat-content" v-if="!isInChat && isOpen">
                <div class="searchChat">
                    <input type="text" id="searchChat" placeholder="Search chats..." />
                    <button>Search</button>
                </div>
                <div id="profile" @click="toggleOpenChat(user.userId)" v-for="user in messagedUsers" :key="user.userId">
                    <img :src="user.profilePicture" alt="">
                    <div>
                        <h1>{{ user.fullName }}</h1>
                        <p>{{ user.username }}</p>
                    </div>
                </div>
                <div v-if="messagedUsers.length > 0">
                    <h1 style="padding-left: 10px;">New Messages</h1>
                    <div id="profile" @click="toggleOpenChat(user.userId)" v-for="user in newMessageUsers" :key="user.userId">
                        <img :src="user.profilePicture" alt="">
                        <div>
                            <h1>{{ user.fullName }}</h1>
                            <p>{{ user.username }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isInChat && isOpen">
                <ChatView :user="user" @closeChat="closeChat" />
            </div>
        </div>
    </main>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import ChatView from './ChatView.vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const emit = defineEmits(['update:isOpen']);
const authStore = useAuthStore();
const isOpen = ref(false);
const isInChat = ref(false);
const newMessage = ref('');
const index = ref();
const user = ref({});
const messagedUsers = ref([]);
const newMessageUsers = ref([]);

const toggleChat = () => {
    isOpen.value = !isOpen.value;
};

const closeChat = () => {
    isInChat.value = false;
};

async function toggleOpenChat(userId) {
    isInChat.value = !isInChat.value;
    user.value = await axios.get(`http://localhost:3000/api/users/${userId}`, {
        withCredentials: true
    })
    .then(response => {
        return response.data;
    })
    console.log('user', user.value)
};

onMounted(async () => {
    try {
        if (authStore.userId) {
            if (!authStore.followingUsers) {
                await authStore.getFollowingUsers();
            }
            const response = await axios.get(`http://localhost:3000/api/messages/${authStore.userId}`, {
                withCredentials: true
            });
            messagedUsers.value = response.data;
            console.log('messagedUsers loaded:', messagedUsers.value);
            newMessageUsers.value = authStore.followingUsers.filter(user => {
                return !messagedUsers.value.some(messagedUser => messagedUser.userId === user.userId);
            })
            console.log('followingUsers:', authStore.followingUsers);
            console.log('newMessageUsers loaded:', newMessageUsers.value);
        } else {
            console.log('No user ID available, cannot load messages');
        }
    } catch (error) {
        console.error('Error fetching messaged users:', error.message);
        messagedUsers.value = [];
    }
});
</script>
  
<style scoped>
#chat-small:hover{
    cursor: pointer;
}

#profile:hover{
    background-color: #444;
}

.chat-small{
    position: fixed;
    top: 70px;
    right: 10px;
    background-color: #333;
    color: white;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    display: none;
}
#profile{
    max-height: 450px;
    display: flex;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
}
#profile img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}
#profile h1{
    margin: 0;
    font-size: 1.2em;
}
#profile p{
    margin: 0;
    font-size: 0.8em;
    color: #888;
}

#searchChat {
  width: 50%;
  padding: 10px;
  margin-left: 20px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid #ccc;
  background-color: #222;
  color: white;
}

.chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 25%;
    max-height: 80%;
    background: #222;
    color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}

.chat-container::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}
.chat-header {
    position: sticky;
    top: 0;
    background: #333;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    z-index: 1;
}

.chat-header:hover {
    background: #444;
}

.chat-body {
    padding: 10px;
    display: flex;
    flex-direction: column;
}


.searchChat {
    display: flex;
    gap: 5px;
    padding: 5px;
}

@media screen and (max-width: 900px){
    .chat-container{
        width: 95%;
        right: 10px;
        left: 10px;
    }
    .chat-header{
        display: none;
    }
    .chat-header.show-header-mobile {
        display: block;
    }
    .chat-small{
        display: block;
    }
}
</style>