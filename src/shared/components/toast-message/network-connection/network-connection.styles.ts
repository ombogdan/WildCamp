import {Dimensions, StyleSheet} from "react-native";
import {createStyles} from "shared/theme/createStyles";
import {hexToRGBA} from "utils/hexToRgba";

export const useStyles = createStyles(({theme, scale}: any) =>
  StyleSheet.create({
    toastContainer: {
      backgroundColor: '#fff',
      shadowColor: '#000',
      borderWidth: scale(2),
      borderBottomWidth: 0,
      borderColor: theme.palette.blue,
      borderRadius: scale(10),
      shadowOpacity: 0.06,
      elevation: 2,
      shadowRadius: 8,
      marginTop: 5,
      shadowOffset: {
        height: 3,
        width: 3,
      },
      width: Dimensions.get("window").width * 0.94,
      height: scale(60),
    },
    blueBackground: {
      backgroundColor: hexToRGBA(theme.palette.blue, 0.8),
      flex: 1,
      paddingHorizontal: scale(8),
      paddingVertical: scale(9),
      borderRadius: scale(8),
      flexDirection: 'row',
    },
    connectionProblems: {
      color: theme.palette.white,
      fontFamily: 'Onest',
      fontSize: scale(14),
      fontWeight: '700',
      lineHeight: scale(16),
      marginBottom: scale(4)
    },
    checkConnectionToContinue: {
      color: theme.palette.white,
      fontFamily: 'Onest',
      fontSize: scale(10),
      fontWeight: '500',
      lineHeight: scale(16),
    },
    cross:{
      position: 'absolute',
      right: scale(10),
      top: scale(5)
    }
  })
)
