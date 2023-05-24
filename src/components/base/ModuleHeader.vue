<template>
  <div>
    <div class="row justify-between items-center" style="background: white">
      <q-ribbon glow leaf-position="top" background-color="primary" decoration="point-in" class="text-subtitle1 q-mt-md">{{$t(currentModule.meta.title)}}</q-ribbon>
      <q-btn-group class="q-mr-md q-mt-sm" style="border-radius: 3px;">
        <q-btn color="primary"size="12px"  icon="mdi-help-circle-outline" :dense="$q.screen.md"/>
        <q-btn color="primary" size="12px" icon="mdi-star" @click="" :dense="$q.screen.md"/>
      </q-btn-group>
    </div>
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
