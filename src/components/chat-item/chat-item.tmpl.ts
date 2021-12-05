export default `
  <div class="chatlist__item__left">
    <div class="chatlist__item__avatar"></div>
  </div>
  <div class="chatlist__item__mid">
    <div class="chatlist__item__name"> {{ title }} </div>
    {{#notFalsy content}}
      <div class="chatlist__item__message chatlist__item__message--{{ lastMessageSender }}">
        <span class="chatlist__item__author"> {{ author }} </span>:
        {{ content }}
      </div>
    {{/notFalsy}}
  </div>
  <div class="chatlist__item__right">
    {{#notFalsy date}}
      <div class="chatlist__item__date"> {{ date }} </div>
    {{/notFalsy}}
    {{#biggerThan unread_count 0}}
      <div class="chatlist__item__unread-count"> {{ unread_count }} </div>
    {{/biggerThan}}
  </div>
`;
