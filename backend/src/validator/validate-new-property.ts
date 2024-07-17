export const validateNewProperty = (body: any) => {
  let error = undefined;
  if (
    !body.title ||
    !body.description ||
    !body.builtYear ||
    !body.propertyType ||
    !body.propertyStatus ||
    !body.price.amount ||
    !body.price.currency ||
    !body.location.country ||
    !body.location.city ||
    !body.location.address ||
    !body.size
  ) {
    error = "Invalid Request";
  } else {
    error = undefined;
  }

  return { error };
};
