import Notification from './components/notification';

import { bus } from '..';

import { Notifications } from '../../enums';

import './notifications.scss';

export default class NotificationsModule {
  private container: HTMLDivElement;

  init() {
    this.container = document.createElement('div');
    this.container.classList.add('notifications-container');

    document.body.appendChild(this.container);

    bus.on('notification-open', (
      { type, title, text }: {type: Notifications, title: string, text: string}
    ) => {
      this.open({ type, title, text });
    });
  }

  open({ type, title, text }: {type: Notifications, title: string, text: string}) {
    const notification = new Notification({
      notificationType: type,
      title,
      text,
      events: {
        click(e: MouseEvent) {
          const el = e.target as HTMLElement;
          if (el.classList.contains('notification__close')) {
            this.getContent().remove();
          }
        }
      }
    });
    this.container.appendChild(notification.getContent());
  }
}
