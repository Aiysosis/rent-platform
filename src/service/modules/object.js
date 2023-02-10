import { getQueryString } from "../../utils/url.js";
import service from "../config/axios.js";
import mockjs from "mockjs";
import { accessoryImages, accessoryNames, avatars, clothImages, clothNames, comments, images, lifeImages, lifeNames, names } from "../mockData.js";

const { mock } = mockjs;

export const getRecommendList = () => {
  const response = mock({
    code: 200,
    message: "ok",
    "data|6": [
      {
        "objectId|+1": 1,
        "name|1": [...names, ...clothNames, ...accessoryNames, ...lifeNames],
        "userId|+1": 1,
        description: "这是物品的介绍，它由用户书写，主要用途是介绍物品的特点，价格等信息。",
        status: "0",
        deposit: 400,
        tag: "数码产品",
        "rentDaliy|100-600": 500,
        "newLevel|d3-d10": 9.9,
        "avatar|1": avatars,
        userName: "@cname",
        "picture|1": images,
      },
    ],
  });
  return Promise.resolve(response);
};

export const getListByType = (data) => {
  const { type, page } = data;
  let imageArray = [];
  let nameArray = [];
  switch (type) {
    case 1:
      imageArray = images;
      nameArray = names;
      break;
    case 2:
      imageArray = clothImages;
      nameArray = clothNames;
      break;
    case 3:
      imageArray = accessoryImages;
      nameArray = accessoryNames;
      break;
    case 4:
      imageArray = lifeImages;
      nameArray = lifeNames;
      break;
  }

  const res = mock({
    code: 200,
    message: "ok",
    data: {
      "records|9": [
        {
          "objectId|+1": page,
          "name|1": nameArray,
          "userId|+1": 1,
          description: "这是物品的介绍，它由用户书写，主要用途是介绍物品的特点，价格等信息。",
          status: "0",
          deposit: 400,
          tag: "数码产品",
          "rentDaliy|100-600": 500,
          "newLevel|d3-d10": 9.9,
          "avatar|1": avatars,
          userName: "@cname",
          "picture|1": imageArray,
        },
      ],
      pages: 3,
    },
  });

  return Promise.resolve(res);
};

export const searchListByName = (data) => {
  const { name, page } = data;
  const imageArray = [...images, ...accessoryImages, ...lifeImages, ...clothImages];
  const res = mock({
    code: 200,
    message: "ok",
    data: {
      "records|9": [
        {
          "objectId|+1": page,
          "name|1": [...names, ...clothNames, ...accessoryNames, ...lifeNames],
          "userId|+1": 1,
          description: "这是物品的介绍，它由用户书写，主要用途是介绍物品的特点，价格等信息。",
          status: "0",
          deposit: 400,
          tag: "数码产品",
          "rentDaliy|100-600": 500,
          "newLevel|d3-d10": 9.9,
          "avatar|1": avatars,
          userName: "@cname",
          "picture|1": imageArray,
        },
      ],
      pages: 3,
    },
  });

  return Promise.resolve(res);
};

export const getObjectDetail = (id) => {
  const res = mock({
    code: 200,
    message: "ok",
    data: {
      "objectId|+1": 1,
      "name|1": names,
      "userId|+1": 1,
      "star|1-4.1": 4.2,
      description: "这是物品的介绍，它由用户书写，主要用途是介绍物品的特点，价格等信息。",
      status: "0",
      deposit: 400,
      tag: "数码产品",
      "rentDaliy|100-600": 500,
      "newLevel|d3-d10": 9.9,
      "avatar|1": avatars,
      userName: "@cname",
      "picture|1": images,
      count: 5,
      urls: images,
      "reputation|40-100": 85,
    },
  });
  return Promise.resolve(res);
};

export const uploadObject = (data) => {
  const postData = qs.stringify(data);
  return service({
    url: "/object/upload",
    method: "POST",
    data: postData,
  });
};

export const updateObject = (data) => {
  const postData = qs.stringify(data);
  return service({
    url: "/object/update",
    method: "POST",
    data: postData,
  });
};

export const getMyObject = (id) => {
  const queryStr = getQueryString({
    id,
  });
  return service({
    url: "/object/myObject" + queryStr,
    method: "GET",
  });
};

export const comment = (data) => {
  return Promise.resolve();
};

export const collect = (id) => {
  //物品id
  return Promise.resolve({
    code: 200,
    message: "ok",
  });
};

export const uncollect = (id) => {
  const queryStr = getQueryString({ id });
  return service({
    url: "/object/uncollect" + queryStr,
    method: "PUT",
  });
};

export const getCollectedList = () => {
  return service({
    url: "/object/mycollection",
    method: "GET",
  });
};

export const getCommentByItemId = (id) => {
  const res = mock({
    code: 200,
    message: "ok",
    "data|5": [
      {
        "objectId|+1": 1,
        "userId|+1": 1,
        "grade|1-5": 4,
        "avatar|1": avatars,
        nickName: "@cname",
        "content|1": comments,
        time: "@date",
      },
    ],
  });
  return Promise.resolve(res);
};
