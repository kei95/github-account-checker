import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewModal() {
  const { url } = useLocalSearchParams<{ url: string }>();

  return <WebView style={styles.container} source={{ uri: url }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 12,
  },
  followersContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 40,
  },
});
