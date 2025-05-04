import { io } from "socket.io-client";

const socket = io("https://social-media-nbs1.onrender.com", {
    withCredentials: true
});

export default socket;