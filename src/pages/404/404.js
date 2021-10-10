import Handlebars from "handlebars";

import LayoutTmpl from "../../layout/main/main.tmpl";
import tmpl from "./404.tmpl";

import "./404.scss";
import "../../layout/main/main.scss";

const template = Handlebars.compile(tmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", template());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
