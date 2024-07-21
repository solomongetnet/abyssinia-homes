import * as yup from "yup";

export const basicValidatorSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "You can't add over 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(500, "You can't add over 500 characters"),
  price: yup.object().shape({
    currency: yup.string().required("Price Currency is required"),
    amount: yup
      .number()
      .nullable()
      .typeError("Invaild Price")
      .required("Price is required"),
    period: yup.string(),
  }),
  propertyType: yup.string().required("Property type is required"),
  propertyStatus: yup.string().required("Property status is required"),
  company: yup.string(),
});

export const locationValidatorSchema = yup.object({
  location: yup.object().shape({
    country: yup.string().required("Country Is Required"),
    address: yup.string().required("Address Is Required"),
    city: yup.string().required("City Is Required"),
    street: yup.string(),
    subcity: yup.string(),
    neighborhood: yup.string(),
    region: yup.string(),
    zipCode: yup.mixed().notRequired(),
    longitude: yup.number().nullable(),
    latitude: yup.number().nullable(),
  }),
});

export const additionalValidatorSchema = yup.object({
  size: yup.string().required("Size is required"),
  bathRooms: yup.number().nullable().required("Bathrooms is required"),
  roomsSize: yup.number().nullable(),
  bedRooms: yup.number().nullable().required("Bedrooms is required"),
  builtYear: yup.number().nullable(),
  floorNumber: yup.mixed().notRequired(),
  constructionType: yup.string(),
  amenities: yup.array().of(yup.string()),
});
