import { JSDOM } from 'jsdom';
import 'jsdom-global/register';

import assert from 'assert';

// eslint-disable-next-line
import * as MockXMLHttpRequest from 'mock-xmlhttprequest';

import HTTP from './http';
import { Block, bus, Router } from '..';
import { Roles } from '../../enums';

class Page404 extends Block {
  constructor() {
    super('div');
  }

  render() {
    return '';
  }
}
const page404Pathname = '/404';

class Page500 extends Block {
  constructor() {
    super('div');
  }

  render() {
    return '';
  }
}
const page500Pathname = '/500';

class GuestPage extends Block {
  constructor() {
    super('div');
  }

  render() {
    return '';
  }
}
const pageGuestPathname = '/guest';

class UserPage extends Block {
  constructor() {
    super('div');
  }

  render() {
    return '';
  }
}
const pageUserPathname = '/user';

describe('HTTP:', () => {
  let MockXhr: typeof MockXMLHttpRequest.MockXhr;

  const http = new HTTP('');

  function mockResponse(response: string, status: number) {
    // Mock JSON response
    MockXhr.onSend = (xhr) => {
      const responseHeaders = { 'Content-Type': 'application/json' };
      xhr.respond(status, responseHeaders, response);
    };
  }
  const XMLHttpRequestOriginal = global.XMLHttpRequest;

  beforeEach(() => {
    MockXhr = MockXMLHttpRequest.newMockXhr();
    // Install in the global context so "new XMLHttpRequest()" uses the XMLHttpRequest mock
    // @ts-ignore
    global.XMLHttpRequest = MockXhr;
  });

  it('should send GET', async () => {
    const response = '{ "message": "Success GET!" }';
    mockResponse(response, 200);
    const { data } = await http.get('/url');
    assert.equal(data, response);
  });

  it('should send POST', async () => {
    const response = '{ "message": "Success POST!" }';
    mockResponse(response, 200);
    const { data } = await http.post('/url');
    assert.equal(data, response);
  });

  it('should send PUT', async () => {
    const response = '{ "message": "Success PUT!" }';
    mockResponse(response, 200);
    const { data } = await http.put('/url');
    assert.equal(data, response);
  });

  it('should send DELETE', async () => {
    const response = '{ "message": "Success DELETE!" }';
    mockResponse(response, 200);
    const { data } = await http.delete('/url');
    assert.equal(data, response);
  });

  it('should redirect after 404 status response', async () => {
    const { window } = new JSDOM('<!DOCTYPE html><html><head></head><body><div class="app"></div></body></html>', {
      url: 'http://localhost/'
    });

    global.document = window.document;
    // @ts-ignore
    global.window = window;

    const router = new Router('.app');

    Router._defaultPath = {
      [Roles.user]: '/user',
      [Roles.guest]: '/guest'
    };

    router._routeHasChanged = () => {};

    router
      .use(pageGuestPathname, GuestPage, { permissions: [Roles.guest] })
      .use(pageUserPathname, UserPage, { permissions: [Roles.user] })
      .use(page404Pathname, Page404, { permissions: [Roles.user, Roles.guest] })
      .use(page500Pathname, Page500, { permissions: [Roles.user, Roles.guest] })
      .start();

    const response = '{ "message": "Bad GET!" }';
    mockResponse(response, 404);

    await http.get('/url');

    assert.equal(router._currentRoute?._pathname, page404Pathname);

    router.destroy();
    window.close();
  });

  it('should redirect after 500 status response', async () => {
    const { window } = new JSDOM('<!DOCTYPE html><html><head></head><body><div class="app"></div></body></html>', {
      url: 'http://localhost/'
    });

    global.document = window.document;
    // @ts-ignore
    global.window = window;

    const router = new Router('.app');

    Router._defaultPath = {
      [Roles.user]: '/user',
      [Roles.guest]: '/guest'
    };

    router._routeHasChanged = () => {};

    router
      .use(pageGuestPathname, GuestPage, { permissions: [Roles.guest] })
      .use(pageUserPathname, UserPage, { permissions: [Roles.user] })
      .use(page404Pathname, Page404, { permissions: [Roles.user, Roles.guest] })
      .use(page500Pathname, Page500, { permissions: [Roles.user, Roles.guest] })
      .start();

    const response = '{ "message": "Bad GET!" }';
    mockResponse(response, 500);

    await http.get('/url');

    assert.equal(router._currentRoute?._pathname, page500Pathname);

    router.destroy();
    window.close();
  });

  it('should redirect after 401 status response', async () => {
    bus.emit('user:logged', true);

    const { window } = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
      url: 'http://localhost/'
    });

    global.document = window.document;
    // @ts-ignore
    global.window = window;

    const router = new Router('body');

    Router._defaultPath = {
      [Roles.user]: '/user',
      [Roles.guest]: '/guest'
    };

    router._routeHasChanged = () => {};

    router
      .use(pageGuestPathname, GuestPage, { permissions: [Roles.guest] })
      .use(pageUserPathname, UserPage, { permissions: [Roles.user] })
      .use(page404Pathname, Page404, { permissions: [Roles.user, Roles.guest] })
      .use(page500Pathname, Page500, { permissions: [Roles.user, Roles.guest] })
      .start();

    const response = '{ "message": "Not authorized!" }';
    mockResponse(response, 401);

    await http.get('/url');

    assert.equal(router._currentRoute?._pathname, pageGuestPathname);

    router.destroy();
    window.close();
  });

  afterEach(() => {
    global.XMLHttpRequest = XMLHttpRequestOriginal;
  });
});
