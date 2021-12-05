import Input from '../../components/input';
import Button from '../../components/button';
import Link from '../../components/link';
import Image from '../../components/image';

import logoutApi from '../../api/logout-api';
import { bus } from '../../modules';

import { UserResponse } from '../../types';

import { data, avatarData as avatar } from './profile.model';

export default class RegisterController {
  controls: Record<string, Record<string, Input | Button | Link | Image>>;

  constructor() {
    const {
      email,
      login,
      // eslint-disable-next-line
      first_name,
      // eslint-disable-next-line
      second_name,
      // eslint-disable-next-line
      display_name,
      phone
    } = data;

    const setPropsToInputs = (userData: UserResponse) => {
      const inputFieldNames: Array<keyof Omit<UserResponse, 'id' | 'avatar'>> = [
        'email',
        'login',
        'first_name',
        'second_name',
        'display_name',
        'phone'
      ];
      inputFieldNames.forEach((name) => {
        this.controls.inputs[name].setProps({ value: userData[name] });
      });

      this.controls.images.avatar.setProps({ imageData: userData.avatar });
    };

    bus.on('user:set-data', (userData: UserResponse) => {
      setPropsToInputs(userData);
    });

    this.controls = {
      inputs: {
        email: new Input({
          inputClassName: 'fieldset__input',
          name: 'email',
          value: email,
          disabled: true
        }),
        login: new Input({
          inputClassName: 'fieldset__input',
          name: 'login',
          value: login,
          disabled: true
        }),
        first_name: new Input({
          inputClassName: 'fieldset__input',
          name: 'first_name',
          value: first_name,
          disabled: true
        }),
        second_name: new Input({
          inputClassName: 'fieldset__input',
          name: 'second_name',
          value: second_name,
          disabled: true
        }),
        display_name: new Input({
          inputClassName: 'display_name__input',
          name: 'display_name',
          // eslint-disable-next-line
          value: display_name,
          disabled: true
        }),
        phone: new Input({
          inputClassName: 'fieldset__input',
          name: 'phone',
          value: phone,
          disabled: true
        }),
        avatar: new Input({
          inputClassName: 'avatar__input',
          name: 'avatar',
          value: '',
          disabled: true
        })
      },
      buttons: {
        exit: new Button({
          text: 'Log out',
          status: 'error',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              logoutApi.request().then((response) => {
                if (response.ok) {
                  bus.emit('user:logged', false);
                }
              });
            }
          }
        })
      },
      links: {
        goToEditPage: new Link({
          text: 'Edit profile',
          className: 'button-link mr-10',
          href: '/settings/edit'
        }),
        goToEditPasswordPage: new Link({
          text: 'Edit password',
          className: 'button-link mr-10',
          href: '/settings/edit-password'
        })
      },
      images: {
        avatar: new Image({
          className: 'profile__avatar__image-container',
          imgClass: 'profile__avatar__image',
          imageData: avatar.url
        })
      }
    };
  }
}
