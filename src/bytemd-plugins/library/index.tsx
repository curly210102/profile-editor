import ReactDOM from "react-dom";
import { BytemdPlugin } from "bytemd";
import ComponentLibrary from "../../components/ComponentLibrary";
import Modal from "../../components/Modal";

let container: null | HTMLElement = null;

function renderLibraryComponent(isLibraryOpen: boolean) {
  ReactDOM.render(
    <Modal
      isOpen={isLibraryOpen}
      title="Component Library"
      onClose={() => {
        renderLibraryComponent(false);
      }}
    >
      <ComponentLibrary />
    </Modal>,
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
          click({ wrapText, editor }) {
            if (!container) {
              container = document.createElement("div");
              document.body.appendChild(container);
            }

            renderLibraryComponent(true);
          },
          shortcut: "Ctrl-L",
        },
      },
    ],
  };
}
