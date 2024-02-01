const Auth = [
  {
    path: "login",
    name: "Login",
    component: () => import("../views/SignIn.vue")
  },
  // Confirm number
  {
    path: "confirm-number",
    name: "ConfirmNumber",
    component: () => import("../views/ConfirmNumber.vue")
  },
  // Verify number
  {
    path: "verify-number",
    name: "VerifyNumber",
    component: () => import("../views/VerifyNumber.vue")
  },
  // Set credentials
  {
    path: "set-credentials",
    name: "SetCredentials",
    component: () => import("../views/SetCredentials.vue")
  },
  // Forget password
  {
    path: "forget-password",
    name: "ForgetPassword",
    component: () => import("../views/ForgetPassword.vue")
  }
]

export default Auth
