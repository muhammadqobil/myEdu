<template>
  <div ref="container" class="container" id="container">
    <div class="form-container sign-up-container">
      <q-form class="q-gutter-md row">
        <h4 class="text-bold no-margin">Create Account</h4>
        <q-input
          class="col-12"
          v-model="bean.login"
          label="Your name *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          class="col-12"
          v-model="bean.login"
          type="number"
          label="Your age *"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
        />
      <q-btn class="button" type="submit">Sign Up</q-btn>
      </q-form>
    </div>
    <div class="form-container sign-in-container">
<!--      <div class="full-width flex justify-end absolute" style="z-index: 100;">-->
<!--        <q-btn-toggle-->
<!--          v-model="language"-->
<!--          :options="languages"-->
<!--          toggle-color="primary"-->
<!--          dense-->
<!--          no-caps-->
<!--          flat-->
<!--          size="15px"-->
<!--        />-->
<!--      </div>-->
      <q-form @submit.prevent="onSubmit" class="q-gutter-md row">
        <h4 class="text-bold no-margin">Dasturga Kirish</h4>
        <q-input
          v-model="bean.login"
          outlined
          dense
          :label="$t('login.l_username')"
          :placeholder="$t('login.l_username')"
          standout="primary white"
          class="col-12"
          lazy-rules
          :rules="[ val => !!val || $t('system.field_is_required') ]"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-account" />
          </template>
        </q-input>

        <q-input
          class="col-12"
          outlined
          dense
          standout="primary white"
          :type=" viewPsw ? 'text' : 'password' "
          v-model="bean.password"
          :label=" $t('login.l_password') "
          :placeholder=" $t('login.l_password') "
          lazy-rules
          :rules="[
          val => !!val || $t('system.field_is_required'),
          val => val.length >= 3 || $t('system.min_6_chars')
        ]"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-account-key"/>
          </template>
          <template v-slot:append>
            <q-icon
              :name="viewPsw ? 'visibility_off' : 'visibility' "
              class="cursor-pointer"
              @click="viewPsw = !viewPsw"

            />
          </template>
        </q-input>
        <div class="full-width row wrap justify-between items-center">
          <q-checkbox v-model="bean.remember" :label="$t('login.l_remember')" color="primary" size="xs"/>
          <q-btn flat :label="$t('login.l_forgot_password')" color="primary" size="md" no-caps />
        </div>
        <q-btn class="button" type="submit" dense>Kirish</q-btn>
      </q-form>
    </div>
    <div class="overlay-container gt-sm">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h4 class="text-bold no-margin">Welcome Back!</h4>
          {{$dateutil.formatDate(new Date().getTime() , 'DD.MM.YYYY')}}
          <p>To keep connected with us please login with your personal info</p>
          <q-btn class="button ghost" @click="signInButton">Sign UP</q-btn>
        </div>
        <div class="overlay-panel overlay-right">
          <img width="200" height="200" src="../assets/logo/logo.png"/>
          <h4 class="text-bold no-margin">My Edu</h4>
          <p>O'quv markazi monitoringi uchun web platforma</p>
<!--          <q-btn class="button ghost" @click="signUpButton">Sign In</q-btn>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {urls} from "src/utils/constants";
import {mapMutations , mapGetters} from 'vuex'
export default {
  data(){
    return{
      viewPsw:false,
      bean:{
        login:null,
        password:null,
        remember:false,
        lang:'uz',
      }
    }
  },
  computed:{
    language: {
      get() {
        return this.$i18n.locale==undefined?'uz':this.$i18n.locale;
      },
      set(value) {
        this.$i18n.locale = value;
      }
    },
    languages: function () {
      var locs = [];
      this.$store.state.appLocales.forEach(loc => {
        locs.push({label: loc.name, value: loc.code});
      });
      return locs;
    }
  },
  methods:{
    ...mapMutations(['setUser' , 'setUserAals' , 'setToken']),
    ...mapGetters(['getUser']),
    signUpButton(){
      this.$refs.container.classList.add(["right-panel-active"])
    },
    signInButton(){
      this.$refs.container.classList.remove(["right-panel-active"])
    },
    onSubmit(){
      this.$axios.post(urls.LOGIN , this.bean , {headers: {'content-type': 'application/json'}}).then( response => {
        if(!response.data){
          return
        };
        if (this.bean.remember) {
          this.$cookie.setUserLogin(response.data.user.login);
        } else {
          this.$cookie.clearUserLogin();
        }
        this.setUser(response.data.user)
        this.setUserAals(response.data.user.roles)
        if (this.getPath) {
          this.$router.push(this.getPath)
        } else {
          this.$router.push('/');
        }
      } ).catch((error)=>{
        this.showError(error)
      })
    },
  },
  mounted() {
    if(this.$cookie.isHasUserLogin()){
      this.bean.username = this.$cookie.getUserLogin()
      this.bean.remember = true
    }
  }
}

</script>

<style scoped>

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.button {
  border-radius: 20px;
  border: 1px solid #0097A7;
  background-color: #0097A7;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.button:active {
  transform: scale(0.95);
}

.button:focus {
  outline: none;
}

.button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
  0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 900px;
  max-width: 100%;
  min-height: 600px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container{
  transform: translateX(-100%);
}

.overlay {
  background: #00838F;
  background: -webkit-linear-gradient(to right, #0097A7, #00838F);
  background: linear-gradient(to right, #0097A7, #00838F);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translate(0 , -7%);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

</style>
