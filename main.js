import { commentTemplate,  authorImage } from './utils.js';

// init
const input = document.getElementById('comment-box');
const count = document.getElementById('counting');

// onInit
const comments = getComments();

if (comments.length) {
  renderComments();
}

// event listeners
input.addEventListener('keydown', (ev) => {
  if (ev.keyCode === 13) {
    const comment = input.value;
    addComment(comment, null);
    input.value = '';
  }
  if (ev.target.value.length > 200) {
    ev.target.value = ev.target.value.substr(0, 200)
    ev.preventDefault();
  }
  count.innerHTML = ev.target.value.length + ' / 200 words';
})

function renderComments() {
  const comments = buildComments();
  const commentList = document.getElementById('comment-list');
  commentList.innerHTML = '';
  let template = '';
  comments.forEach(comment => {
    template += renderComment(comment);
  });
  commentList.innerHTML = template;
}

function renderComment(comment, level = 0) {
  let template = commentTemplate(comment.authorName || 'Anonymous', comment.time || '7 hours ago', comment.comment, comment.authorImage || authorImage, level || 0);
  if (comment.replies.length > 0) {
    template += comment.replies.map(c => renderComment(c, level + 1)).join();
  }

  return template;
}

function addComment(comment, parentCommentId) {
  comments.push({
    id: Math.random().toString(36).substr(2, 9),
    comment,
    parentCommentId,
    likes: 0,
    time: +new Date(),
  });
  renderComments();
  saveComments();
}

function sortByDate() {
  comments.sort((a, b) => a-b);
  renderComments();
  saveComments();
}

function editComment(commentContent, commentId) {
  const comment = comments.find(x => x.id === commentId);
  comment.comment = commentContent;
  renderComments();
  saveComments();
}

function updateCommentLikes(commentId) {
  const comment = comments.find(x => x.id === commentId);
  ++comment.likes;
  renderComments();
  saveComments();
}


function saveComments() {
  localStorage.setItem('comments-widget/comments',JSON.stringify(comments));
}

function getComments() {
  const commentStr = localStorage.getItem('comments-widget/comments');
  if (commentStr) {
    return JSON.parse(commentStr);
  }
  return []
}

function buildComments() {
  const initAndGet = (comment) => commentHashMap[comment.id] = commentHashMap[comment.id] || {...comment, root: !comment.parentCommentId, replies: []};

  const commentHashMap = {};
  comments.forEach(comment => {
    initAndGet(comment);
    if (comment.parentCommentId) {
      commentHashMap[comment.parentCommentId].replies.push(commentHashMap[comment.id]);
    }
  });

  return Object.values(commentHashMap).filter((value) => value.root);
}