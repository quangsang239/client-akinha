import {
  GetDirection,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  CreateNewRoomPayload,
  GetRoomById,
} from "../models";
import axiosClient from "./axios-client";
export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post("/login", payload);
  },
  logout() {
    return axiosClient.post("/logout");
  },
  register(payload: RegisterPayload) {
    return axiosClient.post("/user/create-user", payload);
  },
  getLocation(location: string) {
    return axiosClient.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.TOKEN_MAP}`
    );
  },
  getProfile(username: string) {
    return axiosClient.get(`/user/get-profile/${username}`);
  },
  updateProfile(payload: UpdateProfilePayload) {
    return axiosClient.post("/user/update-profile", payload);
  },
  createNewRoom(payload: CreateNewRoomPayload) {
    return axiosClient.post("/room/create-room", payload);
  },
  updateRoom(payload: CreateNewRoomPayload) {
    return axiosClient.post("/room/update-room", payload);
  },
  deleteRoom(id: string) {
    return axiosClient.delete(`/room/delete-room/${id}`);
  },
  getRoomById({ userName, page }: GetRoomById) {
    return axiosClient.get(`/room/get-room/${userName}/page=${page}`);
  },
  getDirection(addressFirst: GetDirection, addressSecond: GetDirection) {
    return axiosClient.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/{coordinates}`
    );
  },
};
