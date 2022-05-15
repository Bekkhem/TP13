<script >
import categoryApi from "@/libs/apis/category";
import productApi from "@/libs/apis/product";
import categorizedApi from "@/libs/apis/categorized";
import itemApi from "@/libs/apis/item";
export default {
  data() {
    return {
      categorized: [],
      categories: [],
      items: [],
      products: [],
      title: "",
      imageUrl: "",
      desc: "",
      categoryId: "",
      itemId: "",
      priceModalShown: false,
      selectedProduct: null,
      price: "",
      source: "",
      i: 0,
    };
  },
  async mounted() {
    this.category = await categoryApi.all();
    this.products = await productApi.all();
    this.categorized = await categorizedApi.findCategorizedItems();
    // console.log(this.categorized);
     this.items = await itemApi.all();
    //  console.log(this.items);
  },
};

</script>

<template>
  <main>
    <div class="bg-gray-100 py-2 text-center text-lg relative" style="position:sticky; top:0; z-index:4">
      TopOne.com
      <div
        class="
          absolute
          text-white
          right-2
          top-2
          bg-gray-400
          px-2
          rounded-md
          cursor-pointer
        "
      >
        <router-link to="/dashboard"><div class="">Dashboard</div></router-link>
      </div>
    </div>
    <div class="display">
       <div class="category">
              <div class="sub-category"  v-for="cate in categorized" :key="cate._id">
                    <h3>{{ cate.name }}</h3>
                    <div >
                         <p v-for="item in cate.items" :key="item._id">- {{ item.name }}</p>
                    </div>
              </div>
      </div>
      <div class="card-dis">
            <div class="card-box" v-for="product in products" :key="product.name">
              <div class="images"> {{product.imageUrl}} </div>
              <div class="title">{{product.title}}</div>
                <div class="shop-price" v-for="price in product?.prices" :key="price._id">
                    <div class="shop-name">- {{ price.price }}$</div>
                    <div class="pirce-shop">- {{ price.source }}</div>
                </div>
            </div>
        </div>
    </div>

  </main>
</template>

<style>
/* * {
    padding: 0;
    margin: 0;
    box-sizing: 0;
} */
.display{
  widows: 100%;
  height: auto;
  display: flex;
}
.category {
    width: 20%;
    height: auto;
    background-color: rgb(156, 163, 175,0.1);
    position: absolute;
}

.sub-category {
    margin: 5px auto;
    width: 60%;
    height: 30vh;
    padding: 10px 0;
    text-align: center;
    background-color: rgba(149, 188, 255, 0.4);
}

.sub-category h3 {
    margin-bottom: 10px;
}

.sub-category p {
    margin-bottom: 5px;
}

.card-dis {
    width: 78%;
    height: auto;
    background-color: rgb(156, 163, 175 );
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    margin-left: 22%;
}

.card-box {
    margin: 5px 10px 0;
    width: 22%;
    height: 40vh;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-box .images {
    width: 80%;
    height: 80%;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card-box .images img {
  width: 90%;
  height: 90%;
}

.card-box .title {
    font-size: 25px;
    margin-bottom: 15px;
}

.card-box .shop-price {
    width: 80%;
    height: 100%;
    display: flex;
}

.card-box .shop-price .shop-name {
    width: 45%;
    height: 100%;
    color: black;
}

.card-box .shop-price .price-shop {
    width: 45%;
    height: 100%;
    background-color: rgb(61, 192, 0);
    color: black;
}
</style>