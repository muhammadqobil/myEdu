<template>
  <div>
    <div class="row q-col-gutter-sm">
      <div class="col-xs-12 col-sm-6 col-md-8 col-lg-8">
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
          @row-click="singleRowClick"
          class="sticky-last-column-table"
          style="height: calc(100vh - 192px); overflow-y: auto"
        >
          <template v-slot:no-data="props">
            {{$t('system.no_matching_found')}}
          </template>
          <template v-slot:top="props">
            <div class="fit row items-center">
              <q-select
                v-model="filter.subjectsId"
                emit-value
                outlined
                map-options
                :options="subjects"
                option-value="id"
                option-label="name"
                :label="$t('Fanlar')"
                stack-label
                transition-show="scale"
                transition-hide="scale"
                class="col-xs-12 col-sm-3 col-md-3 col-lg-2 q-pl-md"
                dense>
                <template v-slot:append>
                  <q-icon v-if="filter.subjectsId != null" name="close" @click.stop="filter.subjectsId = null"
                          class="cursor-pointer"/>
                </template>
                <template v-slot:selected-item="props">
                  <div>{{ props.opt.name}}</div>
                </template>

              </q-select>
              <q-select
                v-model="filter.teachersId"
                emit-value
                outlined
                map-options
                :options="teachers"
                option-value="id"
                option-label="fio"
                :label="$t('fp_captions.l_teachers')"
                stack-label
                transition-show="scale"
                transition-hide="scale"
                class="col-xs-12 col-sm-3 col-md-3 col-lg-2 q-pl-md"
                dense>
                <template v-slot:append>
                  <q-icon v-if="filter.teachersId != null" name="close" @click.stop="filter.teachersId = null"
                          class="cursor-pointer"/>
                </template>
                <template v-slot:selected-item="props">
                  <div>{{ props.opt.fio}}</div>
                </template>

              </q-select>
              <q-space/>
              <q-btn-group>
                <q-btn v-if="getRole()=='ROLE_SUPER_ADMIN'" icon="add" class="bg-primary text-white" @click="rowAdd" dense>
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

          <template v-slot:body-cell-groups="props">
            <q-td :props="props">
              <div class="row">
                <div class="col name-column">
                  <span> {{$t('captions.l_name')}} : </span>
                  <span class="text-bold">
                {{props.row.name}}
              </span>
                </div>
              </div>
              <div class="row">
                <div class="col name-column">
                  <span> {{$t('fp_captions.l_subject_name')}} : </span>
                  <span v-if="props.row.subjectName" class="text-bold">
                {{props.row.subjectName}}
              </span>
                </div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-teacherFio="props">
            <q-td :props="props">
              <div class="row">
                <div class="col name-column">
                  <span> {{$t('captions.l_fio')}} : </span>
                  <span v-if="props.row.teacherFio" class="text-bold">
                {{props.row.teacherFio}}
              </span>
                </div>
              </div>
              <div class="row">
                <div class="col name-column">
                  <span> {{$t('captions.l_phone')}} : </span>
                  <span v-if="props.row.teacherPhone" class="text-bold">
                {{phone_format(props.row.teacherPhone)}}
              </span>
                </div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-teachers="props">
            <q-td :props="props">
              <div class="row">
                <div class="col name-column">
                  <span> {{$t('captions.l_fio')}} : </span>
                  <span v-if="props.row.teachers" class="text-bold">
                {{props.row.teachers.fio}}
              </span>
                </div>
              </div>
              <div class="row">
                <div class="col name-column">
                  <span> {{$t('captions.l_phone')}} : </span>
                  <span v-if="props.row.teachers" class="text-bold">
                {{phone_format(props.row.teachers.phone)}}
              </span>
                </div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-roomName="props">
            <q-td :props="props">
              <div class="row">
                <div class="col name-column">
                  <span> {{$t('captions.l_name')}} : </span>
                  <span v-if="props.row.roomName" class="text-bold">
                {{props.row.roomNumber}} <span> - </span>{{props.row.roomName}}
              </span>
                </div>
              </div>
              <div class="row">
                <div class="col name-column">
                  <span> {{$t('Hafta kunlari')}} : </span>
                  <span v-if="props.row.weekDays" v-for="item in props.row.weekDays" class="text-bold">
                {{item.shortName}}
              </span>
                </div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-rooms="props">
            <q-td :props="props">
              <div class="row">
                <div class="col name-column">
                  <span> {{$t('captions.l_name')}} : </span>
                  <span v-if="props.row.rooms" class="text-bold">
                {{props.row.rooms.number}} <span> - </span>{{props.row.roomName}}
              </span>
                </div>
              </div>
              <div class="row">
                <div class="col name-column">
                  <span> {{$t('Hafta kunlari')}} : </span>
                  <span v-if="props.row.weekDays" v-for="item in props.row.weekDays" class="text-bold">
                {{item.shortName}}
              </span>
                </div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-createdDate="props">
            <q-td :props="props">
              <div class="row">
                <div class="col name-column">
                  <span>{{$t('captions.l_created_date_tx')}} : <q-icon name="mdi-calendar" size="xs" color="primary"/></span>
                  <span class="text-bold">
                {{$dateutil.formatDate(props.row.createdDate,'DD.MM.YYYY')}}
              </span>
                </div>
              </div>
              <div class="row">
                <div class="col name-column">
                  <span> {{$t('captions.l_description')}} : </span>
                  <span class="text-bold">
                {{props.row.description}}
              </span>
                </div>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-timeFrom="props">
            <q-td :props="props">
              <div class="row">
                <div class="col name-column">
                  <span><q-icon name="mdi-clock" size="xs" color="primary"/></span>
                  <span class="text-bold">
                {{props.row.timeFrom}} - {{props.row.timeTo}}
              </span>
                </div>
              </div>
            </q-td>
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
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <div class="full-height bg-white">
          <groups-mini-card v-if="selectedRows && selectedRows[0]" @addGroup="this.refreshTable" :groupsId="selectedRows[0].id"/>
          <template v-else>
            <q-card class="fit no-shadow">
              <q-card-section class="full-width">
                <div class="q-pa-xl text-center full-width">
                  <q-icon name="mdi-select" size="45px" class="text-blue-grey-12"/>
                  <h4 class="text-subtitle text-blue-grey-12 q-mt-xl q-mb-xl">{{ $t('fp_captions.l_not_selected') }}</h4>
                </div>
              </q-card-section>
            </q-card>
          </template>
        </div>
      </div>
    </div>
    <!--DIALOG-->
    <standart-input-dialog v-model="formDialog" :model-id="bean.id" :on-submit="onSubmit"
                           :on-validation-error="onValidationError">

      <div class="row">
        <q-input v-model="bean.name" :placeholder="$t('captions.l_name')"
                 :label="$t('captions.l_name')"
                 class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
                 lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>

        <div class="row col-xs-12 col-sm-12 full-widths">

          <q-select
            v-model="bean.teachersId"
            emit-value
            map-options
            :options="teachers"
            option-value="id"
            option-label="fio"
            :label="$t('fp_captions.l_teachers')"
            transition-show="scale"
            transition-hide="scale"
            class="q-pa-md col-xs-12 col-md-6 col-lg-6" dense
          >
            <template v-slot:selected-item="props">
              <div>{{props.opt.fio}}</div>
            </template>
          </q-select>
          <q-select
            v-model="bean.subjectsId"
            emit-value
            map-options
            :options="subjects"
            option-value="id"
            option-label="name"
            :label="$t(`fp_captions.l_subjects`)"
            transition-show="scale"
            transition-hide="scale"
            class="q-pa-md col-xs-12 col-md-6 col-lg-6" dense
          >
            <template v-slot:selected-item="props">
              <div>{{props.opt.name}}</div>
            </template>
          </q-select>

          <q-select
            v-model="bean.roomsId"
            emit-value
            map-options
            :options="rooms"
            option-value="id"
            option-label="name"
            :label="$t('fp_captions.l_rooms')"
            transition-show="scale"
            transition-hide="scale"
            class="q-pa-md col-xs-12 col-md-6 col-lg-6" dense
          >
            <template v-slot:selected-item="props">
              <div>{{props.opt.name}}</div>
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
            clearable
            :label="$t('fp_captions.l_weekdays')"
            transition-show="scale"
            transition-hide="scale"
            class="q-pa-md col-xs-12 col-md-6 col-lg-6" dense
            style="text-indent: 12px;"

          >
            <template v-slot:selected-item="props">
              <div>{{props.opt.name}}</div>
            </template>
          </q-select>
          <div class=" q-pl-md text-subtitle2 full-width">
            Darsga kirish vaqti
          </div>
          <q-input v-model="bean.timeFrom" :placeholder="$t('captions.l_from_date')"
            :label="$t('captions.l_from_date')"
            mask="## : ##"
            fill-mask
            class="q-pa-md col-xs-12 col-sm-12 col-md-6 col-lg-6" dense
            lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>
        <q-input v-model="bean.timeTo" :placeholder="$t('captions.l_to_date')"
           :label="$t('captions.l_to_date')"
           mask="## : ##"
           fill-mask
           class="q-pa-md col-xs-12 col-sm-12 col-md-6 col-lg-6" dense
           lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>

          <q-input v-model="bean.description" :placeholder="$t('captions.l_description')"
                   :label="$t('captions.l_description')"
                   class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
                    >
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
import GroupsMiniCard from "components/myEdu/GroupsMiniCard";

export default {
  name: "Groups",
  components: {GroupsMiniCard, StandartInputDialog},
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
          name: 'groups',
          field: row => row.name,
          label: this.$t('fp_captions.l_group'),
          align: 'left',
          classes: 'col-1',
        },
        {
          name: 'teacherFio',
          field: row => row.teacherFio,
          label: this.$t('fp_captions.l_teacher'),
          align: 'left',
          classes: 'col-1',
        },
        {
          name: 'roomName',
          field: row => row.roomName,
          label: this.$t('fp_captions.l_room_info'),
          align: 'left',
          classes: 'col-1',
        },
        {
          name: 'timeFrom',
          field: row => row.timeFrom,
          label: this.$t('Dars vaqtlari'),
          format: val => `${val}`,
          align: 'left',
          classes: 'col-1',
        },
        {
          name: 'createdDate',
          field: row => row.name,
          label: this.$t('fp_captions.l_additional_information'),
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
    ...mapGetters(['getUser','getRole']),
    getSubjectAll(){
      this.$axios.get(urls.SUBJECTS ).then(response=>{
        this.subjects.splice(0,this.subjects.length , ...response.data.content)
      }).catch((error)=>{
        this.showError(error)
        console.log(error)
      }).finally(()=>{})
    },

    getRoomsAll(){
      this.$axios.get(urls.ROOMS).then(response=>{
        this.rooms.splice(0,this.rooms.length , ...response.data.content)
      }).catch((error)=>{
        this.showError(error)
        console.log(error)
      }).finally(()=>{})
    },
    getTeachersAll(){
      this.$axios.get(urls.TEACHERS).then(response=>{
        console.log(response.data.content)
        this.teachers.splice(0,this.teachers.length , ...response.data.content)
      }).catch((error)=>{
        this.showError(error)
        console.log(error)
      }).finally(()=>{})
    },
    getWeekDaysAll(){
      this.$axios.get(urls.WEEK_DAYS).then(response=>{
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
