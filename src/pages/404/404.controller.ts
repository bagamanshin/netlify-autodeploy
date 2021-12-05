import Link from '../../components/link';

export default class Page404Controller {
  controls: Record<string, Record<string, Link>>;

  constructor() {
    this.controls = {
      links: {
        goToMainPage: new Link({
          className: 'text--greeny',
          text: 'Go home >',
          href: '/'
        })
      }
    };
  }
}
