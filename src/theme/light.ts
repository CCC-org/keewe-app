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
          container1: string;
          container2: string;
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
        hotpink: string;
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
          fontFamily: string;
          fontSize: number;
          lineHeight: number;
        };
        headline1: {
          fontFamily: string;
          fontSize: number;
          lineHeight: number;
        };
        headline2: {
          fontFamily: string;
          fontSize: number;
          lineHeight: number;
        };
        footnote: {
          fontFamily: string;
          fontSize: number;
          lineHeight: number;
        };
        caption1: {
          fontFamily: string;
          fontSize: number;
          lineHeight: number;
        };
        body1: {
          regular: {
            fontFamily: string;
            fontSize: number;
            lineHeight: number;
          };
          bold: {
            fontFamily: string;
            fontSize: number;
            lineHeight: number;
          };
        };
        body2: {
          regular: {
            fontFamily: string;
            fontSize: number;
            lineHeight: number;
          };
          bold: {
            fontFamily: string;
            fontSize: number;
            lineHeight: number;
          };
        };
        ridi: {
          fontFamily: string;
          fontSize: number;
          lineHeight: number;
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
    container: '#E0F6A2',
  },
  onprimary: {
    main: '#121314',
    container: '#486006',
  },
  surface: {
    main: '#F8F8F4',
    container: '#E2D9CF',
    container1: '#F1F1E9',
    container2: '#E1E1D0',
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
  hotpink: '#FF42B2',
  red: '#F24822',
  coral: '#FF7163',
  yellow: '#FFD600',
  orange: '#FF9417',
  green: '#09CE84',
  marine: '#0FA7B0',
};
/**
 * 400 : pretendard
 * 500 : pretendardMedium
 * 600 : pretendardSemiBold
 * 700: pretendardBold
 * 800: pretendardExtraBold
 * 900: pretendardBlack
 */
const TEXT = {
  color: GRAPHIC.black,
  display: {
    fontFamily: 'pretendardBold',
    fontSize: 30,
    lineHeight: 36,
  },
  headline1: {
    fontFamily: 'pretendardSemiBold',
    fontSize: 22,
    lineHeight: 28,
  },
  headline2: {
    fontFamily: 'pretendardSemiBold',
    fontSize: 18,
    lineHeight: 20,
  },
  footnote: {
    fontFamily: 'pretendard',
    fontSize: 14,
    lineHeight: 20,
  },
  caption1: {
    fontFamily: 'pretendardMedium',
    fontSize: 13,
    lineHeight: 16,
  },
  body1: {
    regular: {
      fontFamily: 'pretendard',
      fontSize: 17,
      lineHeight: 24,
    },
    bold: {
      fontFamily: 'pretendardSemiBold',
      fontSize: 17,
      lineHeight: 24,
    },
  },
  body2: {
    regular: {
      fontFamily: 'pretendard',
      fontSize: 15,
      lineHeight: 20,
    },
    bold: {
      fontFamily: 'pretendardSemiBold',
      fontSize: 15,
      lineHeight: 20,
    },
  },
  ridi: {
    fontFamily: 'ridiBatang',
    fontSize: 18,
    lineHeight: 32,
  },
  podkova: {
    bold: {
      fontFamily: 'podkovaBold',
      fontSize: 14,
      lineHeight: 16,
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
