import "./register.scss";

const tmpl = `
<div class="register">
  <h1 align="center">Registration</h1>
  <br />
  <form action="">
    <fieldset>
      <legend>Email</legend>
      {{> emailInput}}
    </fieldset>
    <fieldset>
      <legend>Login</legend>
      {{> loginInput}}
    </fieldset>
    <fieldset>
      <legend>Name</legend>
      {{> firstNameInput}}
    </fieldset>
    <fieldset>
      <legend>Surname</legend>
      {{> secondNameInput}}
    </fieldset>
    <fieldset>
      <legend>Phone number</legend>
      {{> phoneInput}}
    </fieldset>
    <fieldset>
      <legend>Password</legend>
      {{> passwordInput}}
    </fieldset>
    <fieldset>
      <legend>Repeat password</legend>
      {{> repeatPasswordInput}}
    </fieldset>
    <br />
    <div align="right">
      <button class="success">Register</button>
      <br />
      <br />
      <a href="/login" style="color: orchid">Log in</a>
    </div>
  </form>
</div>
`;

export default tmpl;
