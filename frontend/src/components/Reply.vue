<template>
    <div class="reply">
        <div class="reply-header">
            <span class="reply-username">{{ reply.username }}</span>
            <span class="reply-timestamp">{{ reply.timestamp }}</span>
        </div>
        <div class="reply-body">
            <p>{{ reply.content }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const reply = ref({ userAvatar: 'path/to/avatar.jpg', username: 'User123', timestamp: '2023-10-01 12:00', content: 'This is a reply.' });

</script>

<style scoped>
.reply {
    border-left: 2px solid #ccc;
    margin-left: 20px;
    padding-left: 10px;
    margin-top: 10px;
}

.reply-header {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.reply-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
}

.reply-username {
    font-weight: bold;
    margin-right: 10px;
}

.reply-timestamp {
    color: #888;
    font-size: 0.9em;
}

.reply-body {
    font-size: 1em;
    color: #333;
}
</style>