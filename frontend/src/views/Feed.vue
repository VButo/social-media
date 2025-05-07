<template>
    <main>
      <div id="posts">
            <h1 v-if="noPosts">No new posts found, add new friends to see their posts!</h1>
          <Post v-for="post in authStore.feedPosts" :key="post.postId" :post="post"/>
      </div>
      <aside class="sidebar left-sidebar">
          <CreatePost/>
      </aside>
      <aside class="sidebar right-sidebar">
          <Chat />
      </aside>
      <div id="create-post-small-full-screen" v-if="createPost">
          <FontAwesomeIcon id="close-create-post" :icon="faArrowLeft" @click="toggleCreatePost"/>
          <CreatePost/>
      </div>
    </main>
      <div id="create-post-small" v-if="!createPost" @click="toggleCreatePost">
          <FontAwesomeIcon class="closeCreatePost" :icon="faUsersViewfinder"/>
      </div>
  </template>
  
<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
  import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
  import CreatePost from '@/components/CreatePost.vue'
  import Post from '../components/Post.vue'
  import { ref, onMounted } from 'vue'
  import { useAuthStore } from '@/stores/auth.js'
  import Chat from '@/components/Chat.vue'

  const authStore = useAuthStore()
  const noPosts = ref(false)
  
  onMounted(async () => {
  try {
    if (!authStore.userId) {
      await authStore.fetchUser();
    }
    if (authStore.userId) {
      authStore.getFollowingUsers();
      console.log('followingUsers', authStore.followingUsers);
      if (authStore.followingUsers === 0) {
        noPosts.value = true;
      } else {
        await authStore.getFeedPosts();
        console.log('feedPosts', authStore.feedPosts);
      }
    } else {
      console.error('User is not authenticated');
    }
  } catch (error) {
    console.error('Error fetching posts or following users:', error);
  }
});
  
  const createPost = ref(false)
  const toggleCreatePost = () => {
      createPost.value = !createPost.value
  }
</script>
  
<style scoped>
  #create-post-small-full-screen{
      display: none;
  }
  #create-post-small{
      position: fixed;
      top: 70px;
      left: 10px;
      background-color: #333;
      color: white;
      border-radius: 50%;
      padding: 10px;
      display: none;
  }
  
  .closeCreatePost:hover{
      cursor: pointer;
  }
  
  main{
      margin-top: 100px;
      width: 60%;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  #posts{
      width: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  .sidebar{
      width: 25%;
      position: fixed;
      top: 10%;
      overflow-y: auto;
  }
  
  .left-sidebar{
      overflow: hidden;
      height: 200px;
      left: 10px;
      border: 1px solid #333;
      border-radius: 10px;
  }
  
  @media screen and (max-width: 900px){
      #close-create-post{
          color: white;
          position: absolute;
          top: 10px;
          right: 10px;
      }
      #close-create-post:hover{
          cursor: pointer;
      }
      
      main{
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: left;
      }
      #posts{
          width: 70%;
          align-items: left;
          border: none;
      }
      .left-sidebar{
          display: none;
  
      }
      .right-sidebar{
          width: 100%;
      }
      #create-post-small{
          display: block;
      }
      #create-post-small-full-screen{
          position: fixed;
          top: 70px;
          background-color: #111;
          left: 10px;
          width: 85%;
          height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
      }
  }
</style>
  