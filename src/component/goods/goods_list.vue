<template>
  <article class="goods-list">
    <ul class="mui-table-view mui-grid-view">
      <!-- 商品详情 -->
      <li v-for="item in goodsList" v-bind:key="item.id"
      class="mui-table-view-cell mui-media mui-col-xs-6">
      	<router-link v-bind:to="{name:'gd',params:{id:item.id}}">
	        <div class="mui-card">
	          <!-- 商品图片 -->
	          <div class="mui-card-header">
	          	<img v-bind:src="item.img_url" alt="" />
	          </div>
	          <!-- 商品描述 -->
	          <div class="mui-card-footer ">
	            <p class="mui-ellipsis-2">{{item.title}}</p>
	          </div>
	          <!-- 商品价格 -->
	          <div class="mui-card-content">
	            <p class="price">
	            	<span>￥{{item.sell_price}}</span>
	            	<s>￥{{item.market_price}}</s>
	            </p>
	            <p class="tip">
	            	<span>热卖中</span>
	            	<span>剩余{{item.stock_quantity}}件</span>
	            </p>
	          </div>
	        </div>
        </router-link>
      </li>
    </ul>
    <!-- 加载更多 
      用v-bind添加一个禁用 属性，如果值为true那么禁用
      再用插值表达式添加一个判断，如果值为true那么就是最后一页，false就是加载更多
    -->
    <button v-on:click="loadMore()" v-bind:disabled="isEmpty"
    class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined">
      {{isEmpty?'已经是最后一页了':'点击加载下一页'}}
    </button>
  </article>
</template>

<script>
  export default {
    data(){
      return{
        goodsList:[],
        pageIndex:1,
        isEmpty:false // 标识符，判断返回的数据 是否为空
      }
    },
    methods:{
      getGoodsList(){
        // ...的作用是分割数组，在这里是把数组中的每一项 push到goodsList中
        if(!this.isEmpty){
          this.axios.get(`${this.api.goodsL}?pageindex=${this.pageIndex}`)
          .then((rsp) => {
             this.goodsList.push(...rsp.data.message);
             this.islastpath(rsp.data.message);
          });
        }
        
      },
      loadMore(){
        // 点击加载跟多 触发事件 先让页码自增一次
        this.pageIndex++;
        this.getGoodsList();
      },
      // 把判断 是否是最后一页 单独写成一个方法，提高代码可读性
      islastpath(list){
        if(list.length == 0) {
          this.isEmpty = true;
        }
      }
    },
    created(){
      this.getGoodsList();
    }

  }

</script>

<style lang="less" scoped>
  .goods-list {
  	.mui-card {
  		box-shadow: 0px 0px 4px rgba(0, 0, 0, .3);
  	}
  	.mui-card-header {
  		padding: 8px;
  		/*height: 100px;*/
  		img {
  			width: 100%;
  			height: 100%;
  		}
  	}
    .mui-card-content {
      text-align: center;
      .price {
        margin-bottom: 4px;
        color: #000;
        span {
          color: red;
        }
      }
      .tip {
        overflow: hidden;
        padding: 0 8px;
        font-size: 12px;
        span:first-child {
          float: left;
        }
        span:last-child {
          float: right;
        }
      }
    }
  }
</style>