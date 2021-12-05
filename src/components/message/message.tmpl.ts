export default `
  {{#isYou senderIdentity}}
    <div class="chat-thread__message__sender">You:</div>
  {{else}}
    <div class="chat-thread__message__sender">{{sender}}:</div>
  {{/isYou}}
  <div class="chat-thread__message__content">{{content}}</div>
  <div class="chat-thread__message__bottom-line">
    <div class="chat-thread__message__date">{{date}}</div>
    {{#isYou senderIdentity}}
      <div class="chat-thread__message__status">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            class="second-check"
            d="M2 12L7.25 17C7.25 17 8.66939 15.3778 9.875 14M16 7L12.5 11"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="first-check"
            d="M8 12L13.25 17L22 7"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    {{/isYou}}
  </div>
`;
