import { AddComment } from './add_comment.js';
import { Comments } from './comments.js';
import { Comment } from './models/comment.js';
import { InputTextCount } from './input_count.js';

import { LocalStorage } from './local_storage.js';
import { eventBus } from './event_bus.service.js';


class App {

  constructor() {
    const lDB = new LocalStorage();

    let comments = new LocalStorage().get('widget-comments/list');
    eventBus.commentSave$.subscribe(({comments}) =>
      lDB.set('widget-comments/list', comments.map(c => c.toJson())));

    if (comments != null && comments.length > 0) {
      comments = comments.map(Comment.fromComment);
    }

    new AddComment();
    new Comments(comments);
    new InputTextCount();
  }
}


// trigger app
let app;
document.addEventListener('DOMContentLoaded',() => app = new App());