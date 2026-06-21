import { APP_ICONS } from "assets/icon.data";

export interface ButtonProps {
  title: string,
  onPress: ()=> void,
  iconName?: keyof typeof APP_ICONS,
  containerStyle?: object,
  disabled?: boolean,
  isLoading?: boolean,
  variant: string,
  iconSize?: number,
}
