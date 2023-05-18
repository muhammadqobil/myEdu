<template>
  <div>
    <q-dialog v-model="dialog" position="top" no-backdrop-dismiss >
      <q-card style="width: 400px">

        <q-card-section class="row items-center no-wrap">
          <div v-if="error">
            <div class="text-weight-bold flex items-center" v-if="error.errorMessage">
              <q-icon size="sm" class="q-mr-md text-red-8" name="mdi-alert-box-outline"/>
              {{error.errorMessage}}</div>
            <div class="q-mt-sm text-bold" v-if="error.errorDescription">{{$t("fp_captions.l_error_description")}} {{error.errorDescription}}</div>
            <div class="q-mt-sm text-grey">{{$t("fp_captions.l_error_code")}} {{error.errorCode}}</div>
          </div>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: "ErrorDialog",
  methods: {
    ...mapGetters([
      'getGlobalError',
      'isHaveError'
    ]),
  },
  computed: {
    dialog: {
      get() {
        return this.isHaveError();
      },
      set(value) {
        if (!value)
          this.$store.commit('setGlobalError', undefined);
      }
    },
    error: function () {
      return this.getGlobalError();
    }
  },

}
</script>

<style scoped>

</style>
