import Handlebars from "handlebars";

import LayoutTmpl from "../../layout/main/main.tmpl";
import LoginTmpl from "./login.tmpl";
import InputComponentTmpl from "../../components/input/input.tmpl";

import registerInputPartials from "../../utils/registerInputPartials";

const InputComponentTemplate = Handlebars.compile(InputComponentTmpl);
const LoginTemplate = Handlebars.compile(LoginTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

const inputsMap = {
  loginInput: {
    name: "login",
  },
  passwordInput: {
    name: "password",
    type: "password",
  },
};

registerInputPartials(inputsMap, InputComponentTemplate);

Handlebars.registerPartial("pageContent", LoginTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
