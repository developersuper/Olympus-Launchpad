<template>
  <div class="btn-main">
    <span class="mas">{{ name }}</span>
    <button type="button" name="Hover">{{ name }}</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import ItemComp from "@/components/Itemc.vue";
export default {
  name: "Button",
  props: {
    name: String,
  },
};
</script>

<style>
.btn-main {
  position: relative;
  height: 45px;
  overflow: hidden;
  transition: 0.5s;
  color: #ffff;
  font-size: 13px;
  border-radius: 30px;
  background-image: linear-gradient(to left, #F57824, #EFBD28)
}
.btn-main button {
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border-radius: 30px;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.7px;
  background: #081a2e;
  margin: 2px;
  -webkit-mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png");
  mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png");
  -webkit-mask-size: 3000% 100%;
  mask-size: 3000% 100%;
  border: none;
  color: #fff;
  cursor: pointer;
  -webkit-animation: ani2 0.7s steps(29) forwards;
  animation: ani2 0.7s steps(29) forwards;
  text-transform: uppercase;
}
.btn-main button:hover {
  -webkit-animation: ani 0.7s steps(29) forwards;
  animation: ani 0.7s steps(29) forwards;
}
.mas {
  position: absolute;
  color: #ffff;
  text-align: center;
  width: 100%;
  position: absolute;
  font-size: 13px;
  overflow: hidden;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  letter-spacing: 0.7px;
  text-transform: uppercase;
}

.bb-btn {
  background-image: linear-gradient(to right, #6f7c8e, #6f7c8e);
}
.blue-btn button {
  background: #39475c;
}

.connectBtn button {
  -webkit-mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png");
  mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png");
  -webkit-mask-size: 2300% 100%;
  mask-size: 2300% 100%;
  -webkit-animation: ani2 0.7s steps(22) forwards;
  animation: ani2 0.7s steps(22) forwards;
}
.connectBtn button:hover {
  -webkit-animation: ani 0.7s steps(22) forwards;
  animation: ani 0.7s steps(22) forwards;
}
@keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
@keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}
</style>
