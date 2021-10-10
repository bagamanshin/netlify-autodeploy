export default `
<div class="card profile">
  <div class="profile__badge">
    <div class="profile__avatar"></div>
    <h1>Ivan</h1>
  </div>

  <form>
    <fieldset>
      <input type="text" disabled value="User email" />
      <legend>Email</legend>
    </fieldset>
    <fieldset>
      <input type="text" disabled value="User login" />
      <legend>Login</legend>
    </fieldset>
    <fieldset>
      <input type="text" disabled value="User name" />
      <legend>Name</legend>
    </fieldset>
    <fieldset>
      <input type="text" disabled value="User surname" />
      <legend>Surname</legend>
    </fieldset>
    <fieldset>
      <input type="text" disabled value="User nickname" />
      <legend>Nickname</legend>
    </fieldset>
    <fieldset>
      <input type="text" disabled value="User phone number" />
      <legend>Phone number</legend>
    </fieldset>
    <br />
    <div align="right">
      <button class="success" onclick="location.reload('/modules/edit')">Edit profile</button>
      <button class="success">Edit password</button>
      <button>Exit</button>
    </div>
  </form>
</div>
`;
