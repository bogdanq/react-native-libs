import React from "react";

export type Params = {
  id: number;
};

export type RenderNodeModal = (props: { id: number }) => React.ReactNode;
export type ShowModal = <T extends RenderNodeModal | Array<RenderNodeModal>>(
  renderNodeModal: T
) => void;

export type ContextModalType = {
  showModal: ShowModal;
  hideModal: ({ id }: { id?: number }) => void;
  nodeList: Array<CurrentModal>;
};

export type CurrentModal = {
  id: number;
  node: (props: { id: number; key: number }) => React.ReactNode;
};
