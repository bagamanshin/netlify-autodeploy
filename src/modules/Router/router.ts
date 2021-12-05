import { Roles } from '../../enums';

import { Block, bus } from '..';
import Route from './route';

import authService from '../services/auth';

export default class Router {
  static __instance: Router | null;

  routes: Route[];

  history: History;

  static _defaultPath: Record<Roles, string>

  _currentRoute: null | Route;

  _rootQuery: string;

  destroy: Function;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router._defaultPath = {
      [Roles.user]: '/messenger',
      [Roles.guest]: '/'
    };

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    const authChangedHanlder = () => {
      if (!this._checkPath((this._currentRoute as Route)._pathname)) {
        this._redirectToDefaultPath();
      }
    };
    const navigateTo = (path: string) => {
      this.go(path);
    };
    const navigateBack = () => {
      this.back();
    };

    bus.on('user:logged', authChangedHanlder);
    bus.on('navigateTo', navigateTo);
    bus.on('navigateBack', navigateBack);

    this.destroy = () => {
      bus.off('user:logged', authChangedHanlder);
      bus.off('navigateTo', navigateTo);
      bus.off('navigateBack', navigateBack);
      Router.__instance = null;
    };

    Router.__instance = this;
  }

  use(pathname: string, block: { new(): Block}, props: { permissions: Roles[] }) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery, ...props });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      // @ts-ignore
      this._onRoute(event.currentTarget.location.pathname);
    });
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    if (!this._checkPath(pathname)) {
      this._redirectToDefaultPath();
      return;
    }
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();

    this._routeHasChanged();
  }

  _routeHasChanged() {
    bus.emit('routeHasChanged');
  }

  go(pathname: string) {
    if (this._checkPath(pathname)) {
      this.history.pushState({}, '', pathname);
    }
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname)) || null;
  }

  _redirectToDefaultPath() {
    const path = Router._defaultPath[authService.getCurrentRole()];

    if (!this._currentRoute || this._currentRoute!._pathname !== path) {
      if (!this._currentRoute) {
        const route = this.getRoute(path);
        this._currentRoute = route;
      }
      this.history.replaceState({}, '', path);
      this._onRoute(path);
    }
  }

  _checkPath(pathname: string) {
    const route = this.getRoute(pathname);

    return route && route._props.permissions.includes(authService.getCurrentRole());
  }
}
