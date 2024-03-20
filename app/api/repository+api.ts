import { Repository } from "@/constants/type";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

function isResponseRepository(
  response: Repository[] | object[],
): response is Repository[] {
  if (response.length === 0) return true;

  return Boolean(
    (response as Repository[])[0].id && (response as Repository[])[0].html_url,
  );
}

export async function GET(request: ExpoRequest) {
  const queryParam = request.expoUrl.searchParams.get("name");
  const response = await fetch(
    `https://api.github.com/users/${queryParam}/repos`,
  );

  if (!response.ok) {
    return ExpoResponse.json({ status: "failure", message: "NOT FOUND" });
  }

  const responseBody = await response.json();

  if (!isResponseRepository(responseBody)) {
    return ExpoResponse.json({ status: "failure", message: "Internal error" });
  }

  return ExpoResponse.json({ status: "success", res: responseBody });
}
