export interface SearchableSelectProps {
  placeholder: string;
  selectedLabel?: string;
  dataSource: Array<{ id: number; text: string }>;
  disablePicker?: boolean;
  changeAnimation?: 'none' | 'slide' | 'fade';
  close?: boolean;
  small?: boolean;
  short?: boolean;
  disableSearch?: boolean;
  selectedValue: { id: number; text: string } | null;
  onSelectValue: (item: any, isNew?: boolean) => void;
  hideDetail?: boolean;
  selectedColorLabel?: string;
  checkInput?: () => void;
  searchBarPlaceHolder?: string;
  fontSize?: number;
  alreadySelectedElements?: Array<{ _id: string }>;
  onCloseModal?: () => void;
  pickerTitle?: string;
  modalVisible?: boolean;
  name?: string;
  error?: boolean;
  addNewBrand?: boolean;
}
