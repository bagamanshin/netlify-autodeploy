export default `
<div class="card profile">
  <h1 class="h2">Change password</h1>

  <form action="">
  <fieldset class="fieldset">
    {{> oldPassword }}
    <legend class="fieldset__legend">Old password</legend>
  </fieldset>
  <fieldset class="fieldset">
    {{> newPassword }}
    <legend class="fieldset__legend">New password</legend>
  </fieldset>
    <br />
    <div align="right">
      <button class="button button--success">Change password</button>
    </div>
  </form>
</div>
`;
