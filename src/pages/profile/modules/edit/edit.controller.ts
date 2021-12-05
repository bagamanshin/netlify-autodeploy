import { bus } from '../../../../modules';

import Input from '../../../../components/input';
import Button from '../../../../components/button';
import Image from '../../../../components/image';

import { data, avatarData as avatar } from './edit.model';

import { UserResponse } from '../../../../types';

export default class EditController {
  controls: Record<string, Record<string, Input | Button | Image>>;

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

    bus.on('edit:setup-inputs', (userData: UserResponse) => {
      setPropsToInputs(userData);
    });

    bus.on('user:set-data', (userData: UserResponse) => {
      setPropsToInputs(userData);
    });

    bus.on('user:avatar-locally-updated', (file: null | File) => {
      this.controls.images.avatar.setProps({ imageData: file });
    });

    bus.on('user:update-profile-start', () => {
      this.controls.buttons.save.setProps({ disabled: true });
    });

    bus.on('user:update-profile-end', () => {
      this.controls.buttons.save.setProps({ disabled: false });
    });

    this.controls = {
      inputs: {
        email: new Input({
          inputClassName: 'fieldset__input',
          name: 'email',
          value: email,
          events: {
            input(e: InputEvent) {
              bus.emit(
                'edit:set-field-data',
                'email',
                (e.target as HTMLInputElement).value
              );
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('edit:check-field', 'email');
            }
          }
        }),
        login: new Input({
          inputClassName: 'fieldset__input',
          name: 'login',
          value: login,
          events: {
            input(e: InputEvent) {
              bus.emit(
                'edit:set-field-data',
                'login',
                (e.target as HTMLInputElement).value
              );
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('edit:check-field', 'login');
            }
          }
        }),
        first_name: new Input({
          inputClassName: 'fieldset__input',
          name: 'first_name',
          value: first_name,
          events: {
            input(e: InputEvent) {
              bus.emit(
                'edit:set-field-data',
                'first_name',
                (e.target as HTMLInputElement).value
              );
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('edit:check-field', 'first_name');
            }
          }
        }),
        second_name: new Input({
          inputClassName: 'fieldset__input',
          name: 'second_name',
          value: second_name,
          events: {
            input(e: InputEvent) {
              bus.emit(
                'edit:set-field-data',
                'second_name',
                (e.target as HTMLInputElement).value
              );
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('edit:check-field', 'second_name');
            }
          }
        }),
        display_name: new Input({
          inputClassName:
            'fieldset__input display_name__input fieldset__input display_name__input--editable ',
          name: 'display_name',
          // eslint-disable-next-line
          value: display_name || '',
          events: {
            input(e: InputEvent) {
              bus.emit(
                'edit:set-field-data',
                'display_name',
                (e.target as HTMLInputElement).value
              );
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              // bus.emit('edit:check-field', 'second_name');
            }
          }
        }),
        phone: new Input({
          inputClassName: 'fieldset__input',
          name: 'phone',
          value: phone,
          events: {
            input(e: InputEvent) {
              bus.emit(
                'edit:set-field-data',
                'phone',
                (e.target as HTMLInputElement).value
              );
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('edit:check-field', 'phone');
            }
          }
        }),
        avatar: new Input({
          inputClassName: 'profile__avatar__input__el',
          className: 'profile__avatar__input',
          name: 'avatar',
          type: 'file',
          value: '',
          events: {
            change(e: InputEvent) {
              const input = e.target as HTMLInputElement;
              bus.emit('edit:set-avatar', input.files ? input.files[0] : null);
              this.setProps({
                value: (input.files && input.files[0])?.name || ''
              });
            }
          }
        })
      },
      buttons: {
        save: new Button({
          text: 'Save',
          status: 'success',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              bus.emit('edit:check-form');
            }
          }
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
