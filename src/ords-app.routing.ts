import { registerRoute, forceNavigte } from "./routing";
import { html } from "lit-element";

const isAuthenticatedGuard = async () => {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return forceNavigte("/login");
  }

  return true;
};

registerRoute("/login", {
  title: "login",
  fetchTemplate: () =>
    import("./view-components/pages/ords-page-login").then(
      () =>
        html`
          <ords-page-login></ords-page-login>
        `
    )
});

registerRoute("/", {
  title: "loading",
  guard: isAuthenticatedGuard
});
