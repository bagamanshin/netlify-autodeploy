const tmpl = `
<div class="register">
  <h1 align="center">Registration</h1>
  <br />
  <form action="">
    <fieldset>
      <legend>Email</legend>
      <input type="text" placeholder="" />
    </fieldset>
    <fieldset>
      <legend>Login</legend>
      <input type="text" />
    </fieldset>
    <fieldset>
      <legend>Name</legend>
      <input type="text" />
    </fieldset>
    <fieldset>
      <legend>Surname</legend>
      <input type="text" />
    </fieldset>
    <fieldset>
      <legend>Phone number</legend>
      <input type="text" />
    </fieldset>
    <fieldset>
      <legend>Password</legend>
      <input type="password" />
    </fieldset>
    <fieldset>
      <legend>Repeat password</legend>
      <input type="password" />
    </fieldset>
    <br />
    <div align="right">
      <button class="success">RegisterR</button>
      <br />
      <br />
      <a href="/login/index.html" style="color: orchid">Log in</a>
    </div>
  </form>
</div>
`;

export default tmpl;
