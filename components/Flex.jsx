import { View, StyleSheet } from "react-native";
import React from "react";

export function Container({ style, children }) {
  return <View style={{ ...style.Container, style }}>{children}</View>;
}

export function Row({ alignItem, justifyContent, children, style, gap = 0 }) {
  return (
    <View
      style={{
        ...styles.row,
        alignItem: alignItem ? alignItem : "baseline",
        justifyContent: justifyContent ? justifyContent : "flex-start",
        gap: gap,
        ...style,
      }}
    >
      {children}
    </View>
  );
}
export function Col({ children, style }) {
  return <View style={style}>{children}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  Container: {
    paddingHorizontal: 20,
  },
});
