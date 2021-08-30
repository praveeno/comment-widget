export class Comments {
  comments = [];
  constructor(comments) {
    if (comments != null && Array.isArray(comments)) {
      this.comments = comments;
    }
  }

  buildComments() {
    const initAndGet = (comment) => commentHashMap[comment.id] = commentHashMap[comment.id] || comment;

    const commentHashMap = {};
    this.comments.forEach(comment => {
      initAndGet(comment);
      if (comment.parentCommentId) {
        commentHashMap[comment.parentCommentId].addReply(commentHashMap[comment.id]);
      }
    });

    return Object.values(commentHashMap).filter((value) => value.root);
  }


  updateComment(commentId, newComment) {
    const comment = this.comments.find(comment => comment.id === commentId);
    Object.assign(comment, newComment);
  }

  addComment(comment) {
    this.comments.push(comment);
  }
}