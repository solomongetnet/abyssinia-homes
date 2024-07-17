import * as yup from "yup";

export const SignupValidationSchema = yup.object({
  username: yup
    .string()
    .matches(/^\S*$/, "Username cannot contain spaces")
    .required("Username is required"),
  fullName: yup.string().required("Full Name Is Required"),
  email: yup.string().required("Email is required").email("Invalid Email"),
  phoneNumber: yup
    .number()
    .typeError("Phone number must be number")
    .required("Phone number is required")
    .min(10, "Invalid phone number"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be over 6 length"),
  role: yup.string().required("You must select account type"),
});
