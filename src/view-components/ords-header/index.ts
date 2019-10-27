import { LitElement, property, html, css, customElement } from "lit-element";

import { MenuIcon } from "../icons";

@customElement("ords-header")
export class OrdsHeader extends LitElement {
  @property({ type: String })
  public title: string = "";
  static get styles() {
    return [
      css`
        :host {
          padding: 12px;
        }
        header {
          display: flex;
          font-size: 1.5em;
        }
        .title {
          margin-left: 6px;
          margin-block-start: 0;
          margin-block-end: 0;
          font-size: 1em;
        }
      `
    ];
  }

  protected render() {
    return html`
      <header>
        ${MenuIcon}
        <h1 class="title">${this.title}</h1>
      </header>
    `;
  }
}
