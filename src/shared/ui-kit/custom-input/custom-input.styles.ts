import {StyleSheet} from "react-native";
import {createStyles} from "shared/theme/createStyles";

export const useStyles = createStyles(({
                                         error,
                                         scale,
                                         theme,
                                         leftIcon,
                                         leftIconSize,
                                         blueFocus,
                                         addProduct,
                                         multiline,
                                       }: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      borderRadius: scale(5),
      width: "100%",
      paddingBottom: scale(12),
      height: multiline ? scale(60) : blueFocus ? scale(45) : scale(70),
    },
    input: {
      width: "90%",
      borderRadius: scale(8),
      height: multiline ? scale(60) : blueFocus ? scale(45) : scale(50),
      paddingLeft: leftIcon ? scale(55) : scale(12),
      backgroundColor: theme.palette.white,
      fontSize: addProduct ? scale(14) : scale(16),
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      borderRadius: scale(8),
      borderWidth: scale(1),
      borderColor: error ? theme.palette.danger : theme.palette.blueDark,
      position: "relative",
      height: multiline ? scale(64) : blueFocus ? scale(49) : scale(54),
    },
    label: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: scale(5),
      width: '100%',
      alignSelf: 'flex-start',
    },
    labelText: {
      color: theme.palette.textDefault,
      fontSize: addProduct ? scale(10) : scale(12),
      fontWeight: '400',
      textTransform: addProduct ? 'none' : 'uppercase',
    },
    errorMessage: {
      color: theme.palette.danger,
      marginTop: scale(0)
    },
    leftIcon: {
      width: leftIconSize ? scale(leftIconSize) : scale(24),
      height: leftIconSize ? scale(leftIconSize) : scale(24),
      position: "absolute",
      top: blueFocus ? scale(11) : leftIconSize && leftIconSize === 24 ? scale(13) : scale(14),
      left: scale(16),
      zIndex: 100
    },
    rightIcon: {
      width: scale(24),
      height: scale(24),
      position: "absolute",
      top: -scale(36.5),
      right: scale(7),
    }
  })
);
