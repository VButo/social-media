<template>
    <main @click="visitProfile">
        <div>
            <h1>{{ profile.nickname }}</h1>
            <p>{{ profile.username }}</p>
            <p>{{ profile.bio }}</p>
        </div>
        <button v-if="!following" @click="toggleFollow">Follow</button>
        <button v-else @click="toggleFollow">Unfollow</button>
    </main>
</template>

<script setup>
import { ref } from 'vue'

const following = ref(false)

const toggleFollow = () => {
    following.value = !following.value
}

const visitProfile = () => {
    console.log('Visiting profile')
}

const profile = ref({
    nickname: 'Miso',
    username: 'miso_kolac',
    bio: 'I am a web developer'
})
</script>

<style scoped>
main{
    display: flex;
    justify-content: space-between;
    margin: 100px auto;
    width: 60%;
    padding: 20px;
    border: 1px solid #444;
}
</style>