import Handlebars from "handlebars";

import LayoutTmpl from "../../../../layout/profile/profile.tmpl";
import EditTmpl from "./edit.tmpl";

import "../../../../layout/profile/profile.scss";
import "./edit.scss";

const EditTemplate = Handlebars.compile(EditTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", EditTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
