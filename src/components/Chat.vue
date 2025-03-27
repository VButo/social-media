<template>
    <div class="chat-small" @click="toggleChat">
        <FontAwesomeIcon :icon="faComments"/>
    </div>
    <div class="chat-container">
        <div class="chat-header" @click="toggleChat">
            Chat
        </div>
        <div v-if="!isInChat && isOpen">
            <div class="searchChat">
                <input type="text" id="searchChat" placeholder="Search chats..." />
                <button>Search</button>
            </div>
            <div id="profile" @click="toggleOpenChat(index)" v-for="(profile, index) in users" :key="index">
                <img :src="profile.image" alt="">
                <div>
                    <h1>{{ profile.name }}</h1>
                    <p>{{ profile.uname }}</p>
                </div>
            </div>
        </div>
        <div v-if="isInChat && isOpen">
            <div class="header">
                <div class="header_close" @click="closeChat"><FontAwesomeIcon :icon="faArrowLeft"/></div>
                <div class="header_profile">
                    <div class="message_user">{{ user?.name }}</div>
                </div>
            </div>
            <div class="chat-body">
                <div class="messages">
                    <div v-for="(msg, index) in messages" :key="index" class="message" :class="{left: msg.sender === 1, right: msg.sender === 2}">
                    {{ msg.text }}
                    </div>
                </div>
                <div class="chat-input">
                    <input v-model="newMessage" type="text" placeholder="Type a message..." @keyup.enter="sendMessage" />
                    <button @click="sendMessage">Send</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const emit = defineEmits(['update:isOpen']);

const isOpen = ref(false);
const isInChat = ref(false);
const newMessage = ref('');
  
    const toggleChat = () => {
        isOpen.value = !isOpen.value;
    };

  const closeChat = () => {
    isInChat.value = false;
  };

const users = ref([
    { id: 1, uname: 'b_gates', name: 'Bill Gates', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', bio: 'Co-founder of Microsoft' },
    { id: 2, uname: 'd_j_trump', name: 'Donald J. Trump', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', bio: '45th President of the United States' },
    { id: 3, uname: 'Alex1232', name: 'Alex', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', bio: 'Just a man named Alex' },
    { id: 4, uname: 'j_bezos', name: 'Jeff Bezos', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', bio: 'Founder of Amazon' },
    { id: 5, uname: 'e_musk', name: 'Elon Musk', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', bio: 'CEO of Tesla' },
    { id: 6, uname: 's_jobs', name: 'Steve Jobs', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', bio: 'Co-founder of Apple' },
    { id: 7, uname: 'm_zuckerberg', name: 'Mark Zuckerberg', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', bio: 'CEO of Meta' },
    { id: 8, uname: 'l_page', name: 'Larry Page', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', bio: 'Co-founder of Google' }
])
const user = ref({
    id: 1,
    name: 'Elon Musk',
    uname: 'elonmusk',
    image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
    bio: 'CEO of Tesla',
    following: [1, 2, 3, 4, 7, 8]
})

const toggleOpenChat = (index) => {
    isInChat.value = !isInChat.value;
    user.value = users.value[index];
  };

const messages = ref([
        { id: 1, text: 'Hello', sender: 1, receiver: 2 },
        { id: 2, text: 'Hi', sender: 2, receiver: 1 },
        { id: 3, text: 'How are you?', sender: 1, receiver: 2 },
        { id: 4, text: 'I am fine, thank you', sender: 2, receiver: 1 },
        { id: 5, text: 'What are you doing?', sender: 1, receiver: 2 },
        { id: 6, text: 'I am working', sender: 2, receiver: 1 },
        { id: 7, text: 'What are you working on?', sender: 1, receiver: 2 },
        { id: 8, text: 'I am working on a new project', sender: 2, receiver: 1 },
        { id: 9, text: 'What project?', sender: 1, receiver: 2 },
        { id: 10, text: 'I cannot tell you', sender: 2, receiver: 1 },
        { id: 11, text: 'Why not?', sender: 1, receiver: 2 },
        { id: 12, text: 'It is a secret', sender: 2, receiver: 1 },
        { id: 13, text: 'Tell me', sender: 1, receiver: 2 },
        { id: 14, text: 'No', sender: 2, receiver: 1 },
        { id: 15, text: 'Please', sender: 1, receiver: 2 },
        { id: 16, text: 'No', sender: 2, receiver: 1 },
        { id: 17, text: 'Pretty please', sender: 1, receiver: 2 },
        { id: 18, text: 'No', sender: 2, receiver: 1 },
        { id: 19, text: 'I will give you a cookie', sender: 1, receiver: 2 },
        { id: 20, text: 'Okay', sender: 2, receiver: 1 },
        { id: 21, text: 'I am working on a new project', sender: 2, receiver: 1 },
        { id: 22, text: 'What project?', sender: 1, receiver: 2 },
        { id: 23, text: 'I cannot tell you', sender: 2, receiver: 1 },
        { id: 24, text: 'Why not?', sender: 1, receiver: 2 },
        { id: 25, text: 'It is a secret', sender: 2, receiver: 1 },
        { id: 26, text: 'Tell me', sender: 1, receiver: 2 },
        { id: 27, text: 'No', sender: 2, receiver: 1 },
        { id: 28, text: 'Please', sender: 1, receiver: 2 },
        { id: 29, text: 'No', sender: 2, receiver: 1 },
        { id: 30, text: 'Pretty please', sender: 1, receiver: 2 },
        { id: 31, text: 'No', sender: 2, receiver: 1 },
        { id: 32, text: 'I will give you a cookie', sender: 1, receiver: 2 },
        { id: 33, text: 'Okay', sender: 2, receiver: 1 },
        { id: 34, text: 'I am working on a new project', sender: 2, receiver: 1 },
        { id: 35, text: 'What project?', sender: 1, receiver: 2 },
        { id: 36, text: 'I cannot tell you', sender: 2, receiver: 1 },
        { id: 37, text: 'Why not?', sender: 1, receiver: 2 },
        { id: 38, text: 'It is a secret', sender: 2, receiver: 1 },
        { id: 39, text: 'Tell me', sender: 1, receiver: 2 },
        { id: 40, text: 'No', sender: 2, receiver: 1 },
        { id: 41, text: 'Please', sender: 1, receiver: 2 },
        { id: 42, text: 'No', sender: 2, receiver: 1}
    ])
</script>
  
<style scoped>

.message_user{
    font-size: 1.2em;
    font-weight: bold;
    margin-left: 20px;
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
#profile{
    display: flex;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
}
#profile img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
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
    background: #222;
    color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.chat-header {
    background: #333;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
}

.chat-body {
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.messages {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 200px;
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

.searchChat {
    display: flex;
    gap: 5px;
    padding: 5px;
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
    .chat-container{
        width: 95%;
        right: 10px;
        left: 10px;
    }
    .chat-header{
        display: none;
    }
    .chat-small{
        display: block;
    }
}
</style>