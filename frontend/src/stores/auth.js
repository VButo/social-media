import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null,
    isAuthenticated: false,
    feedPosts: [],
    followingUsers: null,
  }),
  actions: {
    async checkIfLiked(postId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${postId}/likes`, { withCredentials: true });
        return response.data.some((like) => like.userId === this.userId);
      } catch (error) {
        console.error('Error fetching likes:', error);
        throw error;
      }
    },
    async fetchUser() {
      try {
        console.log("Token cookie found, validating...");
        const response = await axios.get('http://localhost:3000/api/users/validate', { 
          withCredentials: true 
        });
        this.userId = response.data.userId;
        this.isAuthenticated = true;
        console.log('User authenticated, ID:', this.userId);
      } catch (error) {
        console.log('Authentication failed:', error.message);
        this.userId = null;
        this.isAuthenticated = false;
      }
    },
    /*
    async fetchUser() {
  try {
    // Check for the visible marker cookie
    if (document.cookie.includes('auth_status=true')) {
      console.log("Auth cookie found, validating...");
      const response = await axios.get('http://localhost:3000/api/users/validate', { 
        withCredentials: true 
      });
      this.userId = response.data.userId;
      this.isAuthenticated = true;
      console.log('User authenticated, ID:', this.userId);
    } else {
      console.log("No auth cookie found");
      this.userId = null;
      this.isAuthenticated = false;
    }
  } catch (error) {
    console.log('Authentication failed:', error.message);
    this.userId = null;
    this.isAuthenticated = false;
  }
}
    */
    async getFeedPosts() {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${this.userId}/followedPosts`, { withCredentials: true });
        this.feedPosts = response.data;
      } catch (error) {
        console.error('Error fetching feed posts:', error);
        throw error;
      }
    },
    async getFollowingUsers() {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${this.userId}/followers`, { withCredentials: true });
        this.followingUsers = response.data;
      } catch (error) {
        console.error('Error fetching following users:', error);
        throw error;
      }
    },
    logout() {
      this.userId = null;
      this.isAuthenticated = false;
      axios.post('http://localhost:3000/api/users/logout', {}, { withCredentials: true })
        .then(() => {
          console.log('Logged out successfully')
        })
        .catch((error) => {
          console.error('Error logging out:', error)
        })
    },
    async getComments(postId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/comments/${postId}`, { withCredentials: true });
        return response.data;
      } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
      }
    }
  },
});