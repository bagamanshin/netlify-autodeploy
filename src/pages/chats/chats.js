import Handlebars from "handlebars";

import LayoutTmpl from "../../layout/chats/chats.tmpl";
import ChatsTmpl from "./chats.tmpl";

import "../../layout/chats/chats.scss";
import "./chats.scss";

const MainTemplate = Handlebars.compile(ChatsTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", MainTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
