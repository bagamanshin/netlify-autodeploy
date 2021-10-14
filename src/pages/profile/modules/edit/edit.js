import Handlebars from "handlebars";

import LayoutTmpl from "../../../../layout/profile/profile.tmpl";
import EditTmpl from "./edit.tmpl";
import InputComponentTmpl from "../../../../components/input/input.tmpl";

import registerInputPartials from "../../../../utils/registerInputPartials";

const InputComponentTemplate = Handlebars.compile(InputComponentTmpl);

const inputsMap = {
  emailInput: {
    name: "email",
    value: "User's email",
    className: "fieldset__input",
  },
  loginInput: {
    name: "login",
    value: "User's login",
    className: "fieldset__input",
  },
  firstNameInput: {
    name: "first_name",
    value: "User's first name",
    className: "fieldset__input",
  },
  secondNameInput: {
    name: "second_name",
    value: "User's second name",
    className: "fieldset__input",
  },
  displayNameInput: {
    name: "display_name",
    value: "User's nickname",
    className: "fieldset__input",
  },
  phoneInput: {
    name: "phone",
    value: "8-800-555-3535",
    className: "fieldset__input",
  },
};

registerInputPartials(inputsMap, InputComponentTemplate);

const EditTemplate = Handlebars.compile(EditTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", EditTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
