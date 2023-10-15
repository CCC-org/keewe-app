import { Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme();

function isDarkMode() {
  return colorScheme === 'dark';
}

export default isDarkMode;
