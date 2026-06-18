import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AuthSlide } from "@/components/onboarding/AuthSlide";
import { OnboardingSlide } from "@/components/onboarding/OnboardingSlide";
import { SLIDES } from "@/components/onboarding/slides";

const ONBOARDING_KEY = "onboarding_completed";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

type PageItem = { key: "auth" } | (typeof SLIDES)[number];

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList<PageItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStoredCompletion, setHasStoredCompletion] = useState(false);

  const ALL_SLIDES: PageItem[] = [...SLIDES, { key: "auth" }];
  const isAuthSlide = currentIndex === SLIDES.length;
  const currentAccent =
    SLIDES[Math.min(currentIndex, SLIDES.length - 1)].accentColor;

  useEffect(() => {
    if (isAuthSlide && !hasStoredCompletion) {
      AsyncStorage.setItem(ONBOARDING_KEY, "true").finally(() => {
        setHasStoredCompletion(true);
      });
    }
  }, [isAuthSlide, hasStoredCompletion]);

  const goNext = () => {
    const nextIndex = Math.min(currentIndex + 1, ALL_SLIDES.length - 1);
    if (nextIndex === SLIDES.length && !hasStoredCompletion) {
      AsyncStorage.setItem(ONBOARDING_KEY, "true").finally(() => {
        setHasStoredCompletion(true);
      });
    }
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  const skip = () => {
    if (!hasStoredCompletion) {
      AsyncStorage.setItem(ONBOARDING_KEY, "true").finally(() => {
        setHasStoredCompletion(true);
      });
    }
    flatListRef.current?.scrollToIndex({
      index: SLIDES.length,
      animated: true,
    });
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const renderSlide = ({ item, index }: { item: PageItem; index: number }) => {
    if (item.key === "auth") {
      return (
        <View style={[styles.pageWrapper, { paddingTop: insets.top }]}>
          <AuthSlide accentColor={currentAccent} />
        </View>
      );
    }

    const slide = item as (typeof SLIDES)[number];

    return (
      <View style={[styles.pageWrapper, { paddingTop: insets.top }]}>
        <OnboardingSlide
          slide={slide}
          onNext={goNext}
          onSkip={skip}
          isLast={index === SLIDES.length - 1}
        />
      </View>
    );
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <FlatList
        ref={flatListRef}
        data={ALL_SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        bounces={false}
        style={styles.flatList}
      />
    </>
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    backgroundColor: "#050a08",
  },
  pageWrapper: {
    flex: 1,
    width: "100%",
  },
});
