import {StyleSheet} from "react-native";
import {createStyles} from "shared/theme/createStyles";

export const useStyles = createStyles(({theme, scale}: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.white,
    },
    logoBlue: {
      height: scale(95),
      width: scale(233)
    },
    buttonsContainer: {
      paddingTop: scale(32),
      paddingLeft: scale(16),
      paddingRight: scale(16),
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    autotestInput: {
      position: 'absolute',
      top: scale(200),
      width: '100%',
      paddingHorizontal: scale(16)
    }
  })
);
