export class Comment {
  constructor(content, author, likes, parentId) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.content = content;
    this.author = author || 'Anonymous';
    this.date = +new Date();
    this.parentId = parentId;
    this.likes = likes || 0;

    this.root = !parentId;
    this.replies = [];
  }

  addReply(comment) {
    this.replies.push(comment)
  }

  static fromComment(comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.author = comment.author;
    this.date = comment.date;
    this.parentId = comment.parentId;
    this.likes = comment.likes;
  }

  toJson() {
    return {
      id : this.id,
      content : this.content,
      author : this.author,
      date : this.date,
      parentId : this.parentId,
      likes : this.likes,
    }
  }
}