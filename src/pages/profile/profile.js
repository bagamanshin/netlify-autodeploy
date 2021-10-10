import Handlebars from "handlebars";

import LayoutTmpl from "../../layout/profile/profile.tmpl";
import ProfileTmpl from "./profile.tmpl";

import "../../layout/profile/profile.scss";
import "./profile.scss";

const ProfileTemplate = Handlebars.compile(ProfileTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", ProfileTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
