<template>
  <div>
    <q-table
      ref="table"
      :row-key="rowKey"
      :data="data"
      :dense="$q.screen.lt.md"
      :grid="$q.screen.xs"
      :columns="columns"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      @request="refreshData"
      :selected.sync="selectedRows"
      separator="horizontal"
      color="secondary"
      bordered
      :no-data-label="noDataText()"
      :rows-per-page-label="perPageText()"
      :pagination-label="paginationText"
      :selected-rows-label="selectedRowsText"
      @row-click="rowClick"
      class="sticky-last-column-table"
      style="height: calc(100vh - 192px); overflow-y: auto"
    >
      <template v-slot:no-data="props">
        {{$t('system.no_matching_found')}}
      </template>
      <template v-slot:top="props">
        <div class="fit row items-center">

          <q-space/>
          <q-btn-group>
            <q-btn icon="add" class="bg-primary text-white" @click="rowAdd" dense>
              <q-tooltip content-class="bg-primary">
                {{$t('system.add')}}
              </q-tooltip>
            </q-btn>

            <q-btn :loading="loading" size="md" dense color="primary" icon="mdi-reload" @click.stop="refreshTable(true)">
              <q-tooltip content-class="bg-primary">
                {{ $t('fp_captions.l_reload') }}
              </q-tooltip>
            </q-btn>
          </q-btn-group>


        </div>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn size="sm" dense color="secondary" icon="mdi-pen" @click.stop="rowEdit(props.row)" class="q-mr-xs">
            <q-tooltip content-class="bg-secondary">
              {{$t('system.edit')}}
            </q-tooltip>
          </q-btn>
          <q-btn size="sm" dense color="negative" icon="mdi-delete-variant" @click.stop="rowDelete(props.row)" class="q-mr-sm">
            <q-tooltip content-class="bg-negative">
              {{$t('system.delete')}}
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>

    </q-table>
    <!--DIALOG-->
    <standart-input-dialog v-model="formDialog" :model-id="bean.id" :on-submit="onSubmit"
                           :on-validation-error="onValidationError">


      <div class="row" style="width: 400px">
        <q-input v-model="bean.name" :placeholder="$t('captions.l_users_fio')"
                 :label="$t('captions.l_name')"
                 class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
                 lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>

        <div class="col-xs-12 col-sm-12">
          <q-select
            v-model="bean.roomsId"
            emit-value
            map-options
            :options="rooms"
            option-value="id"
            option-label="name"
            :label="$t('Honalar')"
            transition-show="scale"
            transition-hide="scale"
            class="q-pa-md col-xs-12" dense
          >
            <template v-slot:selected-item="props">
              <div>{{props.opt.name}}</div>
            </template>
          </q-select>
          <q-select
            v-model="bean.subjectsId"
            emit-value
            map-options
            :options="subjects"
            option-value="id"
            option-label="name"
            :label="$t(`Fanlar`)"
            transition-show="scale"
            transition-hide="scale"
            class="q-pa-md col-xs-12" dense
          >
            <template v-slot:selected-item="props">
              <div>{{props.opt.name}}</div>
            </template>
          </q-select>
          <q-select
            v-model="bean.teachersId"
            emit-value
            map-options
            :options="teachers"
            option-value="id"
            option-label="fio"
            :label="$t('O\'qituvchilar')"
            transition-show="scale"
            transition-hide="scale"
            class="q-pa-md col-xs-12" dense
          >
            <template v-slot:selected-item="props">
              <div>{{props.opt.fio}}</div>
            </template>
          </q-select>

          <q-select
            v-model="bean.weekDays"
            map-options
            :options="weekDays"
            option-value="id"
            option-label="name"
            max-values="3"
            multiple
            hint="Max 3 selections"
            :label="$t('Hafta Kunlari')"
            transition-show="scale"
            transition-hide="scale"
            class="q-pa-md col-xs-12" dense
            style="text-indent: 12px;"

          >
            <template v-slot:selected-item="props">
              <div>{{props.opt.name}}</div>
            </template>
          </q-select>

          <q-input v-model="bean.description" :placeholder="$t('Izoh')"
                   :label="$t('captions.l_name')"
                   class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
                   lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
          </q-input>
        </div>
      </div>

    </standart-input-dialog>
  </div>
</template>

<script>
import StandartTable from "src/mixins/StandartTable";
import StandartInputDialog from "components/base/StandartInputDialog";
import {urls} from "src/utils/constants";
import {mapGetters} from "vuex";

export default {
  name: "Groups",
  components: {StandartInputDialog},
  mixins: [StandartTable],

  data() {
    return {
      apiUrl: urls.GROUPS,
      loading: false,
      rowKey: 'id',
      selectedRows: [],
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      filter:{
        subjectsId: null,
        roomsId: null,
        teachersId: null,
      },
      columns: [
        {
          name: 'id',
          field: 'id',
          label: this.$t('captions.l_id'),
          sortable: true,
          align: 'left',
          style: 'width: 1rem'
        },
        {
          name: 'name',
          field: row => row.name,
          label: this.$t('captions.l_users_fio'),
          format: val => `${val}`,
          align: 'left',
          classes: 'col-1',
        },
        {
          name: 'phone',
          field: row => row.description,
          label: this.$t('captions.l_phone'),
          align: 'left',
          classes: 'col-1',
        },
        {name: 'actions', align: 'center', label: this.$t('captions.l_actions'), style: "width: 1rem"}
      ],
      data: [],
      beanDefault: {
        id: null,
        name: null,
        roomsId: null,
        subjectsId: null,
        teachersId: null,
        weekDays: [],
        description: null
      },
      bean: {},
      formDialog: false,
      subjects: [],
      rooms: [],
      teachers: [],
      weekDays: []
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    getSubjectAll(){
      this.$axios.get(urls.SUBJECTS + '/all' ).then(response=>{
        this.subjects.splice(0,this.subjects.length , ...response.data.content)
      }).catch((error)=>{
        this.showError(error)
        console.log(error)
      }).finally(()=>{})
    },

    getRoomsAll(){
      this.$axios.get(urls.ROOMS + this.tableFilterQuery(this.pagination)).then(response=>{
        this.rooms.splice(0,this.rooms.length , ...response.data.content)
      }).catch((error)=>{
        this.showError(error)
        console.log(error)
      }).finally(()=>{})
    },
    getTeachersAll(){
      this.$axios.get(urls.TEACHERS + this.tableFilterQuery(this.pagination) ).then(response=>{
        this.teachers.splice(0,this.teachers.length , ...response.data.content)
        console.log('123',this.teachers)
      }).catch((error)=>{
        this.showError(error)
        console.log(error)
      }).finally(()=>{})
    },
    getWeekDaysAll(){
      this.$axios.get(urls.WEEK_DAYS + this.tableFilterQuery(this.pagination) ).then(response=>{
        this.weekDays.splice(0,this.weekDays.length , ...response.data.content)
      }).catch((error)=>{
        this.showError(error)
        console.log(error)
      }).finally(()=>{})
    }
  },

  mounted() {
    this.getSubjectAll()
    this.getRoomsAll()
    this.getTeachersAll()
    this.getWeekDaysAll()
  }
}
</script>

<style scoped>
</style>
