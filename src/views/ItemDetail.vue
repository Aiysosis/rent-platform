<template>
  <div class="item-detail">
    <el-dialog title="Tips" :visible="dialogVisible" width="30%">
      <span>支付操作和订单深度绑定，但这样的联系在简单的Mock下难以体现，这里放上本人的微信二维码~ 欢迎与我进行技术讨论</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">Cool</el-button>
      </span>
    </el-dialog>
    <div class="check-out-container" v-show="checkOut">
      <div class="check-out-box">
        <div class="check-out-head">Check Out</div>
        <div class="check-out-main">
          <div class="pay-row">Order Number: {{ this.orderId }}</div>
          <div class="pay-code"></div>

          <div class="buttons">
            <div class="check-out-button" style="background-color: red; margin-right: 10px" @click="cancle">Cancle</div>
            <div class="check-out-button" style="background-color: rgb(42, 88, 240); margin-right: 10px" @click="skip">Skip</div>
            <!-- <div class="check-out-button" style="background-color: rgb(42, 88, 240)" @click="pay">pay</div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="section-banner">
      <div class="section-banner-bg">
        <div class="section-banner-container">
          <div class="section-banner-content">
            <div class="section-banner-grid section-banner-flex-bottom">
              <div class="section-width-expand">
                <div class="section-banner-title">{{ this.detail.name }}</div>
                <div class="section-banner-prices">
                  <div class="section-banner-grid">
                    <div>
                      <div class="price-item">
                        <div class="price-item-value">${{ this.detail.rentDaliy }}/Day</div>
                        <!-- <div class="price-item-time">Per Day</div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="section-banner-rating">
                  <i class="far fa-white-star"></i><span>Rating</span><b style="color: red; padding: 0 10px; font-size: 28px">{{ this.detail.star }}</b
                  ><span>({{ this.detail.count }} Reviews)</span>
                </div>
                <div class="section-banner-links">
                  <ul>
                    <li>
                      <a class="link-share" href="#"><i class="far fa-share-alt"></i></a>
                    </li>
                    <li>
                      <a class="link-bookmark" href="#"><i class="far fa-bookmark"></i></a>
                    </li>
                    <li>
                      <a class="link-comment" href="#"><i class="far fa-comment-alt"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ------------------------------------------------------------------------------ -->
    <div class="page-content">
      <div class="uk-section-large uk-container">
        <div class="uk-grid" data-uk-grid>
          <div class="uk-width-2-3@m">
            <div data-uk-slideshow="min-height: 300; max-height: 430">
              <div class="uk-position-relative uk-light">
                <ul class="uk-slideshow-items uk-child-width-1-1" data-uk-lightbox="animation: scale">
                  <li class="uk-border-rounded"><img class="uk-width-1-1" :src="this.detail.urls[0]" alt="img-gallery" data-uk-cover /></li>
                </ul>
                <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-previous data-uk-slideshow-item="previous"></a><a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-next data-uk-slideshow-item="next"></a>
              </div>
              <div class="uk-margin-top" data-uk-slider>
                <ul class="uk-thumbnav uk-slider-items uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l">
                  <li data-uk-slideshow-item="0">
                    <a href="#"><img class="uk-border-rounded" src="../assets/img/img-article-intro-1.jpg" alt="img-gallery" /></a>
                  </li>
                  <li data-uk-slideshow-item="1">
                    <a href="#"><img class="uk-border-rounded" src="../assets/img/img-article-intro-2.jpg" alt="img-gallery" /></a>
                  </li>
                  <li data-uk-slideshow-item="2">
                    <a href="#"><img class="uk-border-rounded" src="../assets/img/img-article-intro-3.jpg" alt="img-gallery" /></a>
                  </li>
                  <li data-uk-slideshow-item="3">
                    <a href="#"><img class="uk-border-rounded" src="../assets/img/img-article-intro-4.jpg" alt="img-gallery" /></a>
                  </li>
                  <li data-uk-slideshow-item="4">
                    <a href="#"><img class="uk-border-rounded" src="../assets/img/img-article-intro-2.jpg" alt="img-gallery" /></a>
                  </li>
                </ul>
                <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin-top"></ul>
              </div>
            </div>
            <!-- ------------------------------------------------------------------------------ -->
            <hr class="uk-margin-medium" />
            <!-- ------------------------------------------------------------------------------ -->
            <h3><span class="icon-folder"></span>Brief Description</h3>
            <p>{{ this.detail.description }}</p>
            <!-- <p>Voluptate velit esse cillum doloreu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p><b>Package Includes:</b></p>
            <ul class="uk-list uk-list-disc uk-list-primary">
              <li>Canon EOS 5D Mark IV DSLR Camera</li>
              <li>Canon 85mm IS F 1.4</li>
              <li>3x Original Canon battery</li>
              <li>256 GB 95 mb/sec</li>
              <li>128 GB 160 mb/sec</li>
              <li>Lens Hood</li>
              <li>Memory card adaptor</li>
            </ul> -->
            <!-- ------------------------------------------------------------------------------ -->
            <hr class="uk-margin-medium" />
            <h3><span class="icon-user icon-accent"></span>Meet The Lender</h3>
            <div class="uk-comment">
              <div class="uk-comment-header">
                <div class="uk-grid uk-flex-middle">
                  <div class="uk-width-auto@l"><img class="uk-comment-avatar" :src="this.detail.avatar" width="80" height="80" alt="avatar" /></div>
                  <div class="uk-width-expand">
                    <div>
                      <div>
                        <div class="uk-grid">
                          <div>
                            <h4 class="uk-comment-title uk-margin-small-bottom">{{ this.detail.userName }}</h4>
                          </div>
                          <div style="padding-left: 5px"><img src="../assets/img/ico-rating.svg" alt="ico-rating" /></div>
                        </div>
                        <div class="uk-grid uk-margin-remove">
                          <div class="uk-padding-remove">
                            <div style="display: flex; flex-direction: row; align-items: center; margin-top: 5px">
                              Reputation：
                              <div style="color: red">{{ this.detail.reputation }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr class="uk-margin-medium" />
            <div class="uk-flex uk-margin-medium-bottom" data-uk-grid>
              <div class="uk-width-expand">
                <h3>
                  <span class="icon-red-star icon-accent"></span>Reviews<small
                    >(Rating <b>{{ this.detail.star }}</b> Based on {{ this.detail.count }} Reviews)</small
                  >
                </h3>
              </div>
              <div><a class="uk-button uk-button-danger" @click="goComment()">ADD A REVIEW</a></div>
            </div>
            <div class="uk-comment uk-margin-small-bottom" v-for="item in this.comments" :key="item.content">
              <div class="uk-comment-header">
                <div class="uk-grid uk-flex-middle" data-uk-grid>
                  <div class="uk-width-auto"><img class="uk-comment-avatar" :src="item.avatar" width="60" height="60" alt="avatar" style="border-radius: 30px" /></div>
                  <div class="uk-width-expand">
                    <div data-uk-grid>
                      <div>
                        <h4 class="uk-comment-title uk-margin-small-bottom">{{ item.nickName }}</h4>
                        <div class="uk-comment-meta">{{ formatTime(item.time) }}</div>
                      </div>
                      <div>
                        <el-rate style="margin-top: 7px" v-model="item.grade" disabled :colors="['#99A9BF', '#F7BA2A', '#FF9900']"> </el-rate>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="uk-comment-body">
                <p>{{ item.content }}</p>
              </div>
            </div>
            <hr class="uk-margin-medium" />
            <h3><span class="icon-red-star icon-accent" ref="comment"></span>Add Review & Rate</h3>
            <div class="block-rating">
              <span class="block-rating__text">Your Rating</span>
              <el-rate style="margin-top: 4px" v-model="myRate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"> </el-rate>
              <span class="block-rating__numb">{{ this.myRate }}.0</span>
            </div>
            <form action="#">
              <div class="uk-grid uk-child-width-1-1" data-uk-grid>
                <div class="uk-margin-small-bottom"><textarea class="uk-textarea" placeholder="Write your review..." v-model="myComment"></textarea></div>
                <div>
                  <div class="uk-button uk-button-danger uk-button-large" @click="sendComment()">Send comment</div>
                </div>
              </div>
            </form>
          </div>
          <div class="uk-width-1-3@m">
            <div class="rent-box">
              <div style="font-size: 20.6px">Want it? Don't hesitate</div>
              <hr class="uk-medium" />
              <div class="rent-box-info">
                <div class="uk-grid uk-flex-middle" data-uk-grid>
                  <div class="uk-width-expand">
                    <div>
                      <div>
                        <div class="uk-grid" tyle="width:100%" data-uk-grid>
                          <div>
                            <div class="uk-h5" style="width: 300px; margin-bottom: 20px">Which campus are you in?</div>
                          </div>
                          <!-- <div style="padding-left: 5px"><img src="../assets/img/ico-rating.svg" alt="ico-rating"></div> -->
                        </div>
                        <!-- <div class="uk-grid uk-margin-remove uk-flex-middle" data-uk-grid> -->
                        <!-- <div class="uk-padding-remove">
                            <ul class="stars-list">
                              <li><i class="far fa-star"></i></li>
                              <li><i class="far fa-star"></i></li>
                              <li><i class="far fa-star"></i></li>
                              <li><i class="far fa-star"></i></li>
                              <li><i class="far fa-star"></i></li>
                            </ul>
                          </div> -->

                        <!-- </div> -->
                      </div>
                    </div>
                  </div>
                  <div class="uk-width-expand">
                    <div class="uk-grid" data-uk-grid>
                      <!-- <div><a class="uk-icon-button" href="#"><span uk-icon="mail"></span></a></div> -->
                      <!-- <div><a class="uk-icon-button" href="#"><span uk-icon="heart"></span></a></div> -->
                    </div>
                  </div>
                </div>
                <!-- <el-input v-model="zone" style="width:100%;"/> -->
                <el-select v-model="zone" placeholder="Please select place of delivery" style="width: 100%">
                  <el-option label="嘉定校区" value="嘉定"></el-option>
                  <el-option label="四平校区" value="四平"></el-option>
                </el-select>
              </div>
              <div class="rent-box__form">
                <div class="uk-h5">When do you want it?</div>
                <form action="#">
                  <el-date-picker v-model="startTime" style="width: 100%; margin-bottom: 15px" format="yyyy-MM-dd" align="right" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Date Start"> </el-date-picker>
                  <el-date-picker v-model="endTime" style="width: 100%; margin-bottom: 5px" format="yyyy-MM-dd" align="right" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Date End"> </el-date-picker>
                  <div class="uk-margin"><input class="uk-button uk-button-danger uk-width-1-1" type="button" @click="rentItem()" value="RENT" /></div>
                  <div class="uk-margin-top">
                    <div class="uk-text-center">
                      <p class="uk-text-meta">
                        Please check if the item is available on<br />
                        the dates you have selected
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../service/index.js";

export default {
  mounted() {
    //console.log(this.$route.params.id);
    // let uid = this.$store.state.user.userId;
    let id = this.$route.params.id;

    this.getDetail(id)
      // .then(() => {
      //   this.getOrderList(uid);
      // })
      .then(() => {
        this.getComments();
      });

    //获取订单的信息
  },
  data() {
    return {
      detail: {},
      startTime: "",
      endTime: "",
      rate: 4,
      myRate: 5,
      colors: [],
      comments: [],
      zone: "",
      checkOut: false,
      myOrders: [],
      myComment: "",
      orderId: -1,
      dialogVisible: false,
    };
  },
  methods: {
    pay() {
      API.order.pay(this.orderId).then((res) => {
        console.log(res);
        this.checkOut = false;
      });
      return;
    },
    async getDetail(id) {
      return new Promise((resolve) => {
        API.object.getObjectDetail(id).then((res) => {
          console.log("detail", res.data);
          this.detail = res.data;
          resolve();
        });
      });
    },
    async getOrderList(id) {
      return new Promise((resolve) => {
        API.order.getOrdersById(id).then((res) => {
          console.log("res", res.data);
          this.myOrders = res.data;
          console.log(this.myOrders);
          this.myOrders.forEach((item) => {
            if (item.objectId == this.detail.objectId && item.status == "待支付") {
              this.orderId = item.order_id;
              this.checkOut = true;
            }
            resolve();
          });
        });
      });
    },
    getComments() {
      API.object.getCommentByItemId(this.detail.objectId).then((response) => {
        this.comments = response.data;
        this.detail.count = this.comments.length;
      });
    },
    rentItem() {
      this.dialogVisible = true;
      if (!this.$store.state.login) {
        this.$router.push({
          path: "/login",
          query: { redirect: this.$route.fullPath }, //将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由
        });
      }

      let myId = this.$store.state.user.userId;
      let data = {
        objectId: this.detail.objectId,
        userId: myId,
        time1: this.startTime,
        time2: this.endTime,
        zone: this.zone,
      };

      API.order.createOrder(data).then((res) => {
        this.orderId = res.data;
        this.checkOut = true;
      });
    },
    goComment() {
      this.$refs.comment.scrollIntoView();
    },
    formatTime(time) {
      return time.replace("T", " ");
    },
    cancle() {
      API.order.cancleOrder(this.orderId).then((res) => {
        alert("取消成功");
      });
      this.checkOut = false;
    },
    skip() {
      this.checkOut = false;
    },
    sendComment() {
      let text = this.myComment;
      if (text == "") {
        this.$message({
          message: "请输入评论内容",
          type: "warning",
        });
        return;
      } else {
        if (
          this.myOrders.find((item) => {
            return item.objectId == this.detail.objectId;
          }) == undefined
        ) {
          this.$message({
            message: "未检测到您的租用记录，因此无法评论",
            type: "warning",
          });
        } else {
          let data = {
            objectId: this.detail.objectId,
            userId: this.$store.state.user.userId,
            content: this.myComment,
            star: this.myRate,
          };
          API.object.comment(data).then((res) => {
            alert("submit");
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.item-detail {
  width: 100%;
  height: auto;
  .check-out-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    backdrop-filter: brightness(80%);
    z-index: 998;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .check-out-box {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      border-radius: 20px;
      background-color: white;
      .check-out-head {
        width: 100%;
        display: felx;
        flex-direction: row;
        align-items: center;
        padding: 5px 20px;
        font-size: 15.6px;
      }
      .check-out-main {
        .pay-row {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-left: 20px;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .pay-code {
          width: 200px;
          height: 200px;
          background-color: lightblue;
          background-image: url("../assets/payCode.jpg");
          background-position: center;
          background-size: cover;
          margin-left: 80px;
          margin-right: 80px;
        }

        .buttons {
          padding: 20px;
          padding-top: 40px;
          padding-bottom: 40px;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .check-out-button {
            user-select: none;
            height: 36px;
            width: 80px;
            border-radius: 18px;
            color: white;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }
  }
  .section-banner {
    width: 100%;

    .section-banner-bg {
      width: 100%;
      padding: 130px 0 200px;
      background-image: url("../assets/img/bg-banner-item.jpg");
      background-size: cover;
      background-position: 100% 50%;
      background-repeat: no-repeat;
      mask-image: url("data:image/svg+xml,%3Csvg width='1920' height='727' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='.702' fill-rule='evenodd' clip-rule='evenodd' d='M2080.04 631.128c-16.18 63.392-153.62 88.263-327 94.48-296.66 10.637-488.97-92.249-751.5-95.98-260.598-3.704-463.745 77.963-751.387 73.372-136.154-2.174-270.747-18.307-290-81-5.104-16.622-.194-35.634 5-48 6.248-14.875 18.135-28.964 35-42.261V0H1920.15v477.466c71.32 26.177 122.14 57.307 145 93.534 14.2 22.492 19.32 42.796 14.89 60.128z' fill='%23CCC'/%3E%3Cpath opacity='.702' fill-rule='evenodd' clip-rule='evenodd' d='M2080.04 631.128c-16.18 63.392-153.62 88.263-327 94.48-296.66 10.637-488.97-92.249-751.5-95.98-260.598-3.704-463.745 77.963-751.387 73.372-136.154-2.174-270.747-18.307-290-81-5.104-16.622-.194-35.634 5-48 6.248-14.875 18.135-28.964 35-42.261V0H1920.15v477.466c71.32 26.177 122.14 57.307 145 93.534 14.2 22.492 19.32 42.796 14.89 60.128z' fill='%23000'/%3E%3C/svg%3E");
      mask-repeat: no-repeat;
      mask-size: cover;
      mask-position: center bottom;

      .section-banner-container {
        width: 100%;
        padding: 0 80px 0 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .section-banner-content {
          font-size: 16px;
          font-weight: 400;
          color: white;

          .section-banner-flex-bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;

            .section-width-expand {
              flex: 1;
              min-width: 1px;

              .section-banner-title {
                padding-top: 40px;
                margin-bottom: 8px;
                color: #ffffff;
                font-size: 60px;
                font-weight: bold;
                letter-spacing: -0.025em;
                line-height: 1.37;
              }

              .section-banner-prices {
                margin-top: 24px;
                display: flex;
                flex-direction: row;

                .price-item {
                  width: 100px;
                  text-align: center;

                  .price-item-value {
                    font-size: 30px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 1.37;
                  }

                  .price-item-time {
                    font-size: 16px;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 1.63;
                  }
                }

                .price-item-2 {
                  width: 100px;
                  text-align: center;
                  margin-left: 7px;

                  .price-item-value {
                    font-size: 30px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 1.37;
                  }

                  .price-item-time {
                    font-size: 16px;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 1.63;
                  }
                }
              }
            }

            .section-banner-rating {
              color: #ffffff;
              font-size: 20px;
              font-style: normal;
              font-weight: normal;
              line-height: 1.63;
            }
          }
        }
      }
    }
  }

  .section-container {
    max-width: 1140px;
    padding-left: 40px;
    padding-right: 40px;
    margin-left: auto;
    margin-right: auto;
    display: flow-root;
    box-sizing: content-box;

    .section-large {
      padding-top: 120px;
      padding-bottom: 120px;
    }
  }
}

.section-banner-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
}

.section-banner-rating i {
  margin-right: 5px;
}

.far {
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 2;
}

.fa-white-star {
  flex: 1;
  height: 100%;
  width: 100%;
  padding-left: 30px;
  border-radius: 40px;
  background-image: url("../assets/img/ico-white-star.svg");
  background-position: left 10px center;
  background-repeat: no-repeat;
  outline: none;
  overflow: hidden;
  border: none;
  text-overflow: ellipsis;
}

.fa-star {
  flex: 1;
  padding-left: 18px;
  border-radius: 10px;
  background-image: url("../assets/img/ico-star.svg");
  background-repeat: no-repeat;
  outline: none;
  overflow: hidden;
  border: none;
}

.section-banner-links {
  margin-top: 27px;
  text-align: right;
}

.section-banner-links ul {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  list-style: none;
}

.section-banner-links ul li a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #ffffff;
  transition: 0.3s;
}

.section-banner-links ul li a.link-share {
  background: #e63a28;
}

.section-banner-links ul li a.link-bookmark {
  background: #2b5ae1;
}

.section-banner-links ul li a.link-comment {
  background: #1aab9f;
}

.fa-share-alt {
  flex: 1;
  height: 100%;
  width: 100%;
  padding-left: 30px;
  border-radius: 30px;
  background-image: url("../assets/img/ico-share.svg");
  background-position: left 10px center;
  background-repeat: no-repeat;
}

.fa-bookmark {
  flex: 1;
  height: 100%;
  width: 100%;
  padding-left: 30px;
  border-radius: 30px;
  background-image: url("../assets/img/ico-bookmark.svg");
  background-position: left 10px center;
  background-repeat: no-repeat;
}

.fa-comment-alt {
  flex: 1;
  height: 100%;
  width: 100%;
  padding-left: 30px;
  border-radius: 30px;
  background-image: url("../assets/img/ico-comment.svg");
  background-position: left 10px center;
  background-repeat: no-repeat;
}

.icon-accent {
  display: inline-block;
  margin-right: 10px;
}

.icon-folder {
  display: inline-block;
  margin-right: 10px;
  height: 25px;
  width: 30px;
  background-image: url("../assets/img/ico-folder.svg");
  background-repeat: no-repeat;
}

.icon-user {
  display: inline-block;
  margin-right: 10px;
  height: 25px;
  width: 30px;
  background-image: url("../assets/img/ico-user.svg");
  background-repeat: no-repeat;
}

.icon-red-star {
  display: inline-block;
  margin-right: 10px;
  height: 25px;
  width: 30px;
  background-image: url("../assets/img/ico-red-star.svg");
  background-repeat: no-repeat;
}

.stars-list {
  -webkit-box-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.uk-textarea {
  height: 160px;
  padding-top: 15px;
  resize: none;
}

.uk-input,
.uk-select,
.uk-textarea {
  padding-left: 20px;
  border-radius: 16px;
  color: #222222;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
}

.uk-select[multiple],
.uk-select[size],
.uk-textarea {
  padding-top: 4px;
  padding-bottom: 4px;
  vertical-align: top;
}

.uk-input,
.uk-textarea {
  max-width: 100%;
  width: 100%;
  padding: 0 10px;
  background: #fff;
  color: #666;
  border: 1px solid #e5e5e5;
  transition: 0.2s ease-in-out;
  transition-property: color, background-color, border;
}

.uk-button-danger {
  background-color: #e63a28;
}

.uk-button {
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  height: 50px;
  padding: 0 1.67em;
  border-radius: 1.39em;
  font-size: 18px;
  letter-spacing: -0.025em;
  line-height: 50px;
  text-transform: none;
  transition: 0.5s;
}

.block-rating {
  -webkit-box-align: center;
  display: inline-flex;
  position: relative;
  align-items: center;
  height: 54px;
  margin: 25px 0;
  padding: 0 0 0 34px;
  border-radius: 27px;
  background: #f5f7fa;
  color: #222222;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 54px;

  .block-rating__text {
    display: inline-block;
    margin-right: 9px;
  }

  .block-rating__numb {
    height: 54px;
    padding: 0 27px;
    border-radius: 27px;
    background-color: #2b5ae1;
    color: #ffffff;
    font-size: 18px;
  }
}

.rent-box {
  padding: 50px 40px;
  border-radius: 10px;
  background: #f5f7fa;

  .rent-box-info {
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #dddddd;
  }

  .uk-icon-button {
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    border: 1px solid #cddbe7;
    color: #2b5ae1;
    transition: 0.3s;
    border-radius: 500px;
    background: #f8f8f8;
    vertical-align: middle;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
