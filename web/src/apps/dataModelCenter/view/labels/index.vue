<template>
  <div class="page-content">
    <div class="top-line">
      <div style="display: flex">
        <Select
          v-model="searchParams.isAvailable"
          placeholder="状态"
          style="width: 100px"
          clearable
        >
          <Option :value="1"> 启用</Option>
          <Option :value="0"> 禁用</Option>
        </Select>
        <Select
          v-model="searchParams.warehouseThemeName"
          style="width: 100px"
          placeholder="请选择主题"
        >
          <Option v-for="item in themesList" :value="item.name" :key="item.id">
            {{ item.name }}
          </Option>
        </Select>
        <Input
          search
          v-model="searchParams.name"
          enter-button
          placeholder="输入名称搜索"
          style="width: 300px"
          @on-search="handleSearch"
        />
      </div>
      <Button type="primary" icon="md-add" @click="handleCreate">
        新增修饰词
      </Button>
    </div>
    <Table
      :columns="columns"
      :data="dataList"
      :loading="loading"
      style="margin-bottom: 16px"
    >
      <template slot-scope="{ row }" slot="isAvailable">
        {{ row.isAvailable ? "启用" : "禁用" }}
      </template>
      <template slot-scope="{ row }" slot="createTime">
        {{ row.createTime | formatDate }}
      </template>
      <template slot-scope="{ row }" slot="updateTime">
        {{ row.updateTime | formatDate }}
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button
          size="small"
          @click="handleEdit(row.id)"
          :disabled="!row.isAvailable"
          style="margin-right: 5px"
        >
          编辑
        </Button>
        <Button
          size="small"
          @click="handleDisable(row.id)"
          style="margin-right: 5px"
          v-if="row.isAvailable"
        >
          禁用
        </Button>
        <Button
          type="primary"
          size="small"
          @click="handleEnable(row.id)"
          style="margin-right: 5px"
          v-else
        >
          启用
        </Button>
        <Button
          type="error"
          size="small"
          :disabled="!!row.refCount"
          @click="handleDelete(row.id)"
        >
          删除
        </Button>
      </template>
    </Table>
    <div class="page-line">
      <Page
        :total="pageCfg.total"
        :current.sync="pageCfg.page"
        :page-size="pageCfg.pageSize"
      />
    </div>
    <EditModal
      v-model="modalCfg.visible"
      :id="modalCfg.id"
      :mode="modalCfg.mode"
      @finish="handleModalFinish"
    />
  </div>
</template>

<script>
import {
  getLabelList,
  delLabel,
  switcLabelStatus,
} from "@dataModelCenter/service/api/labels";
import {getThemesList} from "@/apps/dataModelCenter/service/api/common";
import formatDate from "@dataModelCenter/utils/formatDate";
import EditModal from "./editModal.vue";

export default {
  filters: {formatDate},
  components: {EditModal},
  methods: {
    // 弹框回调
    handleModalFinish() {
      this.handleGetData(true);
    },
    // 创建操作
    handleCreate() {
      this.modalCfg = {
        visible: true,
        mode: "create",
      };
    },
    // 删除操作
    handleDelete(id) {
      this.$Modal.confirm({
        title: "警告",
        content: "确定删除此项吗？",
        onOk: async () => {
          this.loading = true;
          await delLabel(id).catch(() => {
          });
          this.loading = false;
          this.handleGetData(true);
        },
      });
    },
    // 编辑操作
    handleEdit(id) {
      this.modalCfg = {
        visible: true,
        mode: "edit",
        id: id,
      };
    },
    // 启用
    async handleEnable(id) {
      this.loading = true;
      await switcLabelStatus(id, 1);
      this.loading = false;
      this.handleGetData(true);
    },
    // 禁用
    async handleDisable(id) {
      this.loading = true;
      await switcLabelStatus(id, 0);
      this.loading = false;
      this.handleGetData(true);
    },
    // 搜索
    handleSearch() {
      this.handleGetData();
    },
    // 获取数据
    async handleGetData(changePage = false) {
      if (changePage === false && this.pageCfg.page !== 1) {
        return (this.pageCfg.page = 1);
      }
      this.loading = true;
      let {list, total} = await getLabelList({
        page: this.pageCfg.page,
        size: this.pageCfg.pageSize,
        name: this.searchParams.name,
        isAvailable: this.searchParams.isAvailable,
        warehouseThemeName: this.searchParams.warehouseThemeName,
      });
      this.loading = false;
      this.dataList = list;
      this.pageCfg.total = total;
    },
    async handleGetSubjectDomainList() {
      this.loading = true;
      let {list} = await getThemesList();
      this.loading = false;
      this.themesList = list;
    },
  },
  mounted() {
    this.handleGetSubjectDomainList();
    this.handleGetData(true);
  },
  watch: {
    "pageCfg.page"() {
      this.handleGetData(true);
    },
  },
  data() {
    return {
      // 搜索参数
      searchParams: {
        name: "",
        warehouseThemeName: "",
        isAvailable: undefined,
      },
      // 主题列表
      themesList: [],
      // 表格列
      columns: [
        {
          title: "标签名",
          key: "name",
        },
        {
          title: "英文名",
          key: "fieldIdentifier",
        },
        {
          title: "主题",
          key: "warehouseThemeName",
        },
        {
          title: "状态",
          key: "isAvailable",
          slot: "isAvailable",
        },
        {
          title: "引用次数",
          key: "refCount",
        },
        {
          title: "描述",
          key: "comment",
          ellipsis: true,
        },
        {
          title: "创建时间",
          key: "createTime",
          slot: "createTime",
        },
        {
          title: "更新时间",
          key: "updateTime",
          slot: "updateTime",
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 60,
        },
      ],
      // 数据列表
      dataList: [],
      // 弹窗参数
      modalCfg: {
        mode: "",
        id: NaN,
        visible: false,
      },
      // 是否加载中
      loading: false,
      // 分页配置
      pageCfg: {
        page: 1,
        pageSize: 10,
        total: 10,
      },
    };
  },
};
</script>


<style lang="scss" scoped>
@import "../../assets/styles/common.scss";

.top-line {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
}

.page-line {
  display: flex;
  justify-content: flex-end;
}
</style>
