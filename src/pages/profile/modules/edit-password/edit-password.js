import Handlebars from "handlebars";

import LayoutTmpl from "../../../../layout/profile/profile.tmpl";
import EditTmpl from "./edit-password.tmpl";
import InputComponentTmpl from "../../../../components/input/input.tmpl";

import registerInputPartials from "../../../../utils/registerInputPartials";

const InputComponentTemplate = Handlebars.compile(InputComponentTmpl);

const inputsMap = {
  oldPassword: {
    name: "oldPassword",
    type: "password",
  },
  newPassword: {
    name: "newPassword",
    type: "password",
  },
};

registerInputPartials(inputsMap, InputComponentTemplate);

const EditTemplate = Handlebars.compile(EditTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial("pageContent", EditTemplate());

document.body.insertAdjacentHTML("afterbegin", LayoutTemplate());
