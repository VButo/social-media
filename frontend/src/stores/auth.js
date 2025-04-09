import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null,
    isAuthenticated: false,
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get('http://localhost:3000/api/users/validate', { withCredentials: true });
        this.userId = response.data.userId;
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Token validation failed:', error);
        this.logout();
      }
    },
    logout() {
      this.userId = null;
      this.isAuthenticated = false;
    },
  },
});