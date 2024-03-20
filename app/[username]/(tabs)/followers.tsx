import { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Response, User } from "@/constants/type";

async function getFollowers(userName: string): Promise<Response<User[]>> {
  const response = await fetch(`/api/follower?name=${userName}`);
  const data = await response.json();

  return data;
}

export default function FollowersScreen() {
  const { username } = useLocalSearchParams();
  const [followers, setFollowers] = useState<User[] | null>(null);

  async function requestFollowers(userName: string) {
    const response = await getFollowers(userName);

    if (response.status === "failure") {
      setFollowers(null);
      return;
    }

    setFollowers(response.res);
  }

  useEffect(() => {
    if (typeof username !== "string") return;

    requestFollowers(username);
  }, [username]);

  if (!followers)
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.followersContainer}
    >
      {followers?.map((follower, index) => (
        <Link
          key={`${follower.id}_${index}`}
          href={{
            // ✨ Auto completion!
            pathname: "/webViewModal",
            params: { url: follower.html_url },
          }}
          asChild
        >
          <Text style={styles.bulletPoint}>
            &#x2022; <Text style={styles.title}>{follower.login}</Text>
          </Text>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bulletPoint: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 12,
    textDecorationLine: "underline",
  },
  followersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});
