import service from "../config/axios.js";

export const uploadPic = (image) => {
  const data = new FormData();
  data.append(image);
  return service({
    url: "/pic",
    method: "POST",
    data,
  });
};
