export default `
  <input
    {{#if inputClassName}}class="{{inputClassName}}"{{/if}}
    type="{{#if type}}{{type}}{{else}}text{{/if}}"
    {{#if value}}value="{{value}}"{{/if}}
    {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
    {{#if disabled}}disabled{{/if}}
    {{#if focused}}autofocus{{/if}}
  />
  {{#if errorMessage}}<span class="invalid-input-error">{{errorMessage}}</span>{{/if}}
`;
