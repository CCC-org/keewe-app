import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

const { width } = Dimensions.get('window');

interface TabProps {
  tabs: any[];
  selectedTab: number;
  prevTab: number;
  spacing: number;
  setSelectedTab: (v: number) => void;
  setPrevTab: (v: number) => void;
}

const Tab = ({ tabs, prevTab, selectedTab, spacing, setSelectedTab, setPrevTab }: TabProps) => {
  const theme = useTheme();
  const tabWidth = (width - (tabs.length + 1) * spacing) / tabs.length;
  const animatedValue = useRef(
    new Animated.Value(prevTab * (tabWidth + spacing) + spacing),
  ).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: selectedTab * (tabWidth + spacing) + spacing,
      useNativeDriver: true,
    }).start(() => setPrevTab(selectedTab));
  }, [selectedTab]);

  return (
    <>
      <View style={{ ...styles.container, borderColor: `${theme.colors.graphic.black}1a` }}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            disabled={index === selectedTab}
            style={[
              styles.tab,
              {
                width: tabWidth,
                marginRight: index === tabs.length - 1 ? 0 : spacing,
              },
            ]}
            onPress={() => setSelectedTab(index)}
          >
            <Text
              style={{
                ...theme.fonts.text.body2.bold,
                color:
                  index === selectedTab
                    ? theme.colors.graphic.black
                    : `${theme.colors.graphic.black}80`,
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View
        style={[
          styles.highlight,
          {
            backgroundColor: theme.colors.brand.primary.main,
            transform: [{ translateX: animatedValue }],
            width: tabWidth,
          },
        ]}
      />
    </>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  highlight: {
    position: 'absolute',
    bottom: 0,
    height: 2,
  },
});
