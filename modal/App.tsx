import * as React from "react";
import "./styles.css";
import { useModal, Params } from "./modal";

export default function App() {
  const { showModal } = useModal();
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <button onClick={() => showModal(props => <DefaultModal2 {...props} />)}>
        Try me!2
      </button>
    </div>
  );
}

export const DefaultModal = (props: Params) => {
  const { open, closeModal } = useModal();

  return (
    <div>
      <h1>Модальное окно без еффектов 11{JSON.stringify(open)}</h1>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur
      euismod erat. Sed imperdiet sollicitudin urna non sollicitudin. Interdum
      et malesuada fames ac ante ipsum primis in faucibus. Nullam id tristique
      tortor. In sodales augue sed lectus congue ullamcorper. Integer sit amet
      nisl tellus. Nam in condimentum nibh.
      <button onClick={() => closeModal({ id: props.id })}>closeModal</button>
    </div>
  );
};

export const DefaultModal2 = (props: Params) => {
  const { open, closeModal } = useModal();

  return (
    <div>
      <h1>Модальное окно без еффектов 222{JSON.stringify(open)}</h1>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur
      euismod erat. Sed imperdiet sollicitudin urna non sollicitudin. Interdum
      et malesuada fames ac ante ipsum primis in faucibus. Nullam id tristique
      tortor. In sodales augue sed lectus congue ullamcorper. Integer sit amet
      nisl tellus. Nam in condimentum nibh.
      <button onClick={() => closeModal({ id: props.id })}>closeModal</button>
    </div>
  );
};
