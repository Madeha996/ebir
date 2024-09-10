import { UserModel } from "@app/domain/UserModel";

// Persist access token
export const persistToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

// Read access token from local storage
export const readToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

// Persist user object into local storage
export const persistUser = (user: UserModel): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Read user from local storage
export const readUser = (): UserModel | null => {
  const userStr = localStorage.getItem("user");

  if (userStr) {
    try {
      const parsedUser: UserModel = JSON.parse(userStr);
      return parsedUser;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem("user"); // Clear corrupted data
      return null;
    }
  }

  return null; // Return null if no user is stored
};

// Delete access token from local storage
export const deleteToken = (): void => localStorage.removeItem("accessToken");

// Delete user data from local storage
export const deleteUser = (): void => localStorage.removeItem("user");
