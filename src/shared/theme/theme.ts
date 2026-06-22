export interface IAppTheme {
  palette: {
    none: `none`;
    forest: `#${string}`;
    black: `#${string}`;
    amber: `#${string}`;
    cream: `#${string}`;
    white: `#${string}`;
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
    forest: '#2F5D3A',
    amber: '#CF8A3F',
    cream: '#F4F1E6',
    white: '#fbf8f1',
    text: '#3A4133',
    muted: '#8A9387',
    border: '#E3E0D2',
    backgroundGreen: '#eef0e6',
  },
};
