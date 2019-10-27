import {
  LitElement,
  html,
  property,
  css,
  unsafeCSS,
  customElement
} from "lit-element";

import { isMobile } from "../../utils/is-mobile";

@customElement("ords-fullscreen")
export class OrdsFullscreen extends LitElement {
  @property({ type: Number })
  public viewportSize: number = window.innerHeight;
  static get styles() {
    return [
      css`
        div {
          display: flex;
          flex-direction: column;
          height: ${unsafeCSS(window.innerHeight.toString())}px;
          width: 100%;
          overflow: hidden;
          overscroll-behavior: contain;
        }
      `
    ];
  }

  public connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this.resizeViewport);
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.resizeViewport);
  }

  private resizeViewport() {
    // adjust for android keyboard
    if (!isMobile()) {
      this.viewportSize = window.innerHeight;
    }
  }

  constructor() {
    super();
    this.resizeViewport = this.resizeViewport.bind(this);
  }

  protected render() {
    return html`
      <div style="height:${this.viewportSize}px">
        <slot></slot>
      </div>
    `;
  }
}
