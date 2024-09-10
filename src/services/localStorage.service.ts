import { UserModel } from "@app/domain/UserModel";
const avatarImg = process.env.REACT_APP_ASSETS_BUCKET + "/avatars/avatar5.webp";

// Default user for fallback
const testUser: UserModel = {
  id: 1,
  name: "",
  email: {
    name: "",
    verified: false,
  },
};

// Persist access token
export const persistToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

// Read access token from local storage
export const readToken = (): string => {
  return localStorage.getItem("accessToken") || "bearerToken";
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
      const parsedUser = JSON.parse(userStr);

      // Validate and ensure 'sex' is either 'male' or 'female'
      const validSex: "male" | "female" =
        parsedUser.sex === "male" || parsedUser.sex === "female"
          ? parsedUser.sex
          : "male"; // Default to 'male' if invalid

      // Construct the user object conforming to UserModel
      const user: UserModel = {
        ...parsedUser,
        sex: validSex, // Ensure the 'sex' field is valid
      };

      return user;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem("user"); // Clear corrupted data
      return null;
    }
  }

  return testUser; // Fallback to test user if no user data is stored
};

// Delete access token from local storage
export const deleteToken = (): void => localStorage.removeItem("accessToken");

// Delete user data from local storage
export const deleteUser = (): void => localStorage.removeItem("user");
