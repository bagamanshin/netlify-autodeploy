import "./edit-password.scss";

export default `
<div class="card profile">
  <h1>Change password</h1>

  <form action="">
  <fieldset>
    {{> oldPassword }}
    <legend>Old password</legend>
  </fieldset>
  <fieldset>
    {{> newPassword }}
    <legend>New password</legend>
  </fieldset>
    <br />
    <div align="right">
      <button class="success">Change password</button>
    </div>
  </form>
</div>
`;
