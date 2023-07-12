<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
      color="secondary"
      bordered
      separator="cell"
      :no-data-label="noDataText()"
      :rows-per-page-label="perPageText()"
      :pagination-label="paginationText"
      :selected-rows-label="selectedRowsText"
      @row-click="singleRowClick"
      :hide-pagination="true"
      class="table-row-bg-style"
      style="height: calc(100vh - 192px); overflow-y: auto"

    >
      <template v-slot:no-data="props">
        {{$t('system.no_matching_found')}}
      </template>
      <template v-slot:top="props">
        <div class="fit row items-center">
          <q-space/>
          <q-btn-group>
            <q-btn :loading="loading" size="md" dense color="primary" icon="mdi-reload" @click.stop="refreshTable(true)">
              <q-tooltip content-class="bg-primary">
                {{ $t('fp_captions.l_reload') }}
              </q-tooltip>
            </q-btn>
          </q-btn-group>

        </div>
      </template>
      <template v-slot:header>
        <q-tr style="background: #F2F4F6">
          <q-th style="width: 10px">№</q-th>
          <q-th style="width: 200px;">{{$t('Guruhlar')}}</q-th>
          <q-th style="width: 80px;">{{$t('Jami')}}</q-th>
          <q-th style="width: 80px;">{{$t('Davomat')}}</q-th>
          <q-th style="width: 80px;">{{$t('kelmaganlar')}}</q-th>
        </q-tr>
      </template>
      <template v-slot:body-cell-name="props">
        <q-td style="width: 260px !important;" v-if="props.row.id">
          <a class="text-weight-bold color-positive"> {{props.row.name}}
            <q-tooltip>
              {{props.row.name}}
            </q-tooltip>
          </a>
        </q-td>
        <q-td v-if="!props.row.id">
          <template>
            <span class="text-bold">{{ $t('fp_captions.l_all') }}</span>
          </template>
        </q-td>
      </template>
    </q-table>

    <!--DIALOG-->
    <standart-input-dialog v-model="formDialog" :model-id="bean.id" :on-submit="onSubmit"
                           :on-validation-error="onValidationError">


      <div class="row">
        <q-input v-model="bean.name" :placeholder="$t('captions.l_name')"
                 :label="$t('captions.l_name')"
                 class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
                 lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>
        <q-input v-model="bean.phone" :placeholder="$t('captions.l_phone')"
                 :label="$t('captions.l_phone')"
                 mask="(##) ### - ## - ##"
                 fill-mask
                 unmasked-value
                 class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
                 lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>

        <q-input v-model="bean.address" :placeholder="$t('captions.l_description')"
                 :label="$t('captions.l_description')"
                 class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
        >
          <template v-slot:prepend="props">
            <q-icon name="mdi-text" color="secondary"/>
          </template>
        </q-input>
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
  name: "AttendanceReports",
  components: {StandartInputDialog},
  mixins: [StandartTable],
  data() {
    return {
      apiUrl: urls.ATTENDANCE_REPORTS,
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
        level:1,
        type:1,
        dateFrom:this.$dateutil.formatDate(new Date((new Date()).getFullYear(), (new Date()).getMonth() , 1), 'YYYY-MM-DD'),
        dateTo:this.$dateutil.formatDate((new Date()).getTime(), 'YYYY-MM-DD')
      },
      columns: [
        {
          name: 'id',
          field: 'id'
        },
        {
          name: 'name',
          field: row => row.name,
        },
        {
          name: 'allCnt',
          field: row => row.allCnt,
        },
        {
          name: 'attendedCnt',
          field: row => row.attendedCnt,
        },
        {
          name: 'notAttendedCnt',
          field: row => row.notAttendedCnt,
        },
      ],
      data: [],
      beanDefault: {
        id: null,
        name: null,
        phone: null,
        address: null
      },
      bean: {},
      formDialog: false,
      editMode: true,

    }
  },
  watch: {
    curLocale: function (val) {

    },
  },
  computed: {
    curLocale: {
      get() {
        return this.$i18n.locale;
      }
    },

  },
  methods: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style scoped>

</style>
