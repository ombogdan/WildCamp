import { Dimensions } from 'react-native';
import { APP_ICONS } from 'assets/icon.data';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const BUTTON_VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
};
export const LOTTIE_BLACK_LOADER = require('shared/assets/lottie/loader-black.json');
export const LOTTIE_WHITE_LOADER = require('shared/assets/lottie/loader-white.json');
export const LOTTIE_BLUE_LOADER = require('shared/assets/lottie/loader-blue.json');

export const FONT_SIZE = {
  /** xs = 10 */
  xs: 10,
  /** sm = 12 */
  sm: 12,
  /** md = 14 */
  md: 14,
  /** md = 16 */
  lg: 16,
  /** xl = 20 */
  xl: 20,
  /** xxl = 24 */
  xxl: 24,
};

export const SIZE = {
  /** xs = 2 */
  xs: 2,
  /** xs = 4 */
  x2s: 4,
  /** s = 6 */
  s: 6,
  /** sm = 8 */
  sm: 8,
  /** s2m = 12 */
  s2m: 12,
  /** md = 16 */
  md: 16,
  /** lg = 20 */
  lg: 20,
  /** xl = 24 */
  xl: 24,
  /** xxl = 28 */
  xxl: 28,
  /** x3l = 36 */
  x3l: 36,
};

export enum AppLanguages {
  En = 'en',
  Uk = 'uk',
}

export enum MMKVStorageKeys {
  Language = 'Language',
}

export const CAMPING_TYPES: {
  id: string;
  title: string;
  icon: keyof typeof APP_ICONS;
  description: string;
}[] = [
  {
    id: 'tent',
    title: 'Намети',
    icon: 'tent',
    description: 'Рівні майданчики під намет',
  },
  {
    id: 'tarp',
    title: 'Тент / гамак',
    icon: 'hammock',
    description: 'Дерева для розтяжок',
  },
  {
    id: 'car',
    title: 'Авто-кемпінг',
    icon: 'truck',
    description: 'Можна підʼїхати авто',
  },
];

export const AMENITIES: {
  id: string;
  title: string;
  icon: keyof typeof APP_ICONS;
}[] = [
  {
    id: 'toilet',
    title: 'Туалет',
    icon: 'toilet-paper',
  },
  {
    id: 'water',
    title: 'Питна вода',
    icon: 'water',
  },
  {
    id: 'forest',
    title: 'Ліс поруч',
    icon: 'forest',
  },
  {
    id: 'lake',
    title: 'Водойма поруч',
    icon: 'lake',
  },
  {
    id: 'fireplace',
    title: 'Місце для кострища',
    icon: 'campfire',
  },
  {
    id: 'collect_firewood',
    title: 'Можна назбирати дрова',
    icon: 'firewood',
  },
  {
    id: 'has_tables',
    title: 'Наявність столів, альтанки',
    icon: 'gazebo',
  },
  {
    id: 'shade',
    title: 'Тінь',
    icon: 'shade',
  },
  {
    id: 'parking',
    title: 'Паркування',
    icon: 'parking',
  },
  {
    id: 'mobile',
    title: 'Мобільний звʼязок',
    icon: 'signal',
  },
  {
    id: 'trash',
    title: 'Смітники',
    icon: 'trash',
  },
];
export const KYIV = { latitude: 50.45, longitude: 30.52 };
