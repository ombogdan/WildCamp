import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ scale, theme, secondary, }: any) =>
  StyleSheet.create({
    button: {
      borderRadius: scale(8),
      justifyContent: "center",
      alignItems: "center",
      height: scale(48),
      width: "100%",
      zIndex: 1,
      bottom: scale(4),
      left: scale(2),
      borderWidth: secondary ? scale(2) : scale(0),
    },
    loader: {
      height: scale(65),
      width: scale(65),
      top: scale(3)
    },
    btnText: {
      fontSize: scale(16),
      fontWeight: "500",
      textAlign: "center",
    },
    overloadContainer: {
      borderRadius: scale(16),
      justifyContent: "center",
      alignItems: "center",
      height: scale(44),
      backgroundColor: theme.palette.dark
    },
    textContainer: {
      flexDirection: "row",
      alignItems: "center"
    },
  })
);
