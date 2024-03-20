import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { router, Tabs, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function Layout() {
  const { username } = useLocalSearchParams();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: `${username}`,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Entypo name="chevron-thin-left" size={24} color={"black"} />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="followers"
        initialParams={{ username }}
        options={{
          title: "Followers",
          tabBarIcon: ({ color }) => (
            <AntDesign name="team" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="repositories"
        initialParams={{ username }}
        options={{
          title: "Repositories",
          tabBarIcon: ({ color }) => (
            <AntDesign name="codesquareo" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingLeft: 8,
  },
});
