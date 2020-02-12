type Options = Array<{
  value: { id: number; name: string } | null;
  label: string;
}> | null;

export type Select = {
  options: Options;
  value: { id: number; name: string } | null;
  handleChange: (value: { id: number; name: string } | null) => void;
  placeholder: string;
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  isClearable?: boolean;
};

export type OptionsListProps = {
  options: Options;
  handleChange: (value: { id: number; name: string } | null) => void;
  selectedOption: {
    id: number;
    name: string;
  } | null;
  toggleSelect: any;
};
