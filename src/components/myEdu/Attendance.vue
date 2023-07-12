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
              <template v-if="getRole() === 'ROLE_SUPER_ADMIN'">
                {{getRole()}}
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
              </template>
              <q-space/>
              <q-btn-group>
                <q-btn v-if="getRole()!=='ROLE_SUPER_ADMIN'" icon="add" class="bg-primary text-white" @click="rowAdd" dense>
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

          <template v-slot:body-cell-id="props">
            <q-td :props="props" :style="'background:' + nvl(props.row.attendanceStatus)">
              {{props.row.id}}
            </q-td>
          </template>

          <template v-slot:body-cell-groups="props">
            <q-td :props="props" :style="'background:' + nvl(props.row.attendanceStatus)">
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
            <q-td :props="props" :style="'background:' + nvl(props.row.attendanceStatus)">
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

          <template v-slot:body-cell-timeFrom="props">
            <q-td :props="props" :style="'background:' + nvl(props.row.attendanceStatus)">
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

          <template v-slot:body-cell-createdDate="props">
            <q-td :props="props" :style="'background:' + nvl(props.row.attendanceStatus)">
              <div class="row">
                <div class="col name-column">
                  <span>{{$t('captions.l_created_date_tx')}} : <q-icon name="mdi-calendar" size="xs" color="primary"/></span>
                  <span class="text-bold">
                {{$dateutil.formatDate(props.row.createdDate,'DD.MM.YYYY')}}
              </span>
                </div>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn v-if="props.row.attendanceStatus == 0" size="sm" dense color="orange" icon="mdi-car-child-seat" @click.stop="goToCard(props.row.id)" class="q-mr-xs">
                <q-tooltip content-class="bg-orange">
                  {{$t('Davomat olish')}}
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
          <template v-slot:bottom="props">
            <div class="full-width">
              <div class="text-bold full-width flex items-center justify-between">
                <div class="flex">
                  <div v-for="(item , index) in [1,2]">
                    <q-icon class="q-ml-md none-padding" size="sm" name="mdi-square"
                            :style="index == 0 ? 'color: red' : 'color:green'"/>
                    <span class="text-bold q-mt-md q-px-md text-primary">
                   - {{index == 0 ? ' Davomat olinmagan': ' Davomat olingan' }}  </span>
                  </div>
                </div>
                <div class="text-bold flex items-center">
                 <span class="q-px-md">
                    {{ $t('system.per_page_text') }}
                 </span>
                  <q-select
                    v-model="pagination.rowsPerPage"
                    :options="[5,7,10,15,25,50,100]"
                    borderless
                    dense
                    @input="refreshTable"
                  />
                  <span>
                     {{
                      $t('system.pagination_text', [
                        1 + (props.pagination.page - 1) * props.pagination.rowsPerPage,
                        props.pagination.rowsPerPage * props.pagination.page < props.pagination.rowsNumber ? props.pagination.rowsPerPage * props.pagination.page : props.pagination.rowsNumber,
                        props.pagination.rowsNumber])
                    }}
                  </span>
                  <q-btn
                    v-if="props.pagesNumber > 2"
                    icon="first_page"
                    color="primary"
                    round
                    dense
                    flat
                    :disable="props.isFirstPage"
                    @click="props.firstPage"
                  />

                  <q-btn
                    icon="chevron_left"
                    color="primary"
                    round
                    dense
                    flat
                    :disable="props.isFirstPage"
                    @click="props.prevPage"
                  />

                  <q-btn
                    icon="chevron_right"
                    color="primary"
                    round
                    dense
                    flat
                    :disable="props.isLastPage"
                    @click="props.nextPage"
                  />

                  <q-btn
                    v-if="props.pagesNumber > 2"
                    icon="last_page"
                    color="primary"
                    round
                    dense
                    flat
                    :disable="props.isLastPage"
                    @click="props.lastPage"
                  />
                </div>
              </div>
            </div>
          </template>
        </q-table>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <div class="full-height bg-white">
          <attendance-mini-card v-if="selectedRows && selectedRows[0]" @addGroup="this.refreshTable" :groupsId="selectedRows[0].id"/>
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
  </div>
</template>

<script>
import StandartTable from "src/mixins/StandartTable";
import StandartInputDialog from "components/base/StandartInputDialog";
import {urls} from "src/utils/constants";
import {mapGetters} from "vuex";
import AttendanceMiniCard from "components/myEdu/AttendanceMiniCard";

export default {
  name: "Attendance",
  components: {AttendanceMiniCard},
  mixins: [StandartTable],

  data() {
    return {
      apiUrl: urls.GROUPS_ATTENDANCE,
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
        today:1,
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
  computed:{
    nvl(status) {
      return item =>{
        if (item == 1)
          return '#caf7ca';
        return '#f7c1c1';
      }
    },
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
    goToCard(group_id) {
      this.$emit('toAttendanceCard', group_id)
    },
  },

  mounted() {
    if (this.getRule() === 'ROLE_SUPER_ADMIN'){
      this.getSubjectAll()
      this.getRoomsAll()
      this.getTeachersAll()
    }
  }
}
</script>

<style scoped>
</style>
