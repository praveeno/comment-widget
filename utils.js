import { relativeDateTime } from './pipe/date_time.js'

export const commentTemplate = (authorName, time, content, authorImage, level, templateChild, clickHandler) => `
  <div style="padding-left:${level * 16 }px">
    <div class="flex flex-row vpadding">
      <div class="comment-author-image small">
        <img src="${authorImage}">
      </div>
      <div class="flex-column hpadding comment-content">
        <div>
          <span class="comment-author">${authorName}</span>
          <span class="hpadding">${relativeDateTime(time)}</span>
        </div>
        <div>
          ${content}
        </div>
      </div>
    </div>
    <div>
      <span onClick="(${clickHandler.toString()})('reply')">reply</span>
    </div>
    ${templateChild ? templateChild : ''}
  </div>
`
function commentEditTemplate(id) {
  return `
    <div class="comment-box hmargin">
      <input placeholder="reply here" AddComment data-instance="${id}">
    </div>
  `
}
export const authorImage = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

export function getFunctionFromString(string) {
    var scope = window;
    var scopeSplit = string.split('.');
    for (i = 0; i < scopeSplit.length - 1; i++){
        scope = scope[scopeSplit[i]];

        if (scope == undefined) return;
    }

    return scope[scopeSplit[scopeSplit.length - 1]];
}

export const exist = (val) => val !== null && val != undefined;
export const isArray = (val) => exist(val) && Array.isArray(val);


export const units = {
  year  : 24 * 60 * 60 * 1000 * 365,
  month : 24 * 60 * 60 * 1000 * 365/12,
  day   : 24 * 60 * 60 * 1000,
  hour  : 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
}