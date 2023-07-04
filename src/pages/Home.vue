<template>
  <div class="q-pa-md full-width full-height">
    <section class="statis mt-4 text-center">
      <div class="row">
        <div class="col-md-6 col-lg-3">
          <div class="box bg-primary p-3">
            <i class="fa fa-user-graduate" style="color: #ffffff;"></i>
            <h3>5,154</h3>
            <p class="lead">Page views</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3 mb-4 mb-lg-0">
          <div class="box bg-danger p-3">
            <i class="uil-user"></i>
            <h3>245</h3>
            <p class="lead">User registered</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3 mb-4 mb-md-0">
          <div class="box bg-warning p-3">
            <i class="uil-shopping-cart"></i>
            <h3>5,154</h3>
            <p class="lead">Product sales</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="box bg-success p-3">
            <i class="uil-feedback"></i>
            <h3>5,154</h3>
            <p class="lead">Transactions</p>
          </div>
        </div>
      </div>
    </section>
    <div class="row q-my-sm">
      <div class="col-8" style="border:1px solid #21BA45; height: calc(100vh - 248px)">body-1</div>
      <div class="col-4 q-px-sm">
        <div class="row">
          <q-toolbar class="text-white no-shadow" style="background: #e3ebf3; border-radius: 3px; height: 8%">
            <q-toolbar-title class="flex justify-between items-center">
              <div>
                <q-icon name="mdi-bank" color="orange-8" size="md"></q-icon>
                <span class="text-bold text-subtitle2 text-primary q-ml-md">{{ $t('Bugungi darslar ro\'yhati') }}</span>
              </div>
            </q-toolbar-title>
          </q-toolbar>
        </div>
          <q-scroll-area style="height: calc(100vh - 285px)">
            <div class="full-width" v-for="item in list_classes_today_arr">
              <q-card bordered class="shadow-1 full-width q-my-sm">
                <q-card-section>
                  <span class="text-h6">{{item.name}}</span>
                  <div class="text-subtitle2 flex justify-between">
                    <span class="text-grey-7">O'qituvchi:</span>
                    <span class="">{{item.teacherFio}}</span>
                  </div>
                </q-card-section>
                <q-separator inset />
                <q-card-section>
                  <div class="text-subtitle2 flex justify-between">
                    <span class="text-grey-7">Xona:</span>
                    <span>
                    {{item.roomName}}
                    <q-chip outline square color="grey-7" size="12px">{{item.roomNumber}}</q-chip>
                  </span>
                  </div>
                  <div class="text-subtitle2 flex justify-between">
                    <span class="text-grey-7">Vaqti:</span>
                    <span class="">
                    <span style="background: #b1d3f6; padding: 0 5px; border-radius: 3px">{{item.timeFrom}}</span>
                    <span class="q-mx-xs">-</span>
                    <span style="background: #f6edb1; padding: 0 5px; border-radius: 3px">{{item.timeTo}}</span>
                  </span>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script>
import {urls} from "src/utils/constants";
import AlarmGraphicWorkTypes from "components/myEdu/Branches";
import StandartIntAnimation from "src/mixins/StandartIntAnimation";

export default {
  name: "Home",
  components: {StandartIntAnimation, AlarmGraphicWorkTypes},
  data(){
    return {
      list_classes_today_arr:[],
      test:0
    }
  },
  methods:{
    getTest(){
      this.$axios.get(urls.TEST).then(res=>{
        console.log(res)
      })
    },
    num(){
      this.test += 20
      console.log(this.test)
    },
    listClassesTodey(){
      this.$axios.get(urls.GROUPS + this.tableFilterQuery({today:1})).then(response => {
        this.list_classes_today_arr.splice(0 , this.list_classes_today_arr.length , ...response.data.content)
      }).catch(error => {
        this.showError(error)
      }).finally(() => {})
    }
  },
  mounted() {
    this.getTest();
    this.listClassesTodey()
  }
}
</script>

<style scoped>
.card-style{
  border: 1px solid rgba(166, 162, 162, 0.27);
  height: 130px;
}
:root {
  --dk-gray-100: #F3F4F6;
  --dk-gray-200: #E5E7EB;
  --dk-gray-300: #D1D5DB;
  --dk-gray-400: #9CA3AF;
  --dk-gray-500: #6B7280;
  --dk-gray-600: #4B5563;
  --dk-gray-700: #374151;
  --dk-gray-800: #1F2937;
  --dk-gray-900: #111827;
  --dk-dark-bg: #313348;
  --dk-darker-bg: #2a2b3d;
  --navbar-bg-color: #6f6486;
  --sidebar-bg-color: #252636;
  --sidebar-width: 250px;
}
.statis {
  color: var(--dk-gray-100);
}

.statis .box {
  position: relative;
  overflow: hidden;
  border-radius: 3px;
}

.statis .box h3:after {
  content: "";
  height: 2px;
  width: 70%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.12);
  display: block;
  margin-top: 10px;
}

.statis .box i {
  position: absolute;
  height: 70px;
  width: 70px;
  font-size: 22px;
  padding: 15px;
  top: -25px;
  left: -25px;
  background-color: rgba(255, 255, 255, 0.15);
  line-height: 60px;
  text-align: right;
  border-radius: 50%;
}
</style>
