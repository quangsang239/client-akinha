import { LoginPayload } from "../models";
import axiosClient from "./axios-client";
export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post("/login", payload);
  },
  logout() {
    return axiosClient.post("/logout");
  },
  getLocation(location: string) {
    return axiosClient.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.TOKEN_MAP}`
    );
  },
};
