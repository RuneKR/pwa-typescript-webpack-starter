import { LitElement, html, css, customElement } from "lit-element";
import "../../ords-logo";
import "../../ords-fullscreen";

@customElement("ords-page-login")
export class OrdsPageLogin extends LitElement {
  static get styles() {
    return [
      css`
        header {
          margin-top: 64px;
          margin-left: var(--primary-spacing-standard);
          flex-grow: 1;
        }

        .subheader {
          font-size: 1.5rem;
          margin-block-start: 0.5rem;
          margin-block-end: 0.5rem;
          text-align: center;
        }

        .quick-actions {
          text-align: right;
        }

        main {
          background: white;
          display: block;
          color: black;
          padding: var(--primary-spacing-standard);
          box-sizing: border-box;
          border-top-left-radius: var(--shape-border-radius-md);
          border-top-right-radius: var(--shape-border-radius-md);
          box-shadow: 0px -1px 5px 0px rgba(0, 0, 0, 0.2),
            0px -2px 2px 0px rgba(0, 0, 0, 0.14),
            0px -3px 1px -2px rgba(0, 0, 0, 0.12);
          z-index: 1;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          -moz-transform: translate3d(0, 0, 0);
          -ms-transform: translate3d(0, 0, 0);
          -o-transform: translate3d(0, 0, 0);
          animation: 0.3s slide-up;
          will-change: transform;
        }

        @keyframes slide-up {
          from {
            transform: translate3d(0, 100%, 0);
            -webkit-transform: translate3d(0, 100%, 0);
            -moz-transform: translate3d(0, 100%, 0);
            -ms-transform: translate3d(0, 100%, 0);
            -o-transform: translate3d(0, 100%, 0);
          }

          to {
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            -moz-transform: translate3d(0, 0, 0);
            -ms-transform: translate3d(0, 0, 0);
            -o-transform: translate3d(0, 0, 0);
          }
        }
      `
    ];
  }

  protected render() {
    return html`
      <ords-fullscreen>
        <header>
          <div class="logo-group">
            <ords-logo></ords-logo>
          </div>
        </header>
        <main>
          <div class="quick-actions">
            <button>
              Login
            </button>
          </div>
        </main>
      </ords-fullscreen>
    `;
  }
}
