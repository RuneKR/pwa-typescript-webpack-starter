import { installRouter } from "pwa-helpers/router.js";

export interface RouteConfig {
  title: string;
  fetchTemplate?: () => Promise<any>;
  guard?: () => Promise<boolean | any>;
}

interface Route {
  config: RouteConfig;
  cachedTemplate: any;
  wasFetched: boolean;
}

const routes: { [path: string]: Route } = {};
let listener: any = () => {};
let currentPath = decodeURIComponent(location.pathname);

export const registerRoute = (path: string, routeConfig: RouteConfig) => {
  routes[path] = {
    config: routeConfig,
    cachedTemplate: null,
    wasFetched: false
  };

  if (currentPath === path) {
    navigateTo(path);
  }
};

export const onRouteChange = (nextListener: (page: any) => void) => {
  listener = nextListener;
};

export const forceNavigte = (path: string) => {
  window.history.pushState({}, routes[path].config.title, path);
  navigateTo(path);
};

const navigateTo = async (path: string) => {
  if (path in routes) {
    const guard = routes[path].config.guard;

    if (guard !== undefined) {
      const isAllowed = await guard();

      if (isAllowed !== true) {
        return;
      }
    }

    if (!routes[path].wasFetched && 'fetchTemplate' in routes[path].config) {
      routes[path].wasFetched = true;
      routes[path].cachedTemplate = await routes[path].config.fetchTemplate!();
    }

    listener(routes[path].cachedTemplate);
  }
};

installRouter(location => navigateTo(decodeURIComponent(location.pathname)));
