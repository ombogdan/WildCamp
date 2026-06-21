import React from "react";
import {View, Pressable, Text} from "react-native";
import Lottie from "lottie-react-native";
import {ButtonProps} from "shared/ui-kit/custom-button/custom-button.types";
import {useTheme} from "shared/theme/ThemeProvider";
import {
  BUTTON_VARIANTS,
  LOTTIE_BLACK_LOADER,
} from "shared/constants";
import {AppIcon} from "assets/index";
import {useStyles} from "./custom-button.styles";

const CustomButtonComponent = ({
                                 title,
                                 onPress,
                                 containerStyle,
                                 disabled = false,
                                 isLoading = false,
                                 variant = "primary",
                                 iconName,
                                 iconSize,
                               }: ButtonProps) => {
  const styles = useStyles({disabled, title, secondary: variant === BUTTON_VARIANTS.secondary});
  const {theme} = useTheme();
  let color: string = theme.palette.dark;
  let btnBackgroundColor: string = theme.palette.accent;
  let borderColor: string = theme.palette.accent;
  const loader: string = LOTTIE_BLACK_LOADER;

  const defineBtnStyle = (prs: { pressed: boolean }) => {
    const {pressed} = prs;
    // eslint-disable-next-line default-case
    switch (variant) {
      case BUTTON_VARIANTS.primary: {
        if (!disabled) {
          color = theme.palette.white;
          btnBackgroundColor = pressed
            ? theme.palette.blue
            : theme.palette.blueDark;
        } else {
          btnBackgroundColor = theme.palette.secondaryGray;
        }
        break;
      }
      case BUTTON_VARIANTS.secondary: {
        if (!disabled) {
          btnBackgroundColor = pressed
            ? theme.palette.secondaryGray
            : theme.palette.white;
          borderColor = theme.palette.secondaryGray;
        }
        break;
      }
    }
    return [
      styles.button,
      {backgroundColor: btnBackgroundColor, borderColor},
      containerStyle
    ];
  };

  function defineTextStyle(pressed: boolean) {
    // eslint-disable-next-line default-case
    switch (variant) {
      case BUTTON_VARIANTS.primary: {
        if (!disabled) {
          color = theme.palette.white;
        } else {
          color = theme.palette.black50;
        }
        break;
      }
      case BUTTON_VARIANTS.secondary: {
        if (!disabled) {
          color = pressed ? theme.palette.blueDark : theme.palette.blueDark;
        }
        break;
      }
    }
    return [{color}];
  }

  const onButtonPress = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={onButtonPress}
      disabled={disabled || isLoading}
      style={defineBtnStyle}>
      {({pressed}) => (
        <View>
          {!isLoading ? (
            <View style={styles.textContainer}>
              {(iconName && iconSize) &&
                <AppIcon name={iconName} size={iconSize} color="white" style={{marginRight: 8, top: 2}}/>
              }
              <Text style={[defineTextStyle(pressed), styles.btnText]}>
                {title}
              </Text>
            </View>
          ) : (
            <Lottie style={styles.loader} source={loader} autoPlay loop/>
          )}
        </View>
      )}
    </Pressable>
  );
};

const CustomButton = React.memo(CustomButtonComponent);

export default CustomButton;
