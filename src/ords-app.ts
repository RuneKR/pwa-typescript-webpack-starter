import { LitElement, html, css, property, customElement } from "lit-element";
import { TemplateResult } from "lit-element";
import "./view-components/pages/ords-page-loading";
import { onRouteChange } from "./routing";

import "./ords-app.routing";

@customElement("ords-app")
export class OrdsApp extends LitElement {
  @property({ type: String })
  private page?: TemplateResult;
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  protected render() {
    return html`
        ${this.page ||
          html`
            <ords-page-loading></ords-page-loading>
          `}
    `;
  }
  constructor() {
    super();

    onRouteChange(page => {
      this.page = page;
    });
  }
}
