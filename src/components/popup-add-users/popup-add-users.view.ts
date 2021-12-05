import Handlebars from 'handlebars';

import { Block, bus } from '../../modules';

import template from './popup-add-users.tmpl';

import './popup-add-users.scss';

import PopupAddUsersController from './popup-add-users.controller';

import setInputValidationStatus from '../../utils/inputValidationStatus';

import { IBlockProps } from '../../modules/Block/types';

type IPopupProps = {};

const popupAddUsersController = new PopupAddUsersController();

type InputType = keyof typeof popupAddUsersController.controls.inputs;

export default class PopupAddUsers extends Block<HTMLDivElement, IPopupProps> {
  constructor(
    props: Partial<IPopupProps & Partial<IBlockProps & HTMLDivElement>>
  ) {
    const wrapClass = 'popup';
    super('div', {
      ...props,
      className: props.className ? `${props.className} ${wrapClass}` : wrapClass,
      events: {
        click: (e) => {
          if (e.target.classList.contains('popup')) {
            this.hide();
          }
        }
      }
    });

    this.hide();

    bus.on('popup-add-users:show', () => {
      this.show();
    });
    bus.on('popup-add-users:hide', () => {
      this.hide();
    });
  }

  hide() {
    Block.prototype.hide.call(this);
    Object.keys(popupAddUsersController.controls.inputs).forEach((field: InputType) => {
      setInputValidationStatus.call(this, popupAddUsersController.controls.inputs, field, 'valid');
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    const wrap = document.createElement('div');
    wrap.classList.add('popup__inner');
    wrap.classList.add('card');
    wrap.innerHTML = compiledTemplate({});

    const inputFieldset = wrap.querySelector('.fieldset--popup-add-user-ids');
    inputFieldset?.append(popupAddUsersController.controls.inputs.users.getContent());

    bus.on('popup-add-users:valid-field', (field: InputType) => {
      setInputValidationStatus.call(this, popupAddUsersController.controls.inputs, field, 'valid');
    });
    bus.on('popup-add-users:invalid-field', (field: InputType) => {
      setInputValidationStatus.call(this, popupAddUsersController.controls.inputs, field, 'invalid');
    });
    bus.on('popup-add-users:reset-check-results', () => {
      Object.keys(popupAddUsersController.controls.inputs).forEach((field: InputType) => {
        setInputValidationStatus.call(this, popupAddUsersController.controls.inputs, field, 'valid');
      });
    });

    const formActionsBlock = wrap.querySelector('.popup__inner--add-user__form-actions');
    formActionsBlock?.append(popupAddUsersController.controls.buttons.close.getContent());
    formActionsBlock?.append(popupAddUsersController.controls.buttons.add.getContent());

    return wrap;
  }
}
