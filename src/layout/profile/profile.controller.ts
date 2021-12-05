import Link from '../../components/link';

export default class ProfileLayoutController {
  controls: Record<string, Record<string, Link>>;

  constructor() {
    this.controls = {
      links: {
        goBack: new Link({
          className: 'link--back',
          text: '',
          href: '../'
        })
      }
    };
  }
}
