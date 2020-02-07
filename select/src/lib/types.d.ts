export type Options = Array<{
  label: string;
  value: { id: number; name: string };
}> | null;

export type RenderItems = {
  options?: Options;
  toggle: React.DispatchWithoutAction;
  isOpen: boolean;
  onChangeOption: (props: { id: number; name: string }) => void;
  activeOption?: { id: number; name: string } | null;
};

export type OptionsWrapperProps = {
  state: State;
  isOpen: boolean;
  onChangeOption: (props: { id: number; name: string }) => void;
  isSearchable?: boolean;
};

export type SelectProps = {
  options?: Options;
  value?: { id: number; name: string } | null;
  placeholder?: string;
  disabled?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  handleChange: (value: { id: number; name: string }) => void;
  label: string;
  renderItems?: (props: RenderItems) => JSX.Element | null;
};

export type State = {
  options?: Options;
  activeOption?: { id: number; name: string } | null;
};

export type Payload = {
  type: string;
  options?: Options;
  value?: { id: number; name: string } | null;
  text?: string;
};
