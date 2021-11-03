export default `
<div class="profile__badge">
  <div class="profile__avatar"></div>
  <h1 class="h2">{{ nickname }}</h1>
</div>

<form>
  <fieldset class="fieldset fieldset--email">
    <legend class="fieldset__legend">Email</legend>
  </fieldset>
  <fieldset class="fieldset fieldset--login">
    <legend class="fieldset__legend">Login</legend>
  </fieldset>
  <fieldset class="fieldset fieldset--first_name">
    <legend class="fieldset__legend">Name</legend>
  </fieldset>
  <fieldset class="fieldset fieldset--second_name">
    <legend class="fieldset__legend">Surname</legend>
  </fieldset>
  <fieldset class="fieldset fieldset--phone">
    <legend class="fieldset__legend">Phone number</legend>
  </fieldset>
  <br />
  <div align="right" class="actions">
    <a href="./modules/edit/index.html" class="button-link">Edit profile</a>
    <a href="./modules/edit-password/index.html" class="button-link">Edit password</a>
  </div>
</form>
`;
