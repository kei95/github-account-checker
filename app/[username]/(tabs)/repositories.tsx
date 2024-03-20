import { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from "react-native";

import { Repository, Response } from "@/constants/type";

async function getRepositories(
  userName: string,
): Promise<Response<Repository[]>> {
  const response = await fetch(`/api/repository?name=${userName}`);
  const data = await response.json();

  return data;
}

export default function RepositoriesScreen() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const [repositories, setRepositories] = useState<Repository[] | null>(null);

  async function requestRepositories(userName: string) {
    const response = await getRepositories(userName);

    if (response.status === "failure") {
      setRepositories(null);
      return;
    }

    setRepositories(response.res);
  }

  useEffect(() => {
    if (typeof username !== "string") return;

    requestRepositories(username);
  }, [username]);

  if (!repositories)
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
      {repositories?.map((repository, index) => (
        <Link
          key={`${repository.id}_${index}`}
          href={{
            // ✨ Auto completion!
            pathname: "/webViewModal",
            params: { url: repository.html_url },
          }}
          asChild
        >
          <Text style={styles.bulletPoint}>
            &#x2022; <Text style={styles.title}>{repository.name}</Text>
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
