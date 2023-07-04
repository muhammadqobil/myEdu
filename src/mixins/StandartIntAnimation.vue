<template>
  <span>
    {{formatPrice(animatedNumber)}}
  </span>

</template>

<script>
import {gsap} from "gsap";
export default {
  props:{
    value:{

    }
  },
  name: "StandartIntAnimation",
  data() {
    return {
      tweenedNumber:0
    }
  },
  methods:{
    number_formats(number, decimals, thousands_sep) {
      return number ? number.toFixed(decimals ? decimals : 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (thousands_sep ? thousands_sep : ' ')) : "0"
    },
  },
  computed: {
    animatedNumber: function() {
      return this.tweenedNumber.toFixed(0);
    }
  },
  watch: {
    value: function(newValue) {
      gsap.to(this.$data,
        {
          duration: 1,
          tweenedNumber: newValue
        });
    }
  },
  mounted() {


  },
  destroyed() {


  }
}
</script>

<style scoped>

</style>
