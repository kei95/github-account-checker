import { User } from "@/constants/type";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

function isResponseUser(response: User | object): response is User {
  return Boolean((response as User).id && (response as User).login);
}

export async function GET(request: ExpoRequest) {
  const queryParam = request.expoUrl.searchParams.get("name");
  const response = await fetch(`https://api.github.com/users/${queryParam}`);

  if (!response.ok) {
    return ExpoResponse.json({ status: "failure", message: "NOT FOUND" });
  }

  const responseBody = (await response.json()) as User;

  if (!isResponseUser(responseBody)) {
    return ExpoResponse.json({ status: "failure", message: "Internal error" });
  }

  return ExpoResponse.json({ status: "success", res: responseBody });
}
