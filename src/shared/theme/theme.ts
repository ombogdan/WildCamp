export interface IAppTheme {
  palette: {
    none: `none`;
    forest: `#${string}`;
    black: `#${string}`;
    textDefault: `#${string}`;
    textLight: `#${string}`;
    amber: `#${string}`;
    cream: `#${string}`;
    white: `#${string}`;
    gray: `#${string}`;
    buttonCancel: `#${string}`;
    inputText: `#${string}`;
    inputBorder: `#${string}`;
    text: `#${string}`;
    muted: `#${string}`;
    border: `#${string}`;
    backgroundGreen: `#${string}`;
  };
}

export const defaultTheme: IAppTheme = {
  palette: {
    none: 'none',
    black: '#000000',
    textDefault: '#1F2A1D',
    textLight: '#9AA08E',
    forest: '#2F5D3A',
    amber: '#CF8A3F',
    cream: '#F4F1E6',
    white: '#fbf8f1',
    gray: '#dad5c6',
    buttonCancel: '#eceae0',
    inputText: '#5D6452',
    inputBorder: '#1F2A1D1A',
    text: '#3A4133',
    muted: '#8A9387',
    border: '#E3E0D2',
    backgroundGreen: '#eef0e6',
  },
};
