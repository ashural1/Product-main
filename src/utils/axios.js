import axios from "axios";

let mainURL = "https://json-api.uz/api/project/products";
export const axiosClient = axios.create({
  baseURL: mainURL,
});

axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    try {
      if (error.response.status == 403 && !originalRequest._retry) {
        originalRequest = true;

        const refresh_token = window.localStorage.getItem("refresh_token");

        const { data } = await axios.post(mainURL + "/auth/refresh-token", {
          refresh_token,
        });

        window.localStorage.setItem("access_token", data.access_token);

        return axiosClient(originalRequest);
      }
    } catch (error) {
      console.log(error.message);
    }

    return new Promise.reject(error);
  }
);

export default axiosClient;
