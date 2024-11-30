export const convertToFormData = (data: any) => {
  const formData = new FormData();

  for (let key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach((item) => {
        if (item instanceof File) {
          formData.append(key, item);
        } else {
          formData.append(key, JSON.stringify(item));
        }
      });
    } else if (typeof data[key] === "object" && data[key] !== null) {
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};
