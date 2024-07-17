export function objectToFormData(obj: any): FormData {
  const formData = new FormData();

  // Loop through the object and append each key-value pair to FormData
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        // Handle arrays
        for (let i = 0; i < value.length; i++) {
          formData.append(`${key}[${i}]`, value[i]);
        }
      } else if (typeof value === "object" && !(value instanceof File)) {
        // Handle nested objects recursively (if needed)
        for (const subKey in value) {
          if (value.hasOwnProperty(subKey)) {
            formData.append(`${key}.${subKey}`, value[subKey]);
          }
        }
      } else {
        // Handle regular key-value pairs
        formData.append(key, value);
      }
    }
  }

  return formData;
}
