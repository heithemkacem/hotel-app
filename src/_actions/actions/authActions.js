import axios from "axios";
import { setRole, setUser } from "../types";
import jwt_decode from "jwt-decode";

import { setAuth } from "../../util/setAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
const localUrl = "http://192.168.1.128:5000";
const devUrl = "https://tame-red-boa-sari.cyclic.app/";
const currentUrl = devUr;
//otp find hotel

export const findHotelOtpAction =
  (otp, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      //Call Backend
      await axios
        .post(`${currentUrl}/hotel/findHotelOtp`, otp)
        .then(async (response) => {
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            setSubmitting(false);

            Toast.show({
              type: "success",
              text1: t("common:Success"),
              text2: t("common:verificationotpsent"),
            });

            moveTo("ClientDashboard", {
              id: response.data.id,
              otp: otp,
              email: response.data.email,
            });
          }
        })
        .catch((error) => {
          setSubmitting(false);
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
    }
  };

//!Login Admin
export const LoginAction =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      await axios
        .post(`${currentUrl}/admin/auth`, credentials)
        .then((response) => {
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            const { token } = response.data;
            setAuth(token);
            const decode = jwt_decode(token);
            //dispatch(setUser(decode));
            //dispatch(setRole(role));
            dispatch({ type: setUser, payload: decode });
            dispatch({ type: setRole, payload: response.data.whoami });
            // dispatch({ type: setRole, payload: role });
            AsyncStorage.setItem("jwt", token);
            setSubmitting(false);
            Toast.show({
              type: "success",
              text1: t("common:Success"),
              text2: t("common:Welcome"),
            });
            console.log("responseeee11111", response.data);
            console.log("responseeee", response.data.whoami);
            const role = response.data.whoami;
            if (response.data.whoami === "Admin") {
              moveTo("Dashboard");
              console.log("hh", response.data.role);
            } else if (response.data.whoami === "Hotel") {
              moveTo("HotelDashboard");
            } else {
              moveTo("Clientotp");
              //moveTo("ClientDashboard");
            }
          } else if (response.data.status === "Verify") {
            setSubmitting(false);
            moveTo("EmailVerification", {
              email: credentials.email,
              id: response.data.id,
            });
          }
        })
        .catch((error) => {
          setSubmitting(false);
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
    }
  };
const showAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    console.log("AsyncStorage Content:", items);
  } catch (error) {
    console.error("Error reading AsyncStorage:", error);
  }
};

// Call the function to log AsyncStorage content
showAsyncStorage();

//!Signup User
export const SignupAction =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      //Call Backend
      await axios
        .post(`${currentUrl}/client/signup`, credentials)
        .then(async (response) => {
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            setSubmitting(false);
            moveTo("EmailVerification", {
              id: response.data.id,
              email: response.data.email,
            });
            //make the error ""
            Toast.show({
              type: "success",
              text1: t("common:Success"),
              text2: t("common:SignupSuccess"),
            });
          }
        })
        .catch((error) => {
          setSubmitting(false);
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
    }
  };

//!User Forgot Password
export const ForgotPasswordAction =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      //Call Backend
      await axios
        .post(`${currentUrl}/client/forget-password`, credentials)
        .then(async (response) => {
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            setSubmitting(false);

            Toast.show({
              type: "success",
              text1: t("common:Success"),
              text2: t("common:verificationemailsent"),
            });

            moveTo("ResetPassword", {
              id: response.data.id,
              email: response.data.email,
            });
          }
        })
        .catch((error) => {
          setSubmitting(false);
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
    }
  };

//! Reset Password Action

export const ResetPasswordAction =
  (values, setSubmitting, moveTo, route, t) => async (dispatch) => {
    try {
      //Call Backend
      const email = route.params.email;
      const { newPassword, confirmNewPassword } = values;
      await axios
        .post(`${currentUrl}/client/reset-password`, {
          newPassword,
          confirmNewPassword,
          email,
        })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            setSubmitting(false);

            Toast.show({
              type: "success",
              text1: t("common:Success"),
              text2: t("common:Password_changed"),
            });

            moveTo("Login");
          }
        })
        .catch((error) => {
          setSubmitting(false);
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
        });
      setSubmitting(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
    }
  };

//! Not tested
//!User Resend Password
export const ResendEmailAction =
  (
    route,
    setResendingEmail,
    setResendStatus,
    setActiveResend,
    triggerTimer,
    t
  ) =>
  async (dispatch) => {
    try {
      setResendingEmail(true);
      const email = route.params.email;
      const id = route.params.id;
      // make request to backend
      await axios
        .post(`${currentUrl}/otp/resendOTP`, { id, email })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            setResendStatus(t("common:Sent"));

            Toast.show({
              type: "success",
              text1: t("common:Success"),
              text2: t("common:OTP_has_been_resent"),
            });
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
        });
      setResendingEmail(false);
      // hold on briefly
      setTimeout(() => {
        setResendStatus(t("common:Resend"));
        setActiveResend(false);
        triggerTimer();
      }, 5000);
    } catch (error) {
      setResendingEmail(false);
      setResendStatus(t("common:Failed"));
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
    }
  };

//!User Verify OTP From Email Verification Screen
export const VerifyOTPAction =
  (code, route, setPinReady, moveTo, t) => async (dispatch) => {
    try {
      const otp = code;
      const { id } = route.params;
      // make request to backend
      await axios
        .post(`${currentUrl}/otp/verify`, { otp, id })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            setPinReady(true);

            Toast.show({
              type: "success",
              text1: t("common:Success"),
              text2: t("common:Your_account_has_been_verified"),
            });
            moveTo("Login");
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
    }
  };
//!User Verify OTP From Reset Password Screen
export const VerifyOTPlModifyPasswordAction =
  (code, route, setPinReady, t) => async (dispatch) => {
    try {
      const otp = code;
      const { id } = route.params;
      // make request to backend
      await axios
        .post(`${currentUrl}/otp/verify-modify-password`, { otp, id })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            setPinReady(true);

            Toast.show({
              type: "success",
              text1: t("common:Success"),
              text2: t("common:You_can_set_your_new_password_now"),
            });
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(response.data.message),
      });
    }
  };
export const EditPasswordAction =
  (values, setSubmitting, id, moveTo, t) => async (dispatch) => {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = values;
      await axios
        .post(`${currentUrl}/client/reset_password`, {
          oldPassword,
          newPassword,
          id,
          confirmNewPassword,
        })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
            setSubmitting(false);
          } else if (response.data.status === "Success") {
            Toast.show({
              type: "success",
              text1: t("common:Success"),
              text2: t("common:password_changed_successfully"),
            });
            setSubmitting(false);
            moveTo("Settings");
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
          setSubmitting(false);
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
      setSubmitting(false);
    }
  };

//!Logout User
// Inside your Logout action
// export const Logout = ({ navigation }) => async (dispatch) => {
//   await AsyncStorage.removeItem("jwt");
//   await dispatch({
//     type: SET_USER,
//     payload: {},
//   });

//   // Check if navigation is available before dispatching actions
//   if (navigation && navigation.dispatch) {
//     navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [{ name: 'Onboarding' }] // or 'Login' screen
//       })
//     );
//   } else {
//     console.error("Navigation is not available.");
//   }
// };

export const Logout = () => async (dispatch) => {
  await AsyncStorage.removeItem("jwt");
  await dispatch({
    type: setUser,
    payload: {},
  });
};
/*export const setUser = (decode) => ({
  type: setUser,
  payload: decode,
});
export const setRole = (decode) => ({
  type: setRole,
  payload: decode,
});*/
