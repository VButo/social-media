To handle the userId properly without breaking the app or causing issues like infinite redirects, you can implement the following solution:

1. Use a Global State Management Solution
Use a global state management library like Pinia (already installed in your project) to store and manage the userId. This allows you to access the userId across components without directly relying on localStorage in App.vue.

Steps:
Create a Pinia Store for Authentication Create a new file src/stores/auth.js:

// filepath: c:\Users\Home\Backend\social_media\social-media\frontend\src\stores\auth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const userId = ref(localStorage.getItem('userId') || null);
  const router = useRouter();

  const setUserId = (id) => {
    userId.value = id;
    if (id) {
      localStorage.setItem('userId', id);
    } else {
      localStorage.removeItem('userId');
    }
  };

  const logout = () => {
    setUserId(null);
    router.push('/login');
  };

  return { userId, setUserId, logout };
});


Update App.vue Remove the localStorage logic from App.vue and use the auth store instead:

// filepath: c:\Users\Home\Backend\social_media\social-media\frontend\src\App.vue
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const userId = auth.userId;

const logout = () => {
  auth.logout();
};

Protect Routes in the Router Add a navigation guard in the router to check for userId before accessing protected routes:

// filepath: c:\Users\Home\Backend\social_media\social-media\frontend\src\router\index.js
import { useAuthStore } from '@/stores/auth';

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const isAuthenticated = !!auth.userId;

  if (to.name !== 'login' && to.name !== 'register' && !isAuthenticated) {
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    next({ name: 'feed' });
  } else {
    next();
  }
});

2. Handle userId in Login and Registration
Ensure that userId is set in the store after login or registration:

Login.vue

import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {
      identifier: identifier.value,
      password: password.value,
    }, { withCredentials: true });

    auth.setUserId(response.data.userId);
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
    alert('Invalid credentials');
  }
};

Registration.vue

import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

const register = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/register', {
      username: username.value,
      password: password.value,
      email: email.value,
      fullName: fullName.value,
    }, { withCredentials: true });

    auth.setUserId(response.data.userId);
    router.push('/');
  } catch (error) {
    console.error('Registration failed:', error);
    alert('An error occurred during registration');
  }
};

3. Handle userId in /profile/:id
In the Profile.vue component, ensure that the userId is fetched dynamically and handle cases where it is missing:

import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const userId = route.params.id || auth.userId;

if (!userId) {
  router.push('/login');
}

onMounted(async () => {
  try {
    const profileResponse = await axios.get(`http://localhost:3000/api/users/${userId}`, { withCredentials: true });
    profile.value = profileResponse.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    router.push('/login');
  }
});


4. Benefits of This Approach
Centralized State: The userId is managed in a single place (Pinia store), making it easier to access and update.
Route Protection: The navigation guard ensures that only authenticated users can access protected routes.
Dynamic Handling: The userId is dynamically fetched and validated, preventing errors when it is missing.
Separation of Concerns: The logic for managing authentication is decoupled from App.vue, making the code cleaner and more maintainable.
Let me know if you need further clarification or help implementing this!
