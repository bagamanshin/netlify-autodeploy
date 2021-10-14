export default `
  <input
    {{#if className}}class="{{className}}"{{/if}}
    type="{{#if type}}{{type}}{{else}}text{{/if}}"
    {{#if value}}value="{{value}}"{{/if}}
    {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
    {{#if disabled}}disabled{{/if}}
  />
`;
