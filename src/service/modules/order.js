import { mock } from "mockjs";
import { getQueryString } from "../../utils/url.js";
import service from "../config/axios.js";
import { images } from "../mockData.js";

export const createOrder = (data) => {
  const res = mock({
    code: 200,
    message: "ok",
    data: "@id",
  });
  return Promise.resolve(res);
};

export const cancleOrder = (id) => {
  const queryStr = getQueryString({ id });
  return service({
    url: "/order/cancel" + queryStr,
    method: "PUT",
  });
};

export const getOrdersById = (userId) => {
  const res = mock({
    code: 200,
    message: "ok",
    "data|5": [
      {
        orderId: "@id",
        createdTime: "@datetime",
        lentoutTime: "@date",
        returnTime: "@date",
        "status|1": ["待支付", "已支付", "已完成"],
        "picture|1": images,
      },
    ],
  });
  return Promise.resolve(res);
};

export const pay = (id) => {
  //订单编号
  const queryStr = getQueryString({ id });
  return service({
    url: "/order/pay" + queryStr,
    method: "POST",
  });
};
