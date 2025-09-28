// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import {
  PlusJakartaSans_300Light as plusJakartaSansLight,
  PlusJakartaSans_400Regular as plusJakartaSansRegular,
  PlusJakartaSans_500Medium as plusJakartaSansMedium,
  PlusJakartaSans_600SemiBold as plusJakartaSansSemiBold,
  PlusJakartaSans_700Bold as plusJakartaSansBold,
} from "@expo-google-fonts/plus-jakarta-sans"

export const customFontsToLoad = {
  plusJakartaSansLight,
  plusJakartaSansRegular,
  plusJakartaSansMedium,
  plusJakartaSansSemiBold,
  plusJakartaSansBold,
}

const fonts = {
  plusJakartaSans: {
    // Cross-platform Google font.
    light: "plusJakartaSansLight",
    normal: "plusJakartaSansRegular",
    medium: "plusJakartaSansMedium",
    semiBold: "plusJakartaSansSemiBold",
    bold: "plusJakartaSansBold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.plusJakartaSans,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
