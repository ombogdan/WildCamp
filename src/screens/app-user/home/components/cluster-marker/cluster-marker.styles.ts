import { StyleSheet } from 'react-native';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
      ring: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(46, 93, 58, 0.20)', // напівпрозоре кільце навколо
      },
      bubble: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.forest,
        borderWidth: scale(2),
        borderColor: theme.palette.cream,
        shadowColor: theme.palette.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
      },
      text: {
        color: theme.palette.white,
        fontWeight: '700',
        fontSize: scale(15)
      },
  }),
);
