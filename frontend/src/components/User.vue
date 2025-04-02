<template>
    <main>
        <div id="profile" @click="visitProfile">
            <img :src="profile.image" alt="">
            <div>
                <h1>{{ profile.name }}</h1>
                <p>{{ profile.uname }}</p>
                <p>{{ profile.bio }}</p>
            </div>
        </div>
        <button v-if="!following" @click="toggleFollow">Follow</button>
        <button v-else @click="toggleFollow">Unfollow</button>
    </main>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const following = ref(false)
const router = useRouter()

const props = defineProps({
    profile: {
        type: Object,
        required: true
    }
})

const toggleFollow = () => {
    following.value = !following.value
}

const visitProfile = () => {
    router.push({ name: 'Profile', params: { id: props.profile.id } })
}

</script>

<style scoped>
img{
    width: 30%;
    height: 30%;
    border-radius: 50%;
    margin-right: 20px;

}
#profile{
    display: flex;
    /*justify-content to be next to eachother*/
    width: 100%;
}
main{
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
    width: 100%;
}
</style>