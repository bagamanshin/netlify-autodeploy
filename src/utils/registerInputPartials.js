import Handlebars from "handlebars";

export default function registerInputPartials(inputsMap, inputTemplate) {
  for (let [name, props] of Object.entries(inputsMap)) {
    Handlebars.registerPartial(name, inputTemplate(props));
  }
}
