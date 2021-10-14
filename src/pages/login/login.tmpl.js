import "./login.scss";

export default `
<div class="login">
    <h1 align="center">Login</h1>
    <br />
    <form action="">
      <fieldset>
        {{> loginInput}}
        <legend>Login</legend>
      </fieldset>
      <fieldset>
        {{> passwordInput}}
        <legend>Password</legend>
      </fieldset>
      <br />
      <div align="right">
        <button class="success">Log in</button>
        <br />
        <br />
        <a href="/registration" style="color: orchid">Нет аккаунта?</a>
      </div>
    </form>
  </div>
`;
