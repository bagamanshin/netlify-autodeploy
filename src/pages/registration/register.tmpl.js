export default `
<div class="register">
  <h1 class="h2 register__title" align="center">Registration</h1>
  <br />
  <form action="">
    <fieldset class="fieldset">
      <legend class="fieldset__legend">Email</legend>
      {{> emailInput}}
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset__legend">Login</legend>
      {{> loginInput}}
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset__legend">Name</legend>
      {{> firstNameInput}}
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset__legend">Surname</legend>
      {{> secondNameInput}}
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset__legend">Phone number</legend>
      {{> phoneInput}}
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset__legend">Password</legend>
      {{> passwordInput}}
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset__legend">Repeat password</legend>
      {{> repeatPasswordInput}}
    </fieldset>
    <br />
    <div align="right">
      <button class="button button--success">Register</button>
      <br />
      <br />
      <a href="../login/index.html" style="color: orchid">Log in</a>
    </div>
  </form>
</div>
`;
