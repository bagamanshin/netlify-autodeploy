export default `
<div class="login">
    <h1 class="h2 login__title" align="center">Login</h1>
    <br />
    <form action="">
      <fieldset class="fieldset">
        {{> loginInput}}
        <legend class="fieldset__legend">Login</legend>
      </fieldset>
      <fieldset class="fieldset">
        {{> passwordInput}}
        <legend class="fieldset__legend">Password</legend>
      </fieldset>
      <br />
      <div align="right">
        <button class="button button--success">Log in</button>
        <br />
        <br />
        <a href="/registration" style="color: orchid">Нет аккаунта?</a>
      </div>
    </form>
  </div>
`;
