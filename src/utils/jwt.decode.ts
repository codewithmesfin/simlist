import jwt_decode from "jwt-decode";
const jwt = {
  decode(token: string) {
    return jwt_decode(token);
  },
};
export default jwt;
