import Handlebars from "handlebars";

import LayoutTmpl from "../../layout/profile/profile.tmpl";
import ProfileTmpl from "./profile.tmpl";
import InputComponentTmpl from "../../components/input/input.tmpl";

import registerInputPartials from "../../utils/registerInputPartials";

const InputComponentTemplate = Handlebars.compile(InputComponentTmpl);

const inputsMap = {
  emailInput: {
    name: "email",
    value: "User's email",
    disabled: true,
    className: "fieldset__input",
  },
  loginInput: {
    name: "login",
    value: "User's login",
    disabled: true,
    className: "fieldset__input",
  },
  firstNameInput: {
    name: "first_name",
    value: "User's first name",
    disabled: true,
    className: "fieldset__input",
  },
  secondNameInput: {
    name: "second_name",
    value: "User's second name",
    disabled: true,
    className: "fieldset__input",
  },
  displayNameInput: {
    name: "display_name",
    value: "User's nickname",
    disabled: true,
    className: "fieldset__input",
  },
  phoneInput: {
    name: "phone",
    value: "8-800-555-3535",
    disabled: true,
    className: "fieldset__input",
  },
};

registerInputPartials(inputsMap, InputComponentTemplate);

const ProfileTemplate = Handlebars.compile(ProfileTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", ProfileTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
