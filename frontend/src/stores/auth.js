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
    async fetchUser() {
      try {
        const response = await axios.get('http://localhost:3000/api/users/validate', { withCredentials: true });
        this.userId = response.data.userId;
        this.isAuthenticated = true;
        console.log('User ID:', this.userId);
      } catch (error) {
        console.error('Token validation failed:', error);
        this.logout();
      }
    },
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
    },
  },
});