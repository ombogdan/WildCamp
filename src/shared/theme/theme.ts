export interface IAppTheme {
  palette: {
    none: `none`;
    forest: `#${string}`;
    amber: `#${string}`;
    cream: `#${string}`;
    card: `#${string}`;
    text: `#${string}`;
    muted: `#${string}`;
    border: `#${string}`;
  };
}

export const defaultTheme: IAppTheme = {
  palette: {
    none: 'none',
    forest: '#2E5D3A',
    amber: '#CF8A3F',
    cream: '#F4F1E6',
    card: '#FFFFFF',
    text: '#2A2E29',
    muted: '#8A9387',
    border: '#E3E0D2',
  },
};
