import * as yup from "yup";

export const InformationValidationSchema = yup.object({
  fullName: yup.string().required("Fullname Is Required"),
  username: yup.string().required("Username Is Rrequired"),
  phoneNumber: yup.number().required("Phone Number Is Required"),
  description: yup.string(),
  company: yup.string(),
  officeNumber: yup.number().nullable().notRequired(),
  officeAddress: yup.string(),
  job: yup.string(),
  location: yup.string(),
});

export const SocialMediaValidationSchema = yup.object({
  telegram: yup.string(),
  whatsapp: yup.string().notRequired(),
  instagram: yup.string(),
  facebook: yup.string(),
});

export const PasswordValidationSchema = yup.object({
  oldPassword: yup.string().required("Old Password Is Required"),
  newPassword: yup
    .string()
    .required("New Password Is Required")
    .min(6, "New Password Must Be 6 or greater than 6 Character"),
});
