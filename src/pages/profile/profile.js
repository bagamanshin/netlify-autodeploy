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
  },
  loginInput: {
    name: "login",
    value: "User's login",
    disabled: true,
  },
  firstNameInput: {
    name: "first_name",
    value: "User's first name",
    disabled: true,
  },
  secondNameInput: {
    name: "second_name",
    value: "User's second name",
    disabled: true,
  },
  displayNameInput: {
    name: "display_name",
    value: "User's nickname",
    disabled: true,
  },
  phoneInput: {
    name: "phone",
    value: "8-800-555-3535",
    disabled: true,
  },
};

registerInputPartials(inputsMap, InputComponentTemplate);

const ProfileTemplate = Handlebars.compile(ProfileTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", ProfileTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
