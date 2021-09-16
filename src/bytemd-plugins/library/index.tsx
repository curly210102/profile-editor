import { BytemdPlugin } from "bytemd";
import ReactDOM from "react-dom";
import Modal from "../../components/Modal";
import ComponentLibrary, { IExportSubmit } from "../../GPRLibrary";

let container: null | HTMLElement = null;

function renderLibraryComponent(
  isLibraryOpen: boolean,
  onSubmit?: IExportSubmit
) {
  ReactDOM.render(
    isLibraryOpen ? (
      <Modal
        isOpen={true}
        title="Component Library"
        onClose={() => {
          renderLibraryComponent(false);
        }}
      >
        <ComponentLibrary onSubmit={onSubmit} />
      </Modal>
    ) : (
      <div></div>
    ),
    container
  );
}
export default function library(): BytemdPlugin {
  return {
    actions: [
      {
        title: "Component library",
        icon: `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M19 4H37L26 18H41L17 44L22 25H8L19 4Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/></svg>`,
        cheatsheet: "Open library",
        handler: {
          type: "action",
          click({ editor, appendBlock }) {
            if (!container) {
              container = document.createElement("div");
              document.body.appendChild(container);
            }

            renderLibraryComponent(true, (payload) => {
              if (payload && payload.url) {
                const pos = appendBlock(`![${payload.title}](${payload.url})`);
                editor.setSelection(pos);
                editor.focus();
              }
              renderLibraryComponent(false);
            });
          },
          shortcut: "Ctrl-L",
        },
      },
    ],
  };
}
