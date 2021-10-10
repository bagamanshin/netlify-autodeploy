import Handlebars from "handlebars";

import LayoutTmpl from "../../layout/main/main.tmpl";
import RegisterTmpl from "./register.tmpl";

import "./register.scss";

const RegisterTemplate = Handlebars.compile(RegisterTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", RegisterTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
