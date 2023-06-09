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
          <q-input :value="filter.phone" :placeholder="('captions.l_phone')"
                   :label="$t('captions.l_phone')"
                   @change="e => {filter.phone = convertPhoneNumber(e.target.value)}"
                   mask="(##) ### - ## - ##"
                   fill-mask
                   unmasked-value
                   outlined
                   class="q-pa-md col-xs-12 col-sm-3 col-md-3 col-lg-2" dense
                   >
            <template v-slot:append>
              <q-icon v-if="filter.phone != null" name="close" @click.stop="filter.phone = null"
                      class="cursor-pointer"/>
            </template>
          </q-input>
          <q-space/>
          <q-btn-group>
            <q-btn v-if="getRole()==='ROLE_SUPER_ADMIN'" icon="add" class="bg-primary text-white" @click="rowAdd" dense>
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
      <template v-slot:body-cell-fio="props">
        <q-td :props="props">
          <div class="row">
            <div class="col name-column">
              <span> {{$t('captions.l_fio')}} : </span>
              <span class="text-bold">
                {{props.row.fio}}
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col name-column">
              <span> {{$t('fp_captions.l_personal_phone_number')}} : </span>
              <span class="text-bold">
                    {{phone_format(props.row.selfPhone)}}
                  </span>
            </div>
          </div>
          <div class="row">
            <div class="col name-column">
              <span> {{$t('fp_captions.l_home_phone_number')}} : </span>
              <span class="text-bold">
                    {{phone_format(props.row.homePhone)}}
                  </span>
            </div>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-selfPhone="props">
        <q-td :props="props">
          <div class="row">
            <div class="col name-column">
              <span> {{$t('fp_captions.l_subject_name')}} : </span>
              <span class="text-bold">
                {{props.row.subjectsName}}
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col name-column">
              <span> {{$t('captions.l_created_date')}} : </span>
              <span class="text-bold">
                    {{$dateutil.formatDate(props.row.createdDate ,'DD.MM.YYYY')}}
                  </span>
            </div>
          </div>
          <div class="row">
            <div class="col name-column">
              <span> {{$t('O\'quvchi holati')}} : </span>
              <span class="text-bold">
                    <q-chip outline square color="positive" size="sm"><span class="text-subtitle2">{{props.row.studentStatusesName}}</span></q-chip>
                  </span>
            </div>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn v-if="getRole()=='ROLE_SUPER_ADMIN'" size="sm" dense color="positive" icon="mdi-account-group-outline" @click.stop="addGroup(props.row)" class="q-mr-xs">
            <q-tooltip content-class="bg-positive">
              {{$t('Guruhga biriktirish')}}
            </q-tooltip>
          </q-btn>
          <q-btn v-if="getRole()=='ROLE_SUPER_ADMIN'" size="sm" dense color="secondary" icon="mdi-pen" @click.stop="rowEdit(props.row)" class="q-mr-xs">
            <q-tooltip content-class="bg-secondary">
              {{$t('system.edit')}}
            </q-tooltip>
          </q-btn>
          <q-btn v-if="getRole()=='ROLE_SUPER_ADMIN'" size="sm" dense color="negative" icon="mdi-delete-variant" @click.stop="rowDelete(props.row)" class="q-mr-sm">
            <q-tooltip content-class="bg-negative">
              {{$t('system.delete')}}
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
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
    <!--  ADD GROUP DIALOG -->
    <standart-input-dialog v-model="groupDialog" :model-id="bean.id" :on-submit="addGroupToStudent"
                           :on-validation-error="onValidationError">

      <div class="row">
        <q-select
          v-model="groupsBean.groupsId"
          emit-value
          map-options
          :options="groups"
          option-value="id"
          option-label="name"
          :label="$t('fp_captions.l_groups')"
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
  name: "Administration",
  components: {StandartInputDialog},
  mixins: [StandartTable],
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
      filter:{
        forReception:1,
        subjectsId:null,
        phone:null
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
          label: this.$t('O\'quvchi'),
          format: val => `${val}`,
          align: 'left',
          classes: 'col-1',
        },
        {
          name: 'selfPhone',
          field: row => row.selfPhone,
          label: this.$t('Qo\'shimcha ma\'lumotlar'),
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
        homePhone: null,
        subjects_id: null
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
  methods: {
    ...mapGetters(['getUser','getRole']),
    getSubjectAll(){
      this.$axios.get(urls.SUBJECTS + '/all' ).then(response=>{
        this.subjects.splice(0,this.subjects.length , ...response.data.content)
      }).catch((error)=>{
        this.showError(error)
        console.log(error)
      }).finally(()=>{})
    },
    getGroupsAll(){
      this.$axios.get(urls.GROUPS).then(response=>{
        this.groups.splice(0,this.groups.length , ...response.data.content)
      }).catch((error)=>{
        this.showError(error)
        console.log(error)
      }).finally(()=>{})
    },
    /**ADDING GROUP TO STUDENT**/
    addGroup(bean){
      this.groupsBean.studentsId = bean.id;
      this.groupDialog = true;
    },
    addGroupToStudent(){
      this.$axios.post(urls.STUDENTS + '/add-group', this.groupsBean).then(response => {
        this.refreshTable();
        this.groupDialog = false;
        this.showInfo(this.$t('fp_captions.l_upload_successfully'));
      }).catch(err => {
        this.showError(err);
      })
    }
  },

  mounted() {
    this.getSubjectAll()
    this.getGroupsAll()
  }
}
</script>

<style scoped>

</style>
