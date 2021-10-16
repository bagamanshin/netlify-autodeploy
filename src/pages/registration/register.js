import Handlebars from "handlebars";

import LayoutTmpl from "../../layout/main/main.tmpl";
import RegisterTmpl from "./register.tmpl";
import InputComponentTmpl from "../../components/input/input.tmpl";

import registerInputPartials from "../../utils/registerInputPartials";

const InputComponentTemplate = Handlebars.compile(InputComponentTmpl);

const inputsMap = {
  emailInput: {
    name: "email",
    className: "fieldset__input",
  },
  loginInput: {
    name: "login",
    className: "fieldset__input",
  },
  firstNameInput: {
    name: "first_name",
    className: "fieldset__input",
  },
  secondNameInput: {
    name: "second_name",
    className: "fieldset__input",
  },
  phoneInput: {
    name: "phone",
    className: "fieldset__input",
  },
  passwordInput: {
    name: "password",
    type: "password",
    className: "fieldset__input",
  },
  repeatPasswordInput: {
    name: "repeat_password",
    type: "password",
    className: "fieldset__input",
  },
};

registerInputPartials(inputsMap, InputComponentTemplate);

const RegisterTemplate = Handlebars.compile(RegisterTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", RegisterTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
