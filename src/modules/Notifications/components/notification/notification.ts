import Handlebars from 'handlebars';

import { Block } from '../../..';

import { IBlockProps } from '../../../Block/types';

import template from './notification.tmpl';

import './notification.scss';

import { Notifications } from '../../../../enums';

interface INotificationProps {
  notificationType: Notifications;
  title: string;
  text: string;
}

export default class Notification extends Block<HTMLDivElement, INotificationProps> {
  constructor(props: INotificationProps & Partial<IBlockProps & HTMLDivElement>) {
    const wrapClass = `notification notification_${props.notificationType}`;
    super('div', {
      ...props,
      className: props.className ? `${props.className} ${wrapClass}` : wrapClass
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    const {
      title,
      text,
      notificationType
    } = this.props;

    return compiledTemplate({
      title,
      text,
      notificationType
    });
  }
}
