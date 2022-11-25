export interface LoginPayload {
  userName: string;
  password: string;
}
export interface RegisterPayload {
  userName: string;
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
}
export interface UpdateProfilePayload {
  userName: string;
  email: string;
  name: string;
  phoneNumber: string;
  changeEmail?: boolean;
}
export interface CreateNewRoomPayload {
  _id?: string;
  userName: string;
  stateRoom: boolean;
  imageRoom: string[];
  addressRoom: string;
  latitude: number;
  longitude: number;
  price: number;
  nameRoom: string;
  area: number;
  deposit: number;
  aop: number;
  utilities: string[];
  electricity: number;
  name: string;
  phoneNumber: string;
  sex: string;
  category: string;
  water: number;
}
export interface GetRoomById {
  userName: string;
  page: number;
}
