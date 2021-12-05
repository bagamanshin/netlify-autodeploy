import { Block } from '..';
import { Roles } from '../../enums';

interface IProps {
  rootQuery: string;
  permissions : Roles[]
}

export default class Route {
  _pathname: string;

  _blockClass: { new(): Block };

  _block: Block | null;

  _props: IProps;

  constructor(pathname: string, view: { new(): Block }, props: IProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      this._block.renderDOM(this._props.rootQuery);
      return;
    }

    this._block.show();
  }
}
