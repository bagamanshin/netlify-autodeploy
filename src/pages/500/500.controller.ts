import Link from '../../components/link';

export default class Page500Controller {
  controls: Record<string, Record<string, Link>>;

  constructor() {
    this.controls = {
      links: {
        goToMainPage: new Link({
          className: 'text--greeny',
          text: 'Try a little bit later',
          href: '/'
        })
      }
    };
  }
}
