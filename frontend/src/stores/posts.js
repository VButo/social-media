import { defineStore } from "pinia";
import axios from "axios";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    openCommentReply: null,
    openPostComment: null,
  }),
  actions: {
    async openCommentReplyModal(commentId) {
      this.openCommentReply = commentId;
    },
    async closeCommentReplyModal() {
      this.openCommentReply = null;
    },
    async openPostCommentModal(postId) {
      this.openPostComment = postId;
    },
    async closePostCommentModal() {
      this.openPostComment = null;
    },
  },
});