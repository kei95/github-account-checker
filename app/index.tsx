import { useState } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { Link } from "expo-router";

import { Response, User } from "@/constants/type";

async function getUser(userName: string): Promise<Response<User>> {
  const response = await fetch(`/api/user?name=${userName}`);
  const data = await response.json();

  return data;
}

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUser, setSearchedUser] = useState<User | null>(null);

  const onPressSearch = async () => {
    if (!searchTerm) return;

    const userResponse = await getUser(searchTerm.toLocaleLowerCase());

    if (userResponse.status === "failure") {
      Alert.alert("User not found!");
      setSearchedUser(null);
      return;
    }

    setSearchedUser(userResponse.res);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.nativeEvent.text);
        }}
        style={styles.searchInput}
      />

      <Text style={styles.buttonText} onPress={onPressSearch}>
        Search
      </Text>

      {searchedUser?.avatar_url ? (
        <Link
          href={{
            // ✨ Auto completion!
            pathname: "/[username]/(tabs)/followers",
            params: { username: searchedUser.login },
          }}
          asChild
        >
          <Pressable>
            <Image
              source={{
                uri: searchedUser.avatar_url,
              }}
              style={styles.avatar}
            />
          </Pressable>
        </Link>
      ) : (
        <View style={styles.avatarFrame} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  searchInput: {
    width: 150,
    fontSize: 24,
    fontWeight: "500",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 24,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 40,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 60,
  },
  avatarFrame: {
    width: 200,
    height: 200,
    borderRadius: 60,
    borderWidth: 1,
  },
});
