import { mock } from "mockjs";
import service from "../config/axios.js";
import { avatars } from "../mockData.js";

export const register = (data) => {
  const postData = qs.stringify(data);
  return service({
    url: "/user/register",
    method: "POST",
    data: postData,
  });
};

export const login = () => {
  const res = {
    code: 200,
    message: "ok",
    data: {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhdXRoMCIsImV4cCI6MTY0MDc3MDEwNiwidXNlcm5hbWUiOiJ6cWYifQ.RqtnTHQ5UTozg5kCgNHWnpK0OG2VReVhdteaHiS0mQA",
    },
  };
  return Promise.resolve(res);
};

export const getInfo = () => {
  const res = mock({
    code: 200,
    message: "ok",
    data: {
      "avatar|1": avatars,
      nickName: "@cname",
      "gender|1": ["男", "女"],
      telephone: "12377358469",
      email: "@email",
      "zone|1": ["四平校区", "嘉定校区", "彰武路校区", "沪北校区"],
      "userId|+1": 1,
      password: "@id",
      role: 0,
      "reputation|50-99": 86,
      joinTime: "@date",
    },
  });
  return Promise.resolve(res);
};

export const updateInfo = (data) => {
  const postData = qs.stringify(data);
  return service({
    url: "/user/update",
    method: "POST",
    data: postData,
  });
};
