import { ExpoRequest, ExpoResponse } from "expo-router/server";

import { User } from "@/constants/type";

function isResponseUsers(response: User[] | object[]): response is User[] {
  if (response.length === 0) return true;

  return Boolean((response as User[])[0].id && (response as User[])[0].login);
}

export async function GET(request: ExpoRequest) {
  const queryParam = request.expoUrl.searchParams.get("name");
  const response = await fetch(
    `https://api.github.com/users/${queryParam}/followers`,
  );

  if (!response.ok) {
    return ExpoResponse.json({ status: "failure", message: "NOT FOUND" });
  }

  const responseBody = (await response.json()) as User[];

  if (!isResponseUsers(responseBody)) {
    return ExpoResponse.json({ status: "failure", message: "Internal error" });
  }

  return ExpoResponse.json({ status: "success", res: responseBody });
}
