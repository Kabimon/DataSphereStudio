<template>
  <Drawer
    title="新建/编辑标签"
    :value="_visible"
    @input="$emit('_changeVisible', $event)"
    @on-close="cancelCallBack"
    width="920"
    :styles="styles"
    :inner="true"
    :transfer="false"
    :mask-closable="false"
  >
    <Form
      ref="formRef"
      :rules="ruleValidate"
      :model="formState"
      label-position="top"
    >
      <FormItem label="标签名称" prop="name">
        <Input v-model="formState.name" placeholder="建议为中文名"/>
      </FormItem>
      <FormItem label="英文名" prop="fieldIdentifier">
        <Input v-model="formState.fieldIdentifier" placeholder="英文名"></Input>
      </FormItem>
      <FormItem label="负责人" prop="owner">
        <Input v-model="formState.owner" placeholder="默认为创建用户"></Input>
      </FormItem>
      <FormItem label="可用角色" prop="principalName">
        <Select
          multiple
          :value="(formState.principalName || '').split(',')"
          @input="formState.principalName = $event.join()"
          placeholder="可用角色"
        >
          <Option
            v-for="item in authorityList"
            :value="item.value"
            :key="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="描述" prop="comment">
        <Input type="textarea" v-model="formState.comment" placeholder="描述"/>
      </FormItem>
      <FormItem label="主题域" prop="_warehouseTheme">
        <Select
          v-model="formState._warehouseTheme"
          placeholder="请选择主题域和主题"
        >
          <Option
            v-for="item in themesList"
            :value="`${item.name}|${item.enName}`"
            :key="item.id"
          >
            {{ item.name }}
          </Option>
        </Select>
      </FormItem>
      <h3 style="margin-bottom: 12px"><b>标签词列表</b></h3>
      <FormItem prop="paramMap">
        <Table
          style="margin-bottom: 12px"
          :columns="tokenListColumns"
          :data="formState.paramMap"
        >
          <template slot-scope="{ index }" slot="key">
            <Input
              type="text"
              placeholder="key"
              v-model="formState.paramMap[index].key"
            />
          </template>
          <template slot-scope="{ index }" slot="value">
            <Input
              type="text"
              placeholder="value"
              v-model="formState.paramMap[index].value"
            />
          </template>

          <template slot-scope="{ index }" slot="action">
            <Button type="error" @click="handleDeleteOneToken(index)">
              删除
            </Button>
          </template>
        </Table>
      </FormItem>
      <div style="display: flex; justify-content: flex-end">
        <Button type="primary" @click="handleAddToken()">新增</Button>
      </div>
    </Form>
    <Spin v-if="loading" fix></Spin>
    <div class="drawer-footer">
      <Button
        style="margin-right: 8px"
        type="primary"
        @click="handleOk"
        :disabled="refCount !== 0 && mode === 'edit'"
      >
        确定
      </Button>
      <Button @click="handleCancel">取消</Button>
    </div>
  </Drawer>
</template>

<script>
import {
  updateLabel,
  createLabel,
  getLabelById,
} from "@dataModelCenter/service/api/labels";
import {getThemesList} from "@/apps/dataModelCenter/service/api/common";
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
    },
    // 模式
    mode: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
    },
  },
  emits: ["finish", "_changeVisible"],
  watch: {
    _visible(val) {
      if (val) this.handleGetSubjectDomainList();
      if (val && this.id) this.handleGetById(this.id);
    },
  },
  data() {
    return {
      // 底部样式
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static",
      },
      // 词列表列
      tokenListColumns: [
        {
          title: "KEY",
          key: "key",
          slot: "key",
        },
        {
          title: "VALUE",
          key: "value",
          slot: "value",
        },
        {
          title: "操作",
          slot: "action",
        },
      ],
      // 是否加载中
      loading: false,
      // 主题列表
      themesList: [],
      // 验证规则
      ruleValidate: {
        name: [
          {
            required: true,
            message: "标签名必填",
            trigger: "submit",
          },
          {
            message: "仅支持中文，下划线，数字",
            pattern: /^[0-9_\u4e00-\u9fa5]+$/g,
            trigger: "submit",
          },
        ],
        fieldIdentifier: [
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
      },
      // 表单数据
      formState: {
        name: "",
        fieldIdentifier: "",
        comment: "",
        _warehouseTheme: "",
        paramMap: [],
        owner: this.getUserName(),
        principalName: "",
        isAvailable: 1,
      },
      // 引用次数
      refCount: 0,
      // 角色列表
      authorityList: [
        {
          value: "ALL",
          label: "ALL",
        },
        {
          value: "角色1",
          label: "角色1",
        },
      ],
    };
  },
  methods: {
    /**
     * @description 根据id获取数据
     */
    async handleGetById(id) {
      this.loading = true;
      let {detail} = await getLabelById(id);
      this.loading = false;
      this.formState.name = detail.name;
      this.formState.fieldIdentifier = detail.fieldIdentifier;
      this.formState.comment = detail.comment;
      this.formState.principalName = detail.principalName;
      this.formState.isAvailable = detail.isAvailable;
      this.formState.owner = detail.owner;
      this.formState.paramMap = Object.entries(JSON.parse(detail.params)).map(
        ([key, value]) => ({
          key, value
        })
      );
      this.formState._warehouseTheme = `${detail.warehouseThemeName}|${detail.warehouseThemeNameEn}`;
      this.refCount = detail.refCount;
    },
    /**
     * @description 关掉弹窗动作
     */
    cancelCallBack() {
      this.$refs["formRef"].resetFields();
    },
    /**
     * @description  取消操作
     */
    handleCancel() {
      this.$refs["formRef"].resetFields();
      this.$emit("_changeVisible", false);
    },
    /**
     * @description 获取格式化数据
     */
    handleGetFormatData() {
      let [warehouseThemeName, warehouseThemeNameEn] =
        this.formState._warehouseTheme.split("|");
      return Object.assign({}, this.formState, {
        _warehouseTheme: undefined,
        warehouseThemeName,
        warehouseThemeNameEn,
        paramMap: (() => {
          let map = {};
          for (let i = 0; i < this.formState.paramMap.length; i++) {
            const element = this.formState.paramMap[i];
            map[element.key] = element.value;
          }
          return map;
        })(),
      });
    },
    /**
     * @description 表单提交
     */
    async handleOk() {
      this.$refs["formRef"].validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            if (this.mode === "create") {
              await createLabel(this.handleGetFormatData());
              this.loading = false;
            }
            if (this.mode === "edit") {
              await updateLabel(this.id, this.handleGetFormatData());
              this.loading = false;
            }
            this.$refs["formRef"].resetFields();
            this.$emit("_changeVisible", false);
            this.$emit("finish");
          } catch (error) {
            this.loading = false;
            console.log(error);
          }
        }
      });
    },
    /**
     * @description 删除某个token
     */
    handleDeleteOneToken(index) {
      this.formState.paramMap.splice(index, 1);
    },
    /**
     * @description 添加一个token
     */
    handleAddToken() {
      this.formState.paramMap.push({
        key: "",
        value: ""
      });
    },
    /**
     * @description 获取主题列表
     */
    async handleGetSubjectDomainList() {
      this.loading = true;
      let {list} = await getThemesList();
      this.loading = false;
      this.themesList = list;
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
