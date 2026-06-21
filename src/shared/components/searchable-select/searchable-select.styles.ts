import {I18nManager, Platform, StyleSheet} from "react-native";
import {createStyles} from "shared/theme/createStyles";
import {hexToRGBA} from "utils/hexToRgba";

export const useStyles = createStyles(({theme, scale, error}: any) =>
  StyleSheet.create({
    selectView: {
      flexDirection: "row",
      width: '100%',
      height: scale(40),
      borderRadius: scale(5),
      borderWidth: scale(1),
      borderColor: hexToRGBA(error ? theme.palette.danger : theme.palette.blue, 0.8),
      backgroundColor: theme.palette.white,
    },
    selectLabelTouchableOpacity: {
      width: "93%",
      justifyContent: "center",
      flex: 1,
    },
    closeIconTouchableOpacity: {
      right: scale(10),
      width: scale(40),
      height: scale(40),
      top: scale(5)
    },
    touchableItemPickerView: {
      justifyContent: "center",
      flexDirection: "row",
      minHeight: scale(30),
      paddingTop: scale(5),
      paddingBottom: scale(5),
    },
    itemPickerView: {
      width: "100%",
      justifyContent: "center",
      paddingLeft: scale(16),
      paddingRight: scale(16)
    },
    selectedLabelText: {
      marginLeft: scale(16)
    },
    placeholderText: {
      color: hexToRGBA(theme.palette.textDefault, 0.2),
      fontSize: scale(14),
      marginLeft: scale(16),
      fontFamily: 'Onest',
    },
    iconView: {
      justifyContent: "flex-end",
      flexDirection: "row",
      top: scale(5),
      left: -scale(8)
    },
    modalView: {
      alignItems: "center",
      backgroundColor: "rgba(207, 207, 207, 0.40)",
      height: "100%"
    },
    modalView1: {
      marginTop: scale(100),
      width: "90%",
      maxHeight: scale(550),
      opacity: 10,
      borderRadius: scale(20),
      backgroundColor: "white",
      alignSelf: "center",
      flexDirection: "column",
      borderColor: "black"
    },
    pickerTitleContainer: {
      flex: 1,
      top: scale(15),
      height: scale(55),
      alignItems: "center",
      marginHorizontal: scale(20)
    },
    pickerTitleText: {
      fontSize: scale(18),
      flex: 1,
      color: "#000",
      paddingBottom: scale(10),
      bottom: scale(5),
      textAlign: "center",
      width: "86%"
    },
    modalCloseButton: {
      right: scale(10),
      top: scale(10),
      width: scale(30),
      height: scale(30),
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    modalName: {
      color: theme.palette.textDefault,
      fontFamily: 'Onest',
      fontSize: scale(16),
      fontWeight: '400',
    },
    searchView: {
      top: 5,
      flexDirection: "row",
      height: 40,
      shadowOpacity: 1.0,
      shadowRadius: 5,
      shadowOffset: {
        width: 1,
        height: 1
      },
      backgroundColor: "rgba(255,255,255,1)",
      shadowColor: "#d3d3d3",
      borderRadius: 10,
      elevation: 15,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      zIndex: 100,
      borderWidth: Platform.OS === "android" ? 0.5 : 0,
      borderColor: "rgba(70,70,70,0.1)"
    },
    textInput: {
      color: "black",
      paddingLeft: 15,
      marginTop: Platform.OS === "ios" ? 10 : 0,
      marginBottom: Platform.OS === "ios" ? 10 : 0,
      alignSelf: "center",
      flex: 1,
      textAlign: I18nManager.isRTL ? "right" : "left"
    },
    selectName: {
      color: theme.palette.textDefault,
      fontFamily: 'Onest',
      fontSize: scale(10),
      fontWeight: '400',
      marginBottom: scale(4)
    },
    itemPickerContainer: {
      borderTopWidth: scale(1),
      borderColor: hexToRGBA(theme.palette.blueBorder, 0.1),
    },
    pickerItemName: {
      color: theme.palette.textDefault,
      fontFamily: 'Onest',
      fontSize: scale(14),
      fontWeight: '400',
    },
    searchContainer: {
      paddingTop: scale(4),
      borderTopWidth: scale(1),
      borderColor: hexToRGBA(theme.palette.blueBorder, 0.1),
    },
    addNewBrandContainer: {
      backgroundColor: theme.palette.secondary,
      height: scale(40),
    },
    addNewBrandText: {
      color: theme.palette.textDefault,
      fontFamily: 'Onest',
      fontSize: scale(14),
      fontWeight: '600',
    },
    saveBrandContainer:{
      height: scale(30),
      backgroundColor: theme.palette.blue,
      marginHorizontal: scale(16),
      marginBottom: scale(5),
      marginTop: scale(10),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: scale(10)
    },
    saveBrand:{
      color: theme.palette.white,
      fontSize: scale(12),
      fontWeight: '400',
    }
  })
);
