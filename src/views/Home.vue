<template>
  <div class="home">
    <div class="section-banner">
      <!-- 通过content把背景图片的容器撑开，所以不需要设置height -->
      <div class="back-to-top" @click="toTop()"></div>
      <div class="section-banner-bg" ref="top">
        <div class="section-banner-container">
          <div class="section-banner-main">
            <div class="section-banner-title wow fadeInLeft" data-wow-iteration="1">Get Anything On Rent</div>
            <div class="section-banner-text wow fadeInLeft">Find Thousands of Items (Almost Anything)</div>
            <div class="section-banner-form">
              <div class="section-banner-search">
                <div class="section-banner-search-box">
                  <input v-model="searchInput" class="section-banner-input" type="text" placeholder="Cars, Drones, Electronics, Clothes etc" />
                  <input class="section-banner-button" type="button" value="SEARCH" @click="search()" />
                </div>
              </div>
            </div>
            <div class="section-banner-bottom">
              <div class="popular-searches">
                <div class="popular-searches-title">Popular Searchs:</div>
                <div class="popular-searches-list">
                  <div class="popular-searches-item"></div>
                  <div class="popular-searches-item"></div>
                  <div class="popular-searches-item"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ------------------------------------------------------------------------------ -->
    <div class="section-category">
      <div class="section-category-container">
        <div class="section-category-title">
          <div class="section-title wow fadeInLeft">Rent Things The Easier Way</div>
          <div class="section-title-main wow fadeInLeft">Popular Categories</div>
          <div class="section-title-p wow fadeInLeft">Eiusmod temporl incididunt utys labore dolore magna aliqua sed enimaud lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>

        <div class="section-category-slider">
          <div class="section-category-slider-main">
            <transition-group :name="this.sliderAnimation">
              <div class="slider-page" key="slider-page-one" v-show="page1">
                <div class="slider-card" @click="goList(1)">
                  <div class="slider-card-icon" id="electronic"></div>
                  <div class="slider-card-title">Electronic Items</div>
                  <div class="slider-card-else">Laptops, Phones and so on</div>
                </div>
                <div class="slider-card" @click="goList(2)">
                  <div class="slider-card-icon" id="clothes"></div>
                  <div class="slider-card-title">Clothes Items</div>
                  <div class="slider-card-else">Rent a cloth for single use</div>
                </div>
                <div class="slider-card" @click="goList(3)">
                  <div class="slider-card-icon" id="little"></div>
                  <div class="slider-card-title">Accessories</div>
                  <div class="slider-card-else">Watches, necklace and so on</div>
                </div>
                <div class="slider-card" @click="goList(4)">
                  <div class="slider-card-icon" id="life"></div>
                  <div class="slider-card-title">Daily Necessities</div>
                  <div class="slider-card-else">Keep simple but great life</div>
                </div>
              </div>
              <div class="slider-page" key="slider-page-two" v-show="page2">
                <div class="slider-card" id="slider-card-b"></div>
                <div class="slider-card" id="slider-card-b"></div>
                <div class="slider-card" id="slider-card-b"></div>
                <div class="slider-card" id="slider-card-b"></div>
              </div>
              <div class="slider-page" key="slider-page-three" v-show="page3">
                <div class="slider-card" id="slider-card-c"></div>
                <div class="slider-card" id="slider-card-c"></div>
                <div class="slider-card" id="slider-card-c"></div>
                <div class="slider-card" id="slider-card-c"></div>
              </div>
            </transition-group>
          </div>
          <div class="section-category-bar">
            <div class="section-category-bar-item-box" @click="toPage1">
              <div :class="{ 'section-category-bar-item': true, 'section-category-bar-item-active': page1 }"></div>
            </div>
            <div class="section-category-bar-item-box" @click="toPage2">
              <div :class="{ 'section-category-bar-item': true, 'section-category-bar-item-active': page2 }"></div>
            </div>
            <div class="section-category-bar-item-box" @click="toPage3">
              <div :class="{ 'section-category-bar-item': true, 'section-category-bar-item-active': page3 }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ------------------------------------------------------------------------------ -->
    <div class="section-featured">
      <div class="section-featured-container">
        <div class="section-featured-title">
          <div class="section-title wow fadeInLeft">Rent Things The Easier Way</div>
          <div class="section-title-main wow fadeInLeft">Featured Items</div>
          <div class="section-title-p wow fadeInLeft">Eiusmod temporl incididunt utys labore dolore magna aliqua sed enimaud lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>

        <div class="section-featured-main">
          <!-- <div class="section-featured-card">
              <img class="picture" src="https://m2.im5i.com/2021/12/29/UT2mEq.jpg"/>
              <div class="section-featured-card-main">
                <div class="card-title">Canon 3D - MK III</div>
                <div class="card-description">Best DSLR Camera available that Best DSLR Camera available that Best DSLR Camera available that</div>
                <div class="price">
                  <div class="price-title">Rent For</div>
                  <div class="price-content">$45/Day</div>
                </div>
                <div class="line"></div>
                <div class="owner">
                  <div class="owner-icon"></div>
                  <div class="owner-name">Daniel Thomson</div>
                </div>
              </div>
            </div> -->
          <commodityCard v-for="item in this.recommendList" :key="item.object_id" :cardInfo="item"></commodityCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WOW } from "wowjs";
import commodityCard from "../components/CommodityCard.vue";
import API from "../service/index.js";
export default {
  components: {
    commodityCard,
  },
  mounted() {
    this.$nextTick(() => {
      // 在dom渲染完后,再执行动画
      const wow = new WOW({
        live: false,
      });
      wow.init();
    });
    API.object.getRecommendList().then((res) => {
      console.log("res", res);
      this.recommendList = res.data;
    });
  },
  computed: {
    page1: function () {
      return this.currentPage == 1;
    },
    page2: function () {
      return this.currentPage == 2;
    },
    page3: function () {
      return this.currentPage == 3;
    },
  },
  data() {
    return {
      currentPage: 1,
      sliderAnimation: "left-slide",
      searchInput: "",
      recommendList: [],
    };
  },
  methods: {
    toPage1() {
      this.sliderAnimation = "right-slide";
      this.currentPage = 1;
    },
    toPage2() {
      if (this.currentPage > 2) this.sliderAnimation = "right-slide";
      else this.sliderAnimation = "left-slide";
      this.currentPage = 2;
    },
    toPage3() {
      this.sliderAnimation = "left-slide";
      this.currentPage = 3;
    },
    //以上三条是动画切换逻辑
    search() {
      if (this.searchInput == "") return;
      this.$router.push({
        path: "/homepage/items",
        query: {
          mode: 2,
          q: this.searchInput,
        },
      });
    },
    toTop() {
      this.$refs.top.scrollIntoView();
    },
    goList(data) {
      this.$router.push({
        path: "/homepage/items",
        query: {
          mode: 1,
          type: data,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: auto;
  min-width: 1500px;
  .back-to-top {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: rgb(53, 108, 228);
    background-image: url("../assets/top.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 25px 25px;
    z-index: 99;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
  .section-banner {
    width: 100%;
    .section-banner-bg {
      width: 100%;
      padding: 270px 0px;
      background-image: url("../assets/img/bg-banner-custome.jpg");
      background-size: cover;
      background-position: 100% 50%;
      background-repeat: no-repeat;
      mask-image: url("data:image/svg+xml,%3Csvg width='1920' height='825' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M-30.314-163.153c77.975-49.741 199.64-83.866 412.86-53.204 162.9 23.426 250.68 86.329 413.922 95.226 193.634 10.554 311.172 17.245 512.942-35.118 351.84-91.314 575.18-51.944 656.5 28.759 147.23 146.112 113.79 360.066-1.86 546.705C1615.63 981.526 225.534 943.478-69.628 403.833c-94.727-173.191-119.15-465.902 41.314-566.986z' fill='%23EEF3FA'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M-30.314-163.153c77.975-49.741 199.64-83.866 412.86-53.204 162.9 23.426 250.68 86.329 413.922 95.226 193.634 10.554 311.172 17.245 514.942-35.118 351.84-91.314 575.18-51.944 656.5 28.759 147.23 146.112 113.79 360.066-1.86 546.705C1615.63 981.526 225.534 943.478-69.628 403.833c-94.727-173.191-119.15-465.902 39.314-566.986z' fill='%23000'/%3E%3C/svg%3E");
      mask-repeat: no-repeat;
      mask-size: cover;
      mask-position: center bottom;
      .section-banner-container {
        width: 100%;
        padding: 0 40px; //左右40px
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .section-banner-main {
          width: 1140px;
          height: 300px;
          //background-color: lightblue;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .section-banner-title {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 8px;
          }
          .section-banner-text {
            font-size: 18px;
            font-weight: 400;
            color: gray;
          }
          .section-banner-form {
            margin-top: 18px;
            font-size: 16px;
            height: 82px;
            width: 100%;
            //background-color: lightpink;
            .section-banner-search {
              border: 8px solid rgba(255, 255, 255, 0.5);
              border-radius: 47px;
              height: 100%;
              width: 766px;
              .section-banner-search-box {
                width: 100%;
                height: 100%;
                //padding:5px;
                border: 1px solid rgba(34, 34, 34, 0.1);
                border-radius: 40px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                background-color: white;
                .section-banner-input {
                  flex: 1;
                  height: 100%;
                  width: 100%;
                  padding-left: 65px;
                  border-radius: 30px;
                  background-image: url("../assets/img/ico-search.svg");
                  background-position: left 30px center;
                  background-repeat: no-repeat;
                  font-size: 16px;
                  outline: none;
                  overflow: hidden;
                  border: none;
                  text-overflow: ellipsis;
                }
                .section-banner-button {
                  height: 54px;
                  padding: 0 55px;
                  border-radius: 30px;
                  line-height: 54px;
                  border: none;
                  background-color: #e63a28;
                  color: white;
                  margin-right: 5px;
                  font-size: 16px;
                  transition: all 0.5s ease;
                }
                .section-banner-button:hover {
                  background-color: #c43323;
                }
              }
            }
          }
          .section-banner-bottom {
            margin-top: 35px;
            height: 50px;
            width: 100%;
            .popular-searches {
              height: 50px;
              width: auto;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              .popular-searches-title {
                font-size: 16px;
                color: gray;
              }
              .popular-searches-list {
                padding: 0 20px;
                height: 100%;
                width: auto;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                .popular-searches-item {
                  width: 50px;
                  height: 50px;
                  border-radius: 25px;
                  background-color: white;
                  margin-right: 9px;
                }
              }
            }
          }
        }
      }
    }
  }

  .section-category {
    width: 100%;
    .section-category-container {
      width: 100%;
      padding: 120px 40px;
      .section-category-title {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 60px;
        .section-title {
          //这一块的实现需要学习
          user-select: none;
          font-size: 15.6px;
          position: relative;
          color: gray;
          display: inline-block;
          margin-bottom: 18px;
          &:before {
            display: block;
            position: absolute;
            top: 50%;
            width: 37px;
            height: 1px;
            background-color: #e63a28;
            right: calc(100% + 23px);
            content: "";
          }
          &:after {
            display: block;
            position: absolute;
            top: 50%;
            width: 37px;
            height: 1px;
            background-color: #e63a28;
            left: calc(100% + 23px);
            content: "";
          }
        }
        .section-title-main {
          font-size: 45px;
          font-weight: 700;
        }
        .section-title-p {
          margin-top: 15px;
          margin-bottom: 0;
          color: gray;
          font-family: Quicksand;
          font-size: 15.4px;
          font-style: normal;
          font-weight: normal;
          letter-spacing: -0.025em;
          line-height: 1.63;
          text-align: center;
          width: 520px;
        }
      }

      .section-category-slider {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .section-category-slider-main {
          //先写死
          // width:1440px;
          // height:300px;
          //background-color: gray;
          padding: 25px;
          margin: -25px;
          overflow: hidden;
          .slider-page {
            margin-left: -40px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            .slider-card {
              flex-shrink: 0;
              margin-left: 40px;
              height: 300px;
              width: 330px;
              background-color: whitesmoke;
              border-radius: 10px;
              padding: 60px 20px 40px 20px;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              transition: all 0.3s ease;
              cursor: pointer;
              &:hover {
                transform: translateY(-20px);
              }
              .slider-card-icon {
                width: 100px;
                height: 80px;
                background-size: cover;
                margin-bottom: 40px;
              }
              .slider-card-title {
                font-size: 23px;
                margin-bottom: 10px;
              }
              #electronic {
                background-image: url("../assets/img/ico-category-1.png");
              }
              #clothes {
                background-image: url("../assets/img/ico-category-3.png");
                width: 79px;
                height: 102px;
              }
              #little {
                width: 79px;
                height: 102px;
                background-image: url("../assets/little.png");
              }
              #life {
                background-image: url("../assets/img/ico-category-6.png");
              }
            }

            #slider-card-b {
              background-color: lightsalmon;
            }

            #slider-card-c {
              background-color: lightpink;
            }
          }
        }
        .section-category-bar {
          margin-top: 30px;
          width: 100%;
          height: 20px;
          //background-color: lightblue;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .section-category-bar-item-box {
            padding: 10px;
            &:hover {
              .section-category-bar-item {
                background-color: #e63a28;
              }
            }
            .section-category-bar-item {
              width: 25px;
              height: 3px;
              background-color: gray;
              transition: all 0.3s ease;
            }
            .section-category-bar-item-active {
              background-color: #e63a28;
            }
          }
        }
      }
    }
  }

  .section-featured {
    width: 100%;
    .section-featured-container {
      width: 100%;
      padding: 120px 40px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background-color: #fffdf5;
      mask-image: url("data:image/svg+xml,%3Csvg width='1920' height='835' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000' d='M0 30h1920v805H0z'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M-17.702 631.926c77.988 49.78 199.673 83.93 412.929 53.245 162.928-23.443 250.723-86.396 413.992-95.3 193.671-10.562 311.221-17.259 513.021 35.146 351.9 91.385 575.28 51.984 656.62-28.782 147.25-146.227 87.8-3.348-27.86-190.134C1602.52-156.648 212.189-118.57-83.023 421.496c-94.743 173.326-93.17 109.268 65.32 210.43z' fill='%23FFFDF5'/%3E%3C/svg%3E");
      mask-repeat: no-repeat;
      mask-size: cover;
      mask-position: top center;
      .section-featured-title {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 60px;
        .section-title {
          //这一块的实现需要学习
          user-select: none;
          font-size: 15.6px;
          position: relative;
          color: gray;
          display: inline-block;
          margin-bottom: 18px;
          &:before {
            display: block;
            position: absolute;
            top: 50%;
            width: 37px;
            height: 1px;
            background-color: #e63a28;
            right: calc(100% + 23px);
            content: "";
          }
          &:after {
            display: block;
            position: absolute;
            top: 50%;
            width: 37px;
            height: 1px;
            background-color: #e63a28;
            left: calc(100% + 23px);
            content: "";
          }
        }
        .section-title-main {
          font-size: 45px;
          font-weight: 700;
        }
        .section-title-p {
          margin-top: 15px;
          margin-bottom: 0;
          color: gray;
          font-family: Quicksand;
          font-size: 15.4px;
          font-style: normal;
          font-weight: normal;
          letter-spacing: -0.025em;
          line-height: 1.63;
          text-align: center;
          width: 520px;
        }
      }

      .section-featured-main {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-left: -30px;
        width: 1170px;
        .section-featured-card {
          flex-shrink: 0;
          margin-left: 30px;
          margin-bottom: 30px;
          width: 360px;
          height: 500px;
          background-color: whitesmoke;
          border-radius: 20px;
          transition: all 0.3s ease;
          &:hover {
            box-shadow: 25px 25px 50px #b8b8b8;
          }

          .picture {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 20px;
          }

          .section-featured-card-main {
            padding: 32px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            .card-title {
              font-size: 23px;
              color: rgb(51, 51, 51);
            }
            .card-description {
              width: 100%;
              font-size: 14px;
              margin-bottom: 17px;
              color: gray;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .price {
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              font-size: 15.6px;
              margin-bottom: 10px;
              .price-title {
                color: gray;
                margin-right: 10px;
              }
              .price-content {
                color: rgb(241, 68, 68);
              }
            }

            .line {
              width: 100%;
              height: 0;
              border-bottom: #e0e0e0 1px solid;
              margin-top: 10px;
              margin-bottom: 20px;
            }

            .owner {
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              .owner-icon {
                width: 20px;
                height: 20px;
                // background-image: url('../');
                background-color: aqua;
                margin-right: 15px;
              }
              .owner-name {
                font-size: 15.6px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
