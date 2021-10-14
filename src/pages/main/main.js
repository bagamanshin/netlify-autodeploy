import Handlebars from "handlebars";

import LayoutTmpl from "../../layout/main/main.tmpl";
import MainTmpl from "./main.tmpl";

const MainTemplate = Handlebars.compile(MainTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", MainTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());

Handlebars.unregisterPartial("pageContent");
