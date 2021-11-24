<template>
  <Drawer
    title="新建/编辑主题域"
    :value="_visible"
    @input="$emit('_changeVisible', $event)"
    @on-close="cancelCallBack"
    width="920"
    :styles="styles"
    :inner="true"
    :transfer="false"
  >
    <Form
      ref="formRef"
      :rules="ruleValidate"
      :model="formState"
      label-position="top"
    >
      <FormItem label="名称" prop="name">
        <Input v-model="formState.name" placeholder="名称"></Input>
      </FormItem>
      <FormItem label="英文名" prop="enName">
        <Input v-model="formState.enName" placeholder="英文名"></Input>
      </FormItem>
      <FormItem label="负责人" prop="owner">
        <Input v-model="formState.owner" placeholder="负责人"></Input>
      </FormItem>
      <FormItem label="排序" prop="order">
        <Input
          v-model="formState.order"
          type="number"
          placeholder="排序"
        ></Input>
      </FormItem>
      <FormItem label="可用角色" prop="principalName">
        <Select
          multiple
          :value="(formState.principalName || '').split(',')"
          @input="formState.principalName = $event.join()"
          placeholder="可用角色"
        >
          <Option
            v-for="item in principalNameList"
            :value="item.value"
            :key="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="可用库" prop="databases">
        <Select
          multiple
          placeholder="可用库"
          :value="(formState.databases || '').split(',')"
          @input="formState.databases = $event.join()"
        >
          <Option
            v-for="item in dataBasesList"
            :value="item.value"
            :key="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="描述" prop="description">
        <Input
          type="textarea"
          v-model="formState.description"
          placeholder="描述"
        ></Input>
      </FormItem>
    </Form>
    <Spin v-if="loading" fix></Spin>
    <div class="drawer-footer">
      <Button
        style="margin-right: 8px"
        type="primary"
        @click="handleOk"
        :disabled="referenced && mode === 'edit'"
      >
        确定
      </Button>
      <Button @click="handleCancel">取消</Button>
    </div>
  </Drawer>
</template>

<script>
import {
  createLayersCustom,
  getLayersById,
  editLayersCustom,
} from "@dataWarehouseDesign/service/api";
import mixin from "@/common/service/mixin";

export default {
  model: {
    prop: "_visible",
    event: "_changeVisible",
  },
  mixins: [mixin],
  props: {
    // 是否可见
    _visible: {
      type: Boolean,
      required: true,
    },
    // 模式
    mode: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
    },
    type: {
      type: Number,
    },
  },
  emits: ["finish", "_changeVisible"],
  watch: {
    _visible(val) {
      if (val && this.id) this.handleGetById(this.id);
    },
  },
  data() {
    return {
      // 表单数据
      formState: {
        name: "",
        enName: "",
        owner: this.getUserName(),
        principalName: "ALL",
        databases: "",
        description: "",
        order: 0,
      },
      // 是否有引用
      referenced: false,
      // 验证规则
      ruleValidate: {
        name: [
          {
            required: true,
            message: "名称必填",
            trigger: "submit",
          },
          {
            message: "仅支持中文，下划线，数字",
            pattern: /^[0-9_\u4e00-\u9fa5]+$/g,
            trigger: "submit",
          },
        ],
        enName: [
          {
            required: true,
            message: "英文名必填",
            trigger: "submit",
          },
          {
            message: "仅支持英文，下划线，数字",
            pattern: /^[a-zA-Z0-9_]+$/g,
            trigger: "submit",
          },
        ],
        owner: [
          {
            required: true,
            message: "负责人必填",
            trigger: "submit",
          },
        ],
      },
      // 是否加载中
      loading: false,
      // 库列表
      dataBasesList: [
        {
          value: "New York",
          label: "New York",
        },
        {
          value: "London",
          label: "London",
        },
      ],
      principalNameList: [
        {
          value: "ALL",
          label: "ALL",
        },
        {
          value: "New York",
          label: "New York",
        },
        {
          value: "London",
          label: "London",
        },
      ],
      // 底部样式
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static",
      },
    };
  },
  methods: {
    // 根据id获取数据
    async handleGetById(id) {
      this.loading = true;
      let { item } = await getLayersById(id);
      this.loading = false;
      this.formState.name = item.name;
      this.formState.owner = item.owner;
      this.formState.enName = item.enName;
      this.formState.principalName = item.principalName;
      this.formState.databases = item.dbs;
      this.formState.description = item.description;
      this.formState.order = item.sort;
      this.referenced = item.referenced;
    },
    // 弹框取消回调
    cancelCallBack() {
      this.$refs["formRef"].resetFields();
    },
    // 处理取消按钮
    handleCancel() {
      this.$refs["formRef"].resetFields();
      this.$emit("_changeVisible", false);
    },
    // 获取表单提交数据
    handlegetFormatData() {
      return Object.assign({}, this.formState, {});
    },
    // 处理表单完成
    async handleOk() {
      this.$refs["formRef"].validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            if (this.mode === "create") {
              await createLayersCustom(this.handlegetFormatData());
              this.loading = false;
            }
            if (this.mode === "edit") {
              await editLayersCustom(this.id, this.handlegetFormatData());
              this.loading = false;
            }
            this.$refs["formRef"].resetFields();
            this.$emit("_changeVisible", false);
            this.$emit("finish", this.type);
          } catch (error) {
            this.loading = false;
            console.log(error);
          }
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: left;
  background: #fff;
}
</style>
