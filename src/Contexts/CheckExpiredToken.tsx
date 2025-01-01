import API from "./TokenRequest";


const renewAccessToken = async () => {
    const refreshToken =
      localStorage.getItem("refresh") || sessionStorage.getItem("refresh");
    if (!refreshToken) return;
  
    try {
      const response = await API.post(
        "/token/refresh/",
      )
  
      if (response.status >= 200 && response.status < 300) {
        const { access } = await response.data;
        if (localStorage.getItem("refresh")) {
          localStorage.setItem("access", access);
        } else {
          sessionStorage.setItem("access", access);
        }
      } else {
        console.error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Error during token renewal:", error);
    }
  };
  

  export default renewAccessToken;