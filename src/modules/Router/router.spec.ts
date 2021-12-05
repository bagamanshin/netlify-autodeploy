import { DOMWindow, JSDOM } from 'jsdom';
import 'jsdom-global/register';

import assert from 'assert';

import { Roles } from '../../enums';

import { Block, bus, Router } from '..';

function firePopstateOnRoute(window: DOMWindow): void {
  const { history } = window;
  const originalBack = history.back;
  const originalPushState = history.pushState;
  const originalForwards = history.forward;

  // @ts-ignore
  history.__stack = [window.location.pathname];
  // @ts-ignore
  history.__length = history.__stack.length;

  history.pushState = function patchedBack(this: History, ...args: Parameters<History['back']>): void {
    originalPushState.apply(this, args);

    // @ts-ignore
    const path = args[2];

    // @ts-ignore
    history.__length += 1;

    // @ts-ignore
    history.__stack.push(path);
    window.dispatchEvent(new window.PopStateEvent('popstate'));
  };

  history.back = function patchedBack(this: History, ...args: Parameters<History['back']>): void {
    originalBack.apply(this, args);

    // @ts-ignore
    history.__length -= 1;
    // @ts-ignore
    const path = history.__stack[history.__length - 1];

    const event = new window.PopStateEvent('popstate');

    // abstract off window.location.pathname
    if (path) {
      Object.defineProperty(event, 'currentTarget', {
        value: {
          location: {
            pathname: path
          }
        }
      });
    }

    window.dispatchEvent(event);
  };

  history.forward = function patchedForward(this: History, ...args: Parameters<History['forward']>): void {
    originalForwards.apply(this, args);

    // @ts-ignore
    history.__length += 1;
    // @ts-ignore
    const path = history.__stack[history.__length - 1];

    const event = new window.PopStateEvent('popstate');

    // abstract off window.location.pathname
    if (path) {
      Object.defineProperty(event, 'currentTarget', {
        value: {
          location: {
            pathname: path
          }
        }
      });
    }

    window.dispatchEvent(event);
  };
}

class Page1 extends Block {
  constructor() {
    super('div');
  }

  render() {
    return '';
  }
}

class Page2 extends Block {
  constructor() {
    super('div');
  }

  render() {
    return '';
  }
}

class Page3 extends Block {
  constructor() {
    super('div');
  }

  render() {
    return '';
  }
}

const Page1Pathname = '/page-1';
const Page2Pathname = '/page-2';
const Page3Pathname = '/page-3';

describe('Router navigation:', () => {
  let router: Router;

  beforeEach(() => {
    const { window } = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
      url: 'http://localhost/'
    });
    firePopstateOnRoute(window);

    // @ts-ignore
    // eslint-disable-next-line
    global.document = window.document;
    // @ts-ignore
    global.window = window;

    router = new Router('body');

    Router._defaultPath = {
      [Roles.user]: Page3Pathname,
      [Roles.guest]: Page1Pathname
    };

    router._routeHasChanged = () => {};

    router
      .use(Page1Pathname, Page1, { permissions: [Roles.guest] })
      .use(Page2Pathname, Page2, { permissions: [Roles.guest] })
      .use(Page3Pathname, Page3, { permissions: [Roles.user] })
      .start();
  });

  it('should spawn on the page 1', () => {
    assert.equal(router._currentRoute?._pathname, Page1Pathname);
  });

  it('should go to page 2', () => {
    router.go(Page2Pathname);
    assert.equal(router._currentRoute?._pathname, Page2Pathname);
  });

  it('shouldn\'t go to page 3', () => {
    router.go(Page3Pathname);
    assert.equal(router._currentRoute?._pathname, Page1Pathname);
  });

  it('should go back', () => {
    router.go(Page2Pathname);
    router.back();
    assert.equal(router._currentRoute?._pathname, Page1Pathname);
  });

  it('should go forward', () => {
    router.go(Page2Pathname);
    router.back();
    router.forward();
    assert.equal(router._currentRoute?._pathname, Page2Pathname);
  });

  it('should spawn on the page 3: [Authorization: enabled]', () => {
    bus.emit('user:logged', true);
    assert.equal(router._currentRoute?._pathname, Page3Pathname);
  });

  it('shouldn\'t go to page 1 & 2: [Authorization: enabled]', () => {
    bus.emit('user:logged', true);
    router.go(Page1Pathname);
    router.go(Page2Pathname);
    assert.equal(router._currentRoute?._pathname, Page3Pathname);
  });

  afterEach(() => {
    window.close();
    document.close();
    bus.emit('user:logged', false);
    router.destroy();
    // @ts-ignore
    delete global.window;
    // @ts-ignore
    delete global.document;
  });
});
