import "./edit.scss";

export default `
<div class="card profile">
  <div class="profile__badge">
    <div class="profile__avatar"></div>
    <h1>Ivan</h1>
  </div>

  <form action="">
  <fieldset>
    {{> emailInput }}
    <legend>Email</legend>
  </fieldset>
  <fieldset>
    {{> loginInput }}
    <legend>Login</legend>
  </fieldset>
  <fieldset>
    {{>firstNameInput }}
    <legend>Name</legend>
  </fieldset>
  <fieldset>
    {{> secondNameInput }}
    <legend>Surname</legend>
  </fieldset>
  <fieldset>
    {{>displayNameInput }}
    <legend>Nickname</legend>
  </fieldset>
  <fieldset>
    {{>phoneInput}}
    <legend>Phone number</legend>
  </fieldset>
    <br />
    <div align="right">
      <button class="success">Save</button>
    </div>
  </form>
</div>
`;
