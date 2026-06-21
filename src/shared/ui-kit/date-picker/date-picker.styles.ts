import {StyleSheet} from "react-native";
import {createStyles} from "shared/theme/createStyles";
import {hexToRGBA} from "utils/hexToRgba";

export const useStyles = createStyles(({scale, theme}: any) =>
  StyleSheet.create({
    dateValue: {
      fontWeight: '500',
      fontSize: scale(14),
      fontFamily: "Onest",
      color: theme.palette.textDefault
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    modalMainContainer: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 16,
    },
    dateValuePlaceholder: {
      fontSize: scale(14),
      fontFamily: "Onest",
      color: hexToRGBA(theme.palette.textDefault, 0.2),
    }
  })
);
