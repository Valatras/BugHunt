import { Dimensions, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Aspect ratio pour détecter si on est en mode portrait ou landscape
export const ASPECT_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;
export const IS_LANDSCAPE = SCREEN_WIDTH > SCREEN_HEIGHT;
export const IS_SMALL_DEVICE = SCREEN_WIDTH < 380;
export const IS_LARGE_DEVICE = SCREEN_WIDTH > 450;

// Breakpoints
export const BREAKPOINTS = {
  small: SCREEN_WIDTH < 380,      // iPhone 5/SE
  medium: SCREEN_WIDTH >= 380 && SCREEN_WIDTH < 430,  // iPhone X, 12, 13, 14
  large: SCREEN_WIDTH >= 430,     // iPhone 15 Plus, Max, Android XL
};

/**
 * Calcule des font sizes responsives basées sur la largeur d'écran
 */
export const ResponsiveFontSize = {
  // Titres principaux
  title: (() => {
    if (BREAKPOINTS.small) return 28;
    if (BREAKPOINTS.medium) return 32;
    return 36;
  })(),

  // Sous-titres
  subtitle: (() => {
    if (BREAKPOINTS.small) return 14;
    if (BREAKPOINTS.medium) return 15;
    return 16;
  })(),

  // Labels et textes secondaires
  label: (() => {
    if (BREAKPOINTS.small) return 13;
    if (BREAKPOINTS.medium) return 14;
    return 15;
  })(),

  // Petits textes (skip, tag)
  small: 11,

  // Texte bouton
  button: (() => {
    if (BREAKPOINTS.small) return 13;
    if (BREAKPOINTS.medium) return 14;
    return 15;
  })(),
};

/**
 * Dimensions responsives pour les illustrations
 */
export const ResponsiveIllustration = (() => {
  let containerSize: number;
  let glowSize: number;
  let scale: number;

  if (BREAKPOINTS.small) {
    containerSize = 160;
    glowSize = 130;
    scale = 0.73;
  } else if (BREAKPOINTS.medium) {
    containerSize = 190;
    glowSize = 160;
    scale = 0.86;
  } else {
    containerSize = 220;
    glowSize = 180;
    scale = 1;
  }

  return {
    containerSize,
    glowSize,
    glowRadius: glowSize / 2,
    scale,
  };
})();

/**
 * Paddings et marges responsives
 */
export const ResponsiveSpacing = {
  // Paddings horizontaux
  paddingHorizontal: (() => {
    if (BREAKPOINTS.small) return 18;
    if (BREAKPOINTS.medium) return 24;
    return 28;
  })(),

  // Paddings verticaux
  paddingTop: (() => {
    if (IS_LANDSCAPE) return 16;
    if (BREAKPOINTS.small) return 24;
    return 40;
  })(),

  paddingBottom: (() => {
    if (IS_LANDSCAPE) return 12;
    if (BREAKPOINTS.small) return 16;
    return 32;
  })(),

  // Marges entre sections
  sectionMargin: (() => {
    if (BREAKPOINTS.small) return 12;
    if (BREAKPOINTS.medium) return 16;
    return 22;
  })(),

  // Margin du contenu de texte
  contentMargin: (() => {
    if (BREAKPOINTS.small) return 14;
    if (BREAKPOINTS.medium) return 18;
    return 22;
  })(),

  // Espacement entre titre et sous-titre
  titleSpacing: (() => {
    if (BREAKPOINTS.small) return 8;
    if (BREAKPOINTS.medium) return 10;
    return 14;
  })(),
};

/**
 * Hauteur minimum pour l'illustration (flex: 1 peut être trop élevé)
 */
export const getIllustrationAreaMinHeight = () => {
  const usableHeight = SCREEN_HEIGHT - 80 - ResponsiveSpacing.paddingTop - ResponsiveSpacing.paddingBottom;
  const minHeight = usableHeight * 0.35;
  return Math.max(minHeight, 120);
};

/**
 * Bouton dimensions responsive
 */
export const ResponsiveButton = {
  paddingHorizontal: (() => {
    if (BREAKPOINTS.small) return 18;
    if (BREAKPOINTS.medium) return 22;
    return 26;
  })(),

  paddingVertical: (() => {
    if (BREAKPOINTS.small) return 11;
    if (BREAKPOINTS.medium) return 12;
    return 14;
  })(),
};

/**
 * Badge/Tag dimensions responsive
 */
export const ResponsiveTag = {
  paddingHorizontal: 14,
  paddingVertical: (() => {
    if (BREAKPOINTS.small) return 4;
    return 6;
  })(),
  fontSize: 10,
};
