import API from "./TokenRequest";

export function getCSRFToken(): string | null {
    const name = "csrftoken";
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) {
        return value;
      }
    }
    return null;
  }
  

export const initializeCSRF = async () => {
  try {
    await API.get("/profile/set-csrf-cookie/");
    console.log("CSRF cookie initialized");
  } catch (error) {
    console.error("Failed to initialize CSRF cookie", error);
  }
};