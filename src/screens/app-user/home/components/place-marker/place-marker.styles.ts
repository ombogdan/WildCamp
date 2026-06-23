import { StyleSheet } from 'react-native';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
      wrap: { alignItems: 'center' },
      bubble: {
        width: scale(44),
        height: scale(44),
        borderRadius: scale(22),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: scale(3),
        borderColor: theme.palette.white,
        shadowColor: theme.palette.black,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
      },
      tail: {
        width: 0,
        height: 0,
        marginTop: -scale(3),
        borderLeftWidth: scale(7),
        borderRightWidth: scale(7),
        borderTopWidth: scale(10),
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
      },
  }),
);
