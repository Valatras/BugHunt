import { StyleSheet, View } from "react-native";
import { BREAKPOINTS } from "./responsiveUtils";

export function Dots({
  count,
  active,
  color,
}: {
  count: number;
  active: number;
  color: string;
}) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === active
              ? { width: DOT_ACTIVE_WIDTH, backgroundColor: color }
              : { width: DOT_INACTIVE_WIDTH, backgroundColor: "rgba(255,255,255,0.2)" },
            index < count - 1 && styles.dotSpacing,
          ]}
        />
      ))}
    </View>
  );
}

const DOT_HEIGHT = BREAKPOINTS.small ? 6 : 8;
const DOT_ACTIVE_WIDTH = BREAKPOINTS.small ? 20 : 24;
const DOT_INACTIVE_WIDTH = BREAKPOINTS.small ? 6 : 8;
const DOT_SPACING = BREAKPOINTS.small ? 6 : 8;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    height: DOT_HEIGHT,
    borderRadius: DOT_HEIGHT / 2,
  },
  dotSpacing: {
    marginRight: DOT_SPACING,
  },
});
