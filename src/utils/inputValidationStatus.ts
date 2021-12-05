import Input from '../components/input';

type InputValidationStatus = 'valid' | 'invalid';

function setInputValidationStatus<
  T extends Record<string, Input>
>(inputs: T, field: keyof T, status: InputValidationStatus) {
  switch (status) {
    case 'valid':
      inputs[field].setProps({ errorMessage: '' });
      this
        .getContent()
        .querySelector(`.fieldset--${field}`)
        ?.classList.remove('fieldset--error');
      break;
    case 'invalid':
      inputs[field].setProps({ errorMessage: `Incorrect ${field}` });
      this
        .getContent()
        .querySelector(`.fieldset--${field}`)
        ?.classList.add('fieldset--error');
      break;
    default:
      break;
  }
}

export default setInputValidationStatus;
