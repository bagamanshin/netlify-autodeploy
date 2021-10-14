import Handlebars from "handlebars";

import LayoutTmpl from "../../layout/main/main.tmpl";
import RegisterTmpl from "./register.tmpl";
import InputComponentTmpl from "../../components/input/input.tmpl";

import registerInputPartials from "../../utils/registerInputPartials";

const InputComponentTemplate = Handlebars.compile(InputComponentTmpl);

const inputsMap = {
  emailInput: {
    name: "email",
  },
  loginInput: {
    name: "login",
  },
  firstNameInput: {
    name: "first_name",
  },
  secondNameInput: {
    name: "second_name",
  },
  phoneInput: {
    name: "phone",
  },
  passwordInput: {
    name: "password",
    type: "password",
  },
  repeatPasswordInput: {
    name: "repeat_password",
    type: "password",
  },
};

registerInputPartials(inputsMap, InputComponentTemplate);

const RegisterTemplate = Handlebars.compile(RegisterTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", RegisterTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
