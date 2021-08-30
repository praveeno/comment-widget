import { commentTemplate,  authorImage, isArray } from './utils.js';
import { BaseComponent } from "./core/base_component.js";
import { Comments as CommentsModel } from "./models/comments.js";
import { Comment } from "./models/comment.js";
import { eventBus } from './event_bus.service.js';

export class Comments extends BaseComponent {
  comments  = new CommentsModel();
  commentAddedSubscription;
  constructor(comments) {
    super();

    if (isArray(comments)) {
      this.comments = comments;
      render();
    };

    this.commentAddedSubscription = eventBus.commentAdded$.subscribe(({content, parentId}) => {
      this.comments.addComment(new Comment(content, "Praveen", parentId));
      this.render();
    });
  }

  destory() {
    this.commentAddedSubscription.unsubscribe();
  }

  render() {
    const template = this.getTemplate();
    super.render(template);
  }

  getTemplate() {
    const comments = this.comments.buildComments();
    return comments.map((c) => this.renderComment(c)).join(" ");
  }

  renderComment(comment, level = 0) {
    function clickEvent(action, id) {
      switch(action) {
        case "reply":
          return eventBus.replyClicked$.emit(comment.id);
        case 'like':
          return eventBus.likeClicked$.emit(comment.id);
        case 'dislike':
          return eventBus.dislikeClicked$.emit(comment.id);
        case 'share':
          return eventBus.shareClicked$.emit(comment.id);
      }
    }
    let template = commentTemplate(
      comment.author || 'Anonymous',
      comment.date || '7 hours ago',
      comment.content,
      comment.authorImage || authorImage,
      level || 0,
      null,
      clickEvent
    )
    if (comment.replies.length > 0) {
      template += comment.replies.map(c => renderComment(c, level + 1)).join();
    }

    return template;
  }
}
