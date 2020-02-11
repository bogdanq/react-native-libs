import React from "react";
import { ModalContext } from "./modal-context";

export const useModal = () => {
  const { hideModal, showModal } = React.useContext(ModalContext);
  const [open, setOpen] = React.useState(true);

  const closeModal = ({ id }: { id?: number }) => {
    hideModal({ id });
    setOpen(false);
  };

  return { open, closeModal, showModal };
};
