import { LitElement, property, css, html, customElement } from "lit-element";
import logoWebp from './icon-small.webp'
import logoPng from './icon-small.png'

@customElement("ords-logo")
export class OrdsLogo extends LitElement {
  @property({ type: String })
  public src: string = "";
  @property({ type: String })
  public alt: string = "";
  @property({ type: Boolean })
  public hasLoaded: boolean = false;
  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
        }

        .root {
          opacity: 0;
          will-change: opacity;
          display: flex;
        }

        img {
          width: 100%;
          width: 5em;
          height: 5em;
          margin-right: var(--primary-spacing-standard);
        }

        .imgLoaded {
          animation: 0.3s fade-in;
          opacity: 1;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }
      `
    ];
  }
  private onLoad = () => {
    this.hasLoaded = true;
  };
  protected render() {
    return html`
      <div class="root ${this.hasLoaded ? `imgLoaded` : ""}">
        <picture>
          <source @load=${this.onLoad} srcset=${logoWebp} type="image/webp" />
          <source @load=${this.onLoad} srcset=${logoPng} type="image/png" />
          <img @load=${this.onLoad}  src=${logoPng} alt="logo" />
        </picture>
        <h1>Ords PWA</h1>
      </div>
    `;
  }
}
