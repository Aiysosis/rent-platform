<template>
  <!--商品信息卡片 -->
  <div class="commodity-card" @click="goDetail">
    <img class="picture" :src="cardInfo.picture" />
    <div class="section-featured-card-main">
      <div class="card-title">{{ cardInfo.name }}</div>
      <div class="card-description">{{ cardInfo.description }}</div>
      <div class="price">
        <div class="price-title">Rent For</div>
        <div class="price-content">${{ cardInfo.rentDaliy }}/Day</div>
      </div>
      <div class="line"></div>
      <div class="bottom-part">
        <div class="owner">
          <img class="owner-icon" :src="cardInfo.avatar" />
          <div class="owner-name">{{ cardInfo.userName }}</div>
        </div>
        <div @click.stop="collect()" :class="{ collect: !this.collected, 'collect-active': this.collected }" @mouseover="changeToWhite()" @mouseleave="changeBack()">
          <svg class="heart" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" :stroke="this.heartColor" stroke-width="1.03" d="M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../service/index.js";

export default {
  props: {
    cardInfo: Object,
    required: true,
  },
  data() {
    return {
      heartColor: "black",
      collected: false,
    };
  },
  methods: {
    goDetail() {
      this.$router.push({
        path: "/homepage/ItemDetail/" + this.cardInfo.objectId,
      });
    },
    changeToWhite() {
      this.heartColor = "white";
    },
    changeBack() {
      if (this.collected) return;
      this.heartColor = "black";
    },
    collect() {
      if (!this.collected) {
        API.object.collect(this.cardInfo.objectId).then((res) => {
          this.$message({
            message: "已收藏",
            type: "success",
          });
        });
        this.collected = true;
        this.changeToWhite();
      } else {
        this.collected = false;
        this.changeBack();
        this.$message({
          message: "取消收藏",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.commodity-card {
  flex-shrink: 0;
  margin-left: 30px;
  margin-bottom: 30px;
  width: 360px;
  height: 520px;
  background-color: whitesmoke;
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 25px 25px 50px #b8b8b8;
    .picture {
      filter: brightness(100%);
    }
  }

  .picture {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 20px;
    transition: all 0.3s ease;
    filter: brightness(85%);
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

    .bottom-part {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .owner {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .owner-icon {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          // background-image: url('../');
          background-color: aqua;
          margin-right: 15px;
        }
        .owner-name {
          font-size: 15.6px;
        }
      }

      .collect {
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        border: 1px solid #cddbe7;
        border-radius: 18px;
        background: #f8f8f8;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: red;
          color: white;
          .heart {
            color: white;
          }
        }
      }

      .collect-active {
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        border: 1px solid #cddbe7;
        border-radius: 18px;
        background: red;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
