/* eslint-disable @typescript-eslint/no-namespace */
import { DefaultTheme } from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      brand: {
        primary: {
          main: string;
          container: string;
        };
        onprimary: {
          main: string;
          container: string;
        };
        surface: {
          main: string;
          container: string;
        };
      };
      graphic: {
        black: string;
        white: string;
        blue: string;
        sky: string;
        purple: string;
        violet: string;
        pink: string;
        red: string;
        coral: string;
        yellow: string;
        orange: string;
        green: string;
        marine: string;
      };
      system: {
        success: string;
        error: string;
      };
    }
    interface ThemeFonts {
      text: {
        color: string;
        display: {
          fontWeight: any;
          fontSize: number;
          lineHeight: number;
        };
        headline1: {
          fontWeight: any;
          fontSize: number;
          lineHeight: number;
        };
        headline2: {
          fontWeight: any;
          fontSize: number;
          lineHeight: number;
        };
        footnote: {
          fontWeight: any;
          fontSize: number;
          lineHeight: number;
        };
        caption1: {
          fontWeight: any;
          fontSize: number;
          lineHeight: number;
        };
        body1: {
          regular: {
            fontWeight: any;
            fontSize: number;
            lineHeight: number;
          };
          bold: {
            fontWeight: any;
            fontSize: number;
            lineHeight: number;
          };
        };
        body2: {
          regular: {
            fontWeight: any;
            fontSize: number;
            lineHeight: number;
          };
          bold: {
            fontWeight: any;
            fontSize: number;
            lineHeight: number;
          };
        };
      };
    }
    interface Theme {
      myOwnProperty: boolean;
    }
  }
}

const BRAND = {
  primary: {
    main: '#B2E817',
    container: '##E0F6A2',
  },
  onprimary: {
    main: '#121314',
    container: '#486006',
  },
  surface: {
    main: '#F8F8F4',
    container: '#E2D9CF',
  },
};

const GRAPHIC = {
  black: '#121314',
  white: '#FFFFFF',
  blue: '#2E6DE8',
  sky: '#19A9FA',
  purple: '#9350E9',
  violet: '#7545FF',
  pink: '#FF55BA',
  red: '#F24822',
  coral: '#FF7163',
  yellow: '#FFD600',
  orange: '#FF9417',
  green: '#09CE84',
  marine: '#0FA7B0',
};

const TEXT = {
  color: GRAPHIC.black,
  display: {
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 36,
  },
  headline1: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 28,
  },
  headline2: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 20,
  },
  footnote: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
  },
  caption1: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
  },
  body1: {
    regular: {
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
    },
    bold: {
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 24,
    },
  },
  body2: {
    regular: {
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
    },
    bold: {
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 20,
    },
  },
};

const SYSTEM = {
  success: '#2E6DE8',
  error: '#F24822',
};

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: { ...DefaultTheme.colors, brand: BRAND, graphic: GRAPHIC, system: SYSTEM },
  fonts: { ...DefaultTheme.fonts, text: TEXT },
};

export default theme;