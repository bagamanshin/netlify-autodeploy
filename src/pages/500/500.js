import Handlebars from "handlebars";

import LayoutTmpl from "../../layout/main/main.tmpl";
import tmpl from "./500.tmpl";

const template = Handlebars.compile(tmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", template());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());

Handlebars.unregisterPartial("pageContent");
