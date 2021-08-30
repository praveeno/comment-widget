export const commentTemplate = (authorName, time, content, authorImage, level) => `
  <div class="flex flex-row vpadding" style="padding-left:${level * 16 }px">
    <div class="comment-author-image small">
      <img src="${authorImage}">
    </div>
    <div class="flex-column hpadding comment-content">
      <div>
        <span class="comment-author">${authorName}</span>
        <span class="hpadding">${time}</span>
      </div>
      <div>
        ${content}
      </div>
    </div>
  </div>
`
export const authorImage = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
