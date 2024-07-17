import * as yup from "yup";

export const LoginValidationSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid Email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be over 6 length"),
});
