<template>
  <div>
    <div class="row justify-between items-center" style="background: white">
      <q-ribbon glow leaf-position="top" background-color="indigo-6" decoration="point-in" class="text-subtitle1 q-mt-md">{{$t(currentModule.meta.title)}}</q-ribbon>
      <q-btn-group class="q-mr-md q-mt-sm" style="border-radius: 3px;">
        <q-btn color="indigo"size="12px"  icon="mdi-help-circle-outline" :dense="$q.screen.md"/>
        <q-btn color="indigo" size="12px" icon="mdi-star" @click="" :dense="$q.screen.md"/>
      </q-btn-group>
    </div>


<!--    <q-card-section class="hedr q-card__section q-px-lg q-py-xs q-mt-xs bg-indigo text-white">-->
<!--      <q-icon name="mdi-information-outline" size="md"/>-->
<!--      {{$t(currentModule.meta.description)}}-->
<!--    </q-card-section>-->

  </div>
</template>

<script>
  export default {
    name: 'ModuleHeader',
    data() {
      return {}
    }
  }
</script>
