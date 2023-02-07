import { createAsyncThunk } from "@reduxjs/toolkit";


import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
const auth = getAuth();


interface SEND_VERIFICATION {
  phone: string;
  recaptchaVerifier?: any;
}
interface CONFIRM_CODE {
  verificationId: string;
  verificationCode: any;
}

//Signin with Email and Password
const sendVerification: any = createAsyncThunk(
  "sendVerification",
  async (user: SEND_VERIFICATION) => {
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(
      user.phone,
      user.recaptchaVerifier
    );
    return verificationId;
  }
);

const confirmCode: any = createAsyncThunk(
  "confirmCode",
  async (payload: CONFIRM_CODE) => {
    const credential = PhoneAuthProvider.credential(
      payload.verificationId,
      payload.verificationCode
    );
   const user= await signInWithCredential(auth, credential);
    return user
  }
);

const currentUser: any = createAsyncThunk(
  "currentUser",
  async () => {
    return auth.currentUser;
  }
);



export { sendVerification, confirmCode,currentUser};
