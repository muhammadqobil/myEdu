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
<!--          <q-select-->
<!--            v-model="filter.branches"-->
<!--            emit-value-->
<!--            outlined-->
<!--            map-options-->
<!--            :options="data"-->
<!--            option-value="id"-->
<!--            option-label="name"-->
<!--            :label="$t('fp_captions.l_mes')"-->
<!--            stack-label-->
<!--            transition-show="scale"-->
<!--            transition-hide="scale"-->
<!--            class="col-xs-12 col-md-2 col-lg-3 q-pl-md"-->
<!--            dense>-->
<!--            <template v-slot:append>-->
<!--              <q-icon name="close" @click.stop="filter.branches = null"-->
<!--                                                  class="cursor-pointer"/>-->
<!--            </template>-->
<!--            <template v-slot:selected-item="props">-->
<!--              <div>{{ props.opt.name}}</div>-->
<!--            </template>-->

<!--          </q-select>-->
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

      <template v-slot:body-cell-branchesId="props">
        <q-td :props="props">
          <span v-for="role in props.row.roles">{{role.name}}</span>
        </q-td>
      </template>

      <template v-slot:body-cell-branches="props">
        <q-td :props="props">
          {{props.row.branches.name}}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn size="sm" dense color="secondary" icon="edit" @click.stop="rowEdit(props.row)" class="q-mr-xs">
            <q-tooltip content-class="bg-secondary">
              {{$t('system.edit')}}
            </q-tooltip>
          </q-btn>
          <q-btn size="sm" dense color="negative" icon="delete" @click.stop="rowDelete(props.row)" class="q-mr-sm">
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


      <div class="row">
        <q-input v-model="bean.name" :placeholder="$t('captions.l_fio')"
                 :label="$t('captions.l_fio')"
                 class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
                 lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>

        <q-input v-model="bean.login" :placeholder="$t('captions.l_login')"
                 :label="$t('captions.l_login')"
                 class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
                 lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>

        <q-input v-model="bean.password" :placeholder="$t('login.l_password')"
                 :label="$t('login.l_password')"
                 class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
        >
        </q-input>
                  <q-select
                    v-model="bean.roles"
                    outlined
                    map-options
                    :options="roles"
                    option-value="name"
                    option-label="name"
                    :label="$t('fp_captions.l_mes')"
                    stack-label
                    transition-show="scale"
                    transition-hide="scale"
                    class="col-xs-12 col-md-12 col-lg-12 q-pl-md"
                    multiple
                    dense>
                    <template v-slot:append>
                      <q-icon name="close" @click.stop="bean.roles = null"
                                                          class="cursor-pointer"/>
                    </template>
                    <template v-slot:selected-item="props">
                      <div>{{ props.opt.name}}</div>
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
  name: "Users",
  components: {StandartInputDialog},
  mixins: [StandartTable],
  data() {
    return {
      apiUrl: urls.USERS,
      roleUrl:urls.ROLES,
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
      roles:[],
      filter:{
        branches:null
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
          label: this.$t('captions.l_fio'),
          format: val => `${val}`,
          align: 'left',
          classes: 'col-1',
        },
        {
          name: 'login',
          field: row => row.login,
          label: this.$t('captions.l_login'),
          align: 'left',
          classes: 'col-1',
        },
        {
          name: 'branchesId',
          field: row => row.branchesId,
          label: this.$t('Rollari'),
          format: val => `${val}`,
          align: 'left',
        },
        {
          name: 'branches',
          field: row => row.branchesId,
          label: this.$t('Filial'),
          format: val => `${val}`,
          align: 'left',
        },
        {name: 'actions', align: 'center', label: this.$t('captions.l_actions'), style: "width: 1rem"}
      ],
      data: [],
      beanDefault: {
        id: null,
        name: null,
        login: null,
        password: null,
        roles:[]
      },
      bean: {},
      formDialog: false,
      editMode: true,

    }
  },
  watch: {

  },
  computed: {
    curLocale: {
      get() {
        return this.$i18n.locale;
      }
    },

  },
  methods: {
    ...mapGetters(['getUser']),

    getRoles() {
      this.$axios.get(this.roleUrl+this.tableFilterQuery(this.pagination))
        .then(response => {
          this.roles.splice(0, this.roles.length, ...response.data.content);
        }).catch(error => {
        this.showError(error);
      }).finally(() => {
        this.loading = false;
      });
    },
  },
  mounted() {
    this.getRoles()
  },
}
</script>

<style scoped>

</style>
