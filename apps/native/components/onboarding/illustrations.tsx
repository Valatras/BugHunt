import { StyleSheet, Text, View } from "react-native";
import { ResponsiveIllustration } from "./responsiveUtils";

export function WalkIllustration() {
  return (
    <View style={styles.container}>
      <View style={[styles.glow, { backgroundColor: "#a3e635" }]} />
      <View style={styles.stepRow}>
        <View style={styles.stepDot} />
        <View style={styles.stepDot} />
        <View style={styles.stepDot} />
      </View>
      <View style={styles.foot}>
        <View style={styles.toe} />
        <View style={styles.toe} />
        <View style={styles.toe} />
      </View>
    </View>
  );
}

export function SummonIllustration() {
  return (
    <View style={styles.container}>
      <View style={[styles.glow, { backgroundColor: "#10b981" }]} />
      <View style={styles.orb}>
        <View style={styles.orbCore} />
        <Text style={styles.orbText}>✨</Text>
      </View>
      <View style={styles.effectRing} />
    </View>
  );
}

export function CollectionIllustration() {
  return (
    <View style={styles.container}>
      <View style={[styles.glow, { backgroundColor: "#f59e0b" }]} />
      <View style={styles.cardStack}>
        <View style={[styles.card, styles.cardBack]} />
        <View style={[styles.card, styles.cardMiddle]} />
        <View style={[styles.card, styles.cardFront]}>
          <Text style={styles.cardLabel}>BUG</Text>
        </View>
      </View>
    </View>
  );
}

export function ProgressIllustration() {
  return (
    <View style={styles.container}>
      <View style={[styles.glow, { backgroundColor: "#a3e635" }]} />
      <View style={styles.trophy}>
        <View style={styles.trophyBase} />
        <View style={styles.trophyCup} />
        <View style={styles.trophyBadge}>
          <Text style={styles.trophyText}>1</Text>
        </View>
      </View>
    </View>
  );
}

const getScaledSize = (baseSize: number): number => {
  return Math.round(baseSize * ResponsiveIllustration.scale);
};

const styles = StyleSheet.create({
  container: {
    width: ResponsiveIllustration.containerSize,
    height: ResponsiveIllustration.containerSize,
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    width: ResponsiveIllustration.glowSize,
    height: ResponsiveIllustration.glowSize,
    borderRadius: ResponsiveIllustration.glowRadius,
    opacity: 0.15,
  },
  stepRow: {
    flexDirection: "row",
    gap: getScaledSize(12),
    marginBottom: getScaledSize(24),
  },
  stepDot: {
    width: getScaledSize(22),
    height: getScaledSize(22),
    borderRadius: getScaledSize(12),
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  foot: {
    width: getScaledSize(90),
    height: getScaledSize(70),
    borderRadius: getScaledSize(40),
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
  },
  toe: {
    width: getScaledSize(16),
    height: getScaledSize(16),
    borderRadius: getScaledSize(9),
    backgroundColor: "#10b981",
    marginHorizontal: getScaledSize(4),
  },
  orb: {
    width: getScaledSize(132),
    height: getScaledSize(132),
    borderRadius: getScaledSize(66),
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.24)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  orbCore: {
    position: "absolute",
    width: getScaledSize(72),
    height: getScaledSize(72),
    borderRadius: getScaledSize(36),
    backgroundColor: "rgba(16,185,129,0.35)",
  },
  orbText: {
    color: "#ffffff",
    fontSize: getScaledSize(32),
    fontWeight: "800",
  },
  effectRing: {
    position: "absolute",
    width: getScaledSize(170),
    height: getScaledSize(170),
    borderRadius: getScaledSize(85),
    borderWidth: 2,
    borderColor: "rgba(163,230,53,0.35)",
  },
  cardStack: {
    width: getScaledSize(170),
    height: getScaledSize(152),
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    width: getScaledSize(148),
    height: getScaledSize(104),
    borderRadius: getScaledSize(24),
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  cardBack: {
    transform: [
      { translateX: getScaledSize(12) },
      { translateY: getScaledSize(-8) },
    ],
  },
  cardMiddle: {
    transform: [
      { translateX: getScaledSize(-8) },
      { translateY: getScaledSize(10) },
    ],
  },
  cardFront: {
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: {
    color: "#ffffff",
    fontSize: getScaledSize(18),
    fontWeight: "800",
  },
  trophy: {
    width: getScaledSize(150),
    height: getScaledSize(168),
    alignItems: "center",
    justifyContent: "flex-end",
  },
  trophyCup: {
    width: getScaledSize(120),
    height: getScaledSize(90),
    borderTopLeftRadius: getScaledSize(40),
    borderTopRightRadius: getScaledSize(40),
    backgroundColor: "#fde68a",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.12)",
  },
  trophyBase: {
    width: getScaledSize(90),
    height: getScaledSize(26),
    borderRadius: getScaledSize(18),
    backgroundColor: "#a3e635",
    marginTop: -6,
  },
  trophyBadge: {
    position: "absolute",
    top: getScaledSize(46),
    width: getScaledSize(42),
    height: getScaledSize(42),
    borderRadius: getScaledSize(21),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.08)",
  },
  trophyText: {
    fontSize: getScaledSize(16),
    fontWeight: "800",
    color: "#365314",
  },
});
