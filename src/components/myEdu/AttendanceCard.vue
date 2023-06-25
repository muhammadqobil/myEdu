<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
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
              <q-btn class="q-mr-lg" align="center" outline size="sm" color="primary" icon="arrow_back_ios"
                     @click.stop="goAttendance" :label="$t('login.l_back')"/>
            </div>
          </template>
          <template v-slot:body-cell-id="props">
            <q-td :props="props">
              {{props.row.id}}
            </q-td>
          </template>
          <template v-slot:body-cell-fio="props">
            <q-td :props="props">
              <div class="row">
                <div class="col name-column">
                  <span class="text-subtitle1 text-subtitle1 text-grey-7">
                    {{props.row.fio}}
                  </span>
                </div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-selfPhone="props">
            <q-td :props="props" >
              <div class="row">
                <div class="col name-column">
                  <span class="text-bold text-grey-7">
                    {{phone_format(props.row.selfPhone)}}
                  </span>
                </div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-checkbox size="xs" v-model="props.row.checked" @input="handleCheckbox(props.row)"
                          :data-key="props.row.id" />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
    <!--  DIALOG  -------->
    <standart-input-dialog v-model="formDialog" :model-id="bean.id" :on-submit="onSubmit"
                           :on-validation-error="onValidationError">
      <div class="row">
        <q-input v-model="bean.fio" :placeholder="$t('captions.l_FIO')"
                 :label="$t('captions.l_FIO')"
                 class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
                 lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>
        <q-input v-model="bean.selfPhone" :placeholder="('fp_captions.l_personal_phone_number')"
                 :label="$t('fp_captions.l_personal_phone_number')"
                 mask="(##) ### - ## - ##"
                 fill-mask
                 unmasked-value
                 class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-6" dense
                 lazy-rules :rules="[val => !!val || this.$t('fp_captions.l_home_phone_number')]">
        </q-input>
        <q-input v-model="bean.homePhone" :placeholder="('fp_captions.l_home_phone_number')"
                 :label="$t('fp_captions.l_home_phone_number')"
                 mask="(##) ### - ## - ##"
                 fill-mask
                 unmasked-value
                 class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-6" dense
                 lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>
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
          class="q-pa-md col-xs-12" dense
        >
          <template v-slot:selected-item="props">
            <div>{{props.opt.name}}</div>
          </template>
        </q-select>
      </div>
    </standart-input-dialog>
  </div>
</template>

<script>
import StandartInputDialog from "components/base/StandartInputDialog";
import StandartTable from "src/mixins/StandartTable";
import {urls} from "src/utils/constants";
import {mapGetters} from "vuex";
export default {
  name: "AttendanceCard",
  components: {StandartInputDialog},
  mixins: [StandartTable],
  props:{
    group_id:{
    }
  },
  data() {
    return {
      apiUrl: urls.STUDENTS,
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
      shape: [] ,
      filter:{
        groupsId:this.group_id,
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
          name: 'fio',
          field: row => row.fio,
          label: this.$t('captions.l_fio'),
          format: val => `${val}`,
          align: 'left',
          classes: 'col-1',
        },
        {
          name: 'selfPhone',
          field: row => row.selfPhone,
          label: this.$t('fp_captions.l_personal_phone_number'),
          format: val => `${val}`,
          align: 'left',
          classes: 'col-1',
        },

        {name: 'actions', align: 'center', label: this.$t('captions.l_actions'), style: "width: 1rem"}
      ],
      data: [],
      beanDefault: {
        id: null,
        fio: null,
        selfPhone: null,
        homePhone: null
      },
      groupsBean: {
        studentsId:null,
        groupsId:null,
      },
      subjects:[],
      groups:[],
      bean: {},
      formDialog: false,
      groupDialog:false,
      editMode: true,
    }
  },
  watch:{
    data:function (val){
      this.selectedRows.splice(0, this.selectedRows.length , val[0])
    },
    group_id:function (val){
      this.filter.groupsId = this.group_id
    },
  },
  methods: {
    ...mapGetters(['getUser']),
    goAttendance() {
      let val = {
        tab: '1'
      }
      this.tab = '1'
      this.$emit('goBack', val);
    },
    nvl(txt, val) {
      if (txt)
        return txt;
      return val;
    },
    handleCheckbox(row) {
      console.log(row)
      // Bitta row dagi checkboxning qiymatini o'zgartirish
      const rowId = row.id
      const checkedStatus = row.fio

      // Barcha checkboxlarni tekshirish
      const allChecked = this.data.every(item => item.id === rowId ? checkedStatus : item.fio)
      console.log('all=>', allChecked)
      // Barcha checkboxlarga birinchi checkboxning qiymatini berish
      this.data.forEach(item => {
        if (item.id === rowId) {
          item.fio = checkedStatus
        } else {
          item.fio = allChecked
        }
      })
    }
  },

  mounted() {}
}
</script>

<style scoped>

</style>
