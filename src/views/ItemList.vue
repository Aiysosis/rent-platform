<template>
  <div class="item-list">
    <el-dialog title="Tips" :visible="dialogVisible" width="30%">
      <span>由于没有后端支撑，搜索结果将以随机数据展示。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">Sad</el-button>
      </span>
    </el-dialog>
    <div class="back-to-top" @click="toTop()"></div>
    <div class="section-banner" ref="top">
      <!-- 通过content把背景图片的容器撑开，所以不需要设置height -->
      <div class="section-banner-bg">
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
                <div class="popular-searches-title">Related Searchs:</div>
                <div class="popular-searches-list">
                  <div class="related-searches-item">Canon DSLR's |</div>
                  <div class="related-searches-item">Canon DSLR's |</div>
                  <div class="related-searches-item">Canon DSLR's</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-featured" ref="test">
      <div class="section-featured-container">
        <div class="section-featured-title">
          <div class="section-title wow fadeInLeft">Rent Things The Easier Way</div>
          <div class="section-title-main wow fadeInLeft">{{ this.banner }}</div>
          <div class="section-title-p wow fadeInLeft">Eiusmod temporl incididunt utys labore dolore magna aliqua sed enimaud lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>
        <div class="section-featured-main">
          <commodityCard v-for="item in this.objectList" :key="item.object_id" :cardInfo="item"></commodityCard>
        </div>
        <div class="load-more" @click="loadMore()" v-show="loadState">Load More</div>
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
    this.mode = this.$route.query.mode;
    if (this.mode == 2) this.dialogVisible = true;
    this.type = this.$route.query.type ? +this.$route.query.type : -1;
    this.banner = this.getBanner(this.type);
    this.searchInput = this.$route.query.q || "";

    if (this.mode == 0) {
      this.objectList = [];
      this.currentPage = 1;
      this.totalPages = 1;
      let data = {
        name: "",
        page: 1,
      };
      API.object.searchListByName(data).then((res) => {
        console.log(res);
        this.objectList = res.data.records;
        this.totalPages = res.data.pages;
      });
    }

    if (this.mode == 1) {
      this.objectList = [];
      this.currentPage = 1;
      this.totalPages = 1;
      let data = {
        type: this.type,
        page: 1,
      };
      API.object.getListByType(data).then((res) => {
        this.objectList = res.data.records;
        this.totalPages = res.data.pages;
      });
    }

    if (this.mode == 2) {
      this.objectList = [];
      this.currentPage = 1;
      this.totalPages = 1;
      let data = {
        name: this.searchInput,
        page: 1,
      };
      API.object.searchListByName(data).then((res) => {
        console.log(res);
        this.objectList = res.data.records;
        this.totalPages = res.data.pages;
      });
    }

    this.goList(); //直接去列表
    //console.log(this.mode,this.type,this.searchInput);
  },
  data() {
    return {
      mode: 0, //0->list mode 1->type mode 2->search mode
      type: -1,
      searchInput: "",
      searchInput: "",
      type: "",
      objectList: [],
      totalPages: 1,
      currentPage: 1,
      banner: "",
      dialogVisible: false,
    };
  },
  computed: {
    loadState: function () {
      return this.currentPage < this.totalPages;
    },
  },
  methods: {
    getBanner: (type) => {
      switch (type) {
        case 1:
          return "Electronic Items";
        case 2:
          return "Clothes Items";
        case 3:
          return "Accessories Items";
        case 4:
          return "Daily Necessities";
        default:
          return "Featured Items";
      }
    },
    search() {
      this.mode = 2;
      this.dialogVisible = true;
      this.objectList = [];
      this.currentPage = 1;
      this.totalPages = 1;
      let data = {
        name: this.searchInput,
        page: 1,
      };
      API.object.searchListByName(data).then((res) => {
        console.log(res);
        this.objectList = res.data.records;
        this.totalPages = res.data.pages;
      });
      this.$refs.test.scrollIntoView();
      return;
    },
    goList() {
      this.$refs.test.scrollIntoView();
    },
    toTop() {
      this.$refs.top.scrollIntoView();
    },
    loadMore() {
      if (this.mode == 0) {
        if (this.currentPage == this.totalPages) return; //健壮性保护
        let data = {
          name: "",
          page: this.currentPage + 1,
        };
        API.object.searchListByName(data).then((res) => {
          let list = res.data.records;
          this.objectList.push(...list);
          this.currentPage++;
        });
      }
      if (this.mode == 1) {
        if (this.currentPage == this.totalPages) return; //健壮性保护
        let data = {
          type: this.type,
          page: this.currentPage + 1,
        };
        API.object.getListByType(data).then((res) => {
          let list = res.data.records;
          this.objectList.push(...list);
          this.currentPage++;
        });
      } else if (this.mode == 2) {
        if (this.currentPage == this.totalPages) return; //健壮性保护
        let data = {
          name: this.searchInput,
          page: this.currentPage + 1,
        };
        console.log(data);
        API.object.searchListByName(data).then((res) => {
          let list = res.data.records;
          this.objectList.push(...list);
          this.currentPage++;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.item-list {
  width: 100%;
  height: auto;
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
      background-image: url("../assets/img/bg-banner-items.jpg");
      background-size: cover;
      background-position: 100% 50%;
      background-repeat: no-repeat;
      mask-image: url("data:image/svg+xml,%3Csvg width='1920' height='727' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='.702' fill-rule='evenodd' clip-rule='evenodd' d='M2080.04 631.128c-16.18 63.392-153.62 88.263-327 94.48-296.66 10.637-488.97-92.249-751.5-95.98-260.598-3.704-463.745 77.963-751.387 73.372-136.154-2.174-270.747-18.307-290-81-5.104-16.622-.194-35.634 5-48 6.248-14.875 18.135-28.964 35-42.261V0H1920.15v477.466c71.32 26.177 122.14 57.307 145 93.534 14.2 22.492 19.32 42.796 14.89 60.128z' fill='%23CCC'/%3E%3Cpath opacity='.702' fill-rule='evenodd' clip-rule='evenodd' d='M2080.04 631.128c-16.18 63.392-153.62 88.263-327 94.48-296.66 10.637-488.97-92.249-751.5-95.98-260.598-3.704-463.745 77.963-751.387 73.372-136.154-2.174-270.747-18.307-290-81-5.104-16.622-.194-35.634 5-48 6.248-14.875 18.135-28.964 35-42.261V0H1920.15v477.466c71.32 26.177 122.14 57.307 145 93.534 14.2 22.492 19.32 42.796 14.89 60.128z' fill='%23000'/%3E%3C/svg%3E");
      mask-repeat: no-repeat;
      mask-size: cover;
      mask-position: center bottom;
      .section-banner-container {
        width: 100%;
        padding: 0 40px; //左右40px
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .section-banner-main {
          width: 1140px;
          height: 300px;
          //background-color: lightblue;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          .section-banner-title {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 8px;
            color: white;
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
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
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
                justify-content: center;
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
              justify-content: center;
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
                .related-searches-item {
                  color: white;
                  margin-right: 9px;
                }
              }
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
          height: 535px;
          background-color: lightblue;
          border-radius: 20px;
          transition: all 0.3s ease;
          &:hover {
            box-shadow: 25px 25px 50px #b8b8b8;
          }
        }
      }

      .load-more {
        user-select: none;
        margin-top: 70px;
        height: 50px;
        color: white;
        background-color: #e63a28;
        border-radius: 25px;
        font-size: 17.2px;
        font-weight: 400;
        width: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;
        &:hover {
          background-color: #c43323;
        }
      }
    }
  }
}
</style>
