import type { User } from "lucia";
import { FetchError } from "ofetch";

export const useUser = () => {
  const user = useState<User | null>("user", () => null);

  async function login(
    username: string,
    password: string
  ): Promise<Result<null, string>> {
    try {
      await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          username,
          password,
        },
      });

      return {
        success: true,
        successData: null,
      };
    } catch (e) {
      if (e instanceof FetchError) {
        return {
          success: false,
          errorData: e.statusMessage!,
        };
      } else {
        return {
          success: false,
          errorData: "An unknown error occurred.",
        };
      }
    }
  }

  async function logout() {}

  async function getUser() {
    try {
      if (user.value) return;
      user.value = await $fetch<User>("/api/auth/user");
    } catch (e) {}
  }

  return { user, login, logout, getUser };
};
