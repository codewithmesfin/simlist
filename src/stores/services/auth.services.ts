import * as SecureStore from "expo-secure-store";


interface USER {
  id?: string;
  fullName?: string;
  token?: string;
  email?: string;
  phoneNumber?: string;
  profilePicture?: string;
  userRole?: string;
}
const auth = {
  async isAutenticated() {
    const result: any = await SecureStore.getItemAsync("user");
    const user: USER = result && result !== null ? JSON.parse(result) : null;
    return user && user !== null && user.token && user.token !== null
      ? true
      : false;
  },
  async logout() {
    await SecureStore.deleteItemAsync("user");
  },
  async getToken() {
    const result: any = await SecureStore.getItemAsync("user");
    const user: USER = result && result !== null ? JSON.parse(result) : null;
    return user && user.token ? user.token : null;
  },

  async setUser(user: USER) {
    try {
      await SecureStore.setItemAsync("user", JSON.stringify(user));
      return true;
    } catch (error) {
      return false;
    }
  },
  async getUser() {
    const result: any = await SecureStore.getItemAsync("user");
    const user: USER = result && result !== null ? JSON.parse(result) : null;
    return user;
  },

};
export default auth;
