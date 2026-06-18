import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";
import {
  ResponsiveFontSize,
  ResponsiveSpacing,
  ResponsiveTag,
  IS_LANDSCAPE,
} from "./responsiveUtils";

export function AuthSlide({ accentColor }: { accentColor: string }) {
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  return (
    <LinearGradient
      colors={["#050a08", "#08110d", "#050a08"]}
      style={[
        styles.container,
        {
          paddingTop: IS_LANDSCAPE ? 16 : ResponsiveSpacing.paddingTop,
          paddingHorizontal: ResponsiveSpacing.paddingHorizontal,
          paddingBottom: IS_LANDSCAPE ? 12 : ResponsiveSpacing.paddingBottom,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          { marginBottom: ResponsiveSpacing.sectionMargin },
        ]}
      >
        <View style={[styles.badge, { borderColor: accentColor }]}>
          <Text style={[styles.badgeText, { color: accentColor }]}>
            BUGHUNT
          </Text>
        </View>
        <Text style={[styles.title, { fontSize: ResponsiveFontSize.title }]}>
          Bienvenue dans{"\n"}l'aventure.
        </Text>
        <Text
          style={[styles.subtitle, { fontSize: ResponsiveFontSize.subtitle }]}
        >
          Connecte-toi ou crée un compte pour commencer à gagner des points.
        </Text>
      </View>

      <View style={[styles.tabBar, { borderColor: "rgba(255,255,255,0.08)" }]}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            tab === "signin" && {
              borderBottomColor: accentColor,
              borderBottomWidth: 2,
            },
          ]}
          activeOpacity={0.75}
          onPress={() => setTab("signin")}
        >
          <Text
            style={[
              styles.tabLabel,
              { fontSize: ResponsiveFontSize.label },
              tab === "signin"
                ? { color: accentColor }
                : { color: "rgba(255,255,255,0.45)" },
            ]}
          >
            Se connecter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            tab === "signup" && {
              borderBottomColor: accentColor,
              borderBottomWidth: 2,
            },
          ]}
          activeOpacity={0.75}
          onPress={() => setTab("signup")}
        >
          <Text
            style={[
              styles.tabLabel,
              { fontSize: ResponsiveFontSize.label },
              tab === "signup"
                ? { color: accentColor }
                : { color: "rgba(255,255,255,0.45)" },
            ]}
          >
            Créer un compte
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.formWrapper}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {tab === "signin" ? <SignIn /> : <SignUp />}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: ResponsiveSpacing.sectionMargin,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: ResponsiveTag.paddingHorizontal,
    paddingVertical: ResponsiveTag.paddingVertical,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: ResponsiveSpacing.titleSpacing,
  },
  badgeText: {
    fontSize: ResponsiveTag.fontSize,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  title: {
    color: "#ffffff",
    fontWeight: "800",
    lineHeight: ResponsiveFontSize.title * 1.2,
    marginBottom: ResponsiveSpacing.titleSpacing,
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    lineHeight: ResponsiveFontSize.subtitle * 1.45,
  },
  tabBar: {
    flexDirection: "row",
    marginBottom: ResponsiveSpacing.contentMargin,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: ResponsiveSpacing.titleSpacing,
  },
  tabLabel: {
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  formWrapper: {
    paddingBottom: 40,
  },
});
