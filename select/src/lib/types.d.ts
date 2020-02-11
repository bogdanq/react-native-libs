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
  onChangeOption: (props: { id: number; name: string }) => void;
  isSearchable?: boolean;
  id: number;
};

export type NativeSelectProps = {
  options?: Options;
  value?: { id: number; name: string } | null;
  placeholder?: string;
  disabled?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  handleChange: (value: { id: number; name: string } | null) => void;
  label: string;
  renderItems?: (props: RenderItems) => JSX.Element | null;
};

export type SelectProps = {
  state: State;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  selectedFirst?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  clearInput: () => void;
  toggleSelect: ({ isOpen }: { isOpen: boolean }) => void;
  dispatch: React.Dispatch<Payload>;
};

export type State = {
  currentValue: any;
  isOpen: boolean;
  options?: Options;
  filtredOptions?: Options;
  activeOption?: { id: number; name: string } | null;
};

export type Payload = {
  type: string;
  options?: Options;
  value?: { id: number; name: string } | null;
  text?: string;
  isOpen?: boolean;
};
