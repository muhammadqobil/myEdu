<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-input :value="value" @change="e => updateValue(e)" class="q-pa-md" :dark="darkmode"
           :label="label" :bg-color="bgColor" :placeholder="placeholder" :hint="hint" mask="####-##-##" dense stack-label
           lazy-rules :rules="rules" :outlined="outlined">
    <template v-slot:append>
      <q-icon v-if="value !== '' && value !== null && clearable" name="close"
              @click="updateDateValue('')"
              class="cursor-pointer"/>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date :value="value" :dark="darkmode" @input="e => updateDateValue(e)" mask="YYYY-MM-DD"/>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
  export default {
    name: 'DateInput2',
    props: {
      clearable:{type:Boolean,defualt:false},
      outlined:{type:Boolean,
        default: false},
      darkmode:{type:Boolean,
        default: false},
      value: {type: String},
      label: {type: String},
      placeholder: {type: String},
      hint: {type: String},
      rules: {type: Array},
      bgColor: {type: String, default: ''},
    },
    data() {
      return {}
    },
    methods: {
      updateValue: function (ev) {
        this.$emit('input', ev.target.value);
      },
      updateDateValue: function (ev) {
        this.$refs.qDateProxy.hide();
        this.$emit('input', ev);
      },

    }
  }
</script>
