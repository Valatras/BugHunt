import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View, StyleSheet, useWindowDimensions } from "react-native";
import { Dots } from "./Dots";
import type { Slide } from "./slides";
import {
  ResponsiveFontSize,
  ResponsiveSpacing,
  ResponsiveButton,
  ResponsiveTag,
  getIllustrationAreaMinHeight,
  BREAKPOINTS,
} from "./responsiveUtils";

export function OnboardingSlide({
  slide,
  onNext,
  onSkip,
  isLast,
}: {
  slide: Slide;
  onNext: () => void;
  onSkip: () => void;
  isLast: boolean;
}) {
  const { accentColor, gradientColors, tag, title, subtitle, Illustration } = slide;
  const { height: screenHeight } = useWindowDimensions();
  const illustrationMinHeight = getIllustrationAreaMinHeight();

  return (
    <LinearGradient colors={gradientColors} style={styles.screen}>
      <View style={styles.header}>
        <View style={[styles.tagBadge, { borderColor: accentColor }]}> 
          <Text style={[styles.tagText, { color: accentColor }]}>{tag}</Text>
        </View>
        <TouchableOpacity onPress={onSkip} activeOpacity={0.75}>
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.illustrationArea, { minHeight: illustrationMinHeight }]}>
        <Illustration />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { fontSize: ResponsiveFontSize.title }]}>
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              fontSize: ResponsiveFontSize.subtitle,
              marginTop: ResponsiveSpacing.titleSpacing,
            },
          ]}
        >
          {subtitle}
        </Text>
      </View>

      <View style={styles.footer}>
        <Dots
          count={4}
          active={
            slide.key === "walk"
              ? 0
              : slide.key === "summon"
                ? 1
                : slide.key === "collection"
                  ? 2
                  : 3
          }
          color={accentColor}
        />
        <TouchableOpacity
          onPress={onNext}
          style={[
            styles.nextButton,
            {
              backgroundColor: accentColor,
              paddingHorizontal: ResponsiveButton.paddingHorizontal,
              paddingVertical: ResponsiveButton.paddingVertical,
            },
          ]}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.nextText,
              { fontSize: ResponsiveFontSize.button },
            ]}
          >
            {isLast ? "Commencer" : "Suivant"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: ResponsiveSpacing.paddingHorizontal,
    paddingTop: ResponsiveSpacing.paddingTop,
    paddingBottom: ResponsiveSpacing.paddingBottom,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: ResponsiveSpacing.sectionMargin,
  },
  tagBadge: {
    paddingHorizontal: ResponsiveTag.paddingHorizontal,
    paddingVertical: ResponsiveTag.paddingVertical,
    borderRadius: 999,
    borderWidth: 1,
  },
  tagText: {
    fontSize: ResponsiveTag.fontSize,
    fontWeight: "700",
    letterSpacing: 1,
  },
  skipText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: ResponsiveFontSize.small,
    fontWeight: "600",
  },
  illustrationArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginBottom: ResponsiveSpacing.contentMargin,
  },
  title: {
    color: "#ffffff",
    fontWeight: "800",
    lineHeight: ResponsiveFontSize.title * 1.25,
  },
  subtitle: {
    color: "rgba(255,255,255,0.75)",
    lineHeight: ResponsiveFontSize.subtitle * 1.5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nextButton: {
    borderRadius: 999,
  },
  nextText: {
    color: "#050505",
    fontWeight: "700",
  },
});
