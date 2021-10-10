import Handlebars from "handlebars";

import LayoutTmpl from "../../layout/main/main.tmpl";
import LoginTmpl from "./login.tmpl";

import "./login.scss";

const LoginTemplate = Handlebars.compile(LoginTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", LoginTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
