import Handlebars from 'handlebars';

export default function registerInputPartials(
  inputsMap: { [key: string]: { [key: string]: string | boolean } },
  inputTemplate: Handlebars.TemplateDelegate,
): void {
  Object.keys(inputsMap).forEach((key) => {
    Handlebars.registerPartial(key, inputTemplate(inputsMap[key]));
  });
}
