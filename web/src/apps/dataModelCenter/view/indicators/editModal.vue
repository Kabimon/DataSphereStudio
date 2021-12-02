<template>
  <Drawer
    title="新建/编辑指标"
    :value="_visible"
    @input="$emit('_changeVisible', $event)"
    width="920"
    :styles="styles"
    @on-close="cancelCallBack"
    :inner="true"
    :transfer="false"
    :mask-closable="false"
  >
    <Form
      ref="formRef"
      :model="formState"
      :rules="ruleValidate"
      label-position="left"
      :label-width="120"
    >
      <div v-if="_visible">
        <h2 class="form-block-title">基本信息</h2>
        <FormItem label="名称" prop="name">
          <Input v-model="formState.name" placeholder="指标名"></Input>
        </FormItem>
        <FormItem label="字段标识" prop="fieldIdentifier">
          <Input v-model="formState.fieldIdentifier" placeholder="字段标识">
          </Input>
        </FormItem>
        <FormItem label="负责人" prop="owner">
          <Input v-model="formState.owner" placeholder="负责人"></Input>
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
        <FormItem label="是否核心指标" prop="isCoreIndicator">
          <i-switch
            :value="Boolean(formState.isCoreIndicator)"
            @input="formState.isCoreIndicator = Number($event)"
          >
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="描述" prop="comment">
          <Input type="textarea" v-model="formState.comment" placeholder="描述">
          </Input>
        </FormItem>
        <h2 class="form-block-title">作用范围</h2>
        <FormItem label="主题域" prop="_themeArea">
          <SelectPage
            v-model="formState._themeArea"
            placeholder="主题域"
            :fetch="handleGetThemesList"
          />
        </FormItem>
        <FormItem label="分层" prop="_layerArea">
          <SelectPage
            v-model="formState._layerArea"
            placeholder="分层"
            :fetch="handleGetLayersList"
          />
        </FormItem>
        <h2 class="form-block-title">指标内容</h2>
        <FormItem label="指标类型" prop="content.indicatorType">
          <RadioGroup v-model="formState.content.indicatorType">
            <Radio :label="0">原子指标</Radio>
            <Radio :label="1">衍生指标</Radio>
            <Radio :label="2">派生指标</Radio>
            <Radio :label="3">复杂指标</Radio>
            <Radio :label="4">自定义指标</Radio>
          </RadioGroup>
        </FormItem>
        <!-- 原子指标 -->
        <Row v-if="formState.content.indicatorType === 0" key="yzzb">
          <Col :span="24">
            <FormItem label="关联度量" prop="_sourceInfo.info_0.measure">
              <SelectPage
                v-model="formState._sourceInfo.info_0.measure"
                searchMode
                placeholder="请选择度量"
                :fetch="handleGetMeasures"
              />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="计算公式" prop="_sourceInfo.info_0.formula">
              <Input
                v-model="formState._sourceInfo.info_0.formula"
                placeholder="请输入计算公式，如：sum(度量名)"
              >
              </Input>
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="指定维度" prop="_sourceInfo.info_0.dimension">
              <SelectPage
                searchMode
                multiple
                :value="
                  (formState._sourceInfo.info_0.dimension || '').split(',')
                "
                @input="formState._sourceInfo.info_0.dimension = $event.join()"
                placeholder="请选择一个或多个维度"
                :fetch="handleGetDimensions"
              />
            </FormItem>
          </Col>
        </Row>
        <!-- 衍生指标 -->
        <Row v-if="formState.content.indicatorType === 1" key="yszb">
          <Col :span="24">
            <FormItem
              label="依赖的原子指标"
              prop="_sourceInfo.info_1.indicatorName"
            >
              <SelectPage
                searchMode
                multiple
                :value="
                  (formState._sourceInfo.info_1.indicatorName || '').split(',')
                "
                @input="
                  formState._sourceInfo.info_1.indicatorName = $event.join()
                "
                placeholder="请选择一个或多个原子指标"
                :fetch="handleGetIndicatorsTypeOne"
              />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="计算公式" prop="_sourceInfo.info_1.formula">
              <Input
                v-model="formState._sourceInfo.info_1.formula"
                placeholder="计算公式，如：原子指标1/原子指标2"
              >
              </Input>
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="指定维度" prop="_sourceInfo.info_1.dimension">
              <SelectPage
                searchMode
                multiple
                :value="
                  (formState._sourceInfo.info_1.dimension || '').split(',')
                "
                @input="formState._sourceInfo.info_1.dimension = $event.join()"
                placeholder="请选择一个或多个维度"
                :fetch="handleGetDimensions"
              />
            </FormItem>
          </Col>
        </Row>
        <!-- 派生指标 -->
        <Row v-if="formState.content.indicatorType === 2" key="pszb">
          <Col :span="24">
            <FormItem
              label="依赖的指标"
              prop="_sourceInfo.info_2.indicatorName"
            >
              <SelectPage
                v-model="formState._sourceInfo.info_2.indicatorName"
                searchMode
                placeholder="请选择指标"
                :fetch="handleGetIndicators"
              />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="时间周期" prop="_sourceInfo.info_2.cycle">
              <SelectPage
                v-model="formState._sourceInfo.info_2.cycle"
                placeholder="时间周期"
                :fetch="handleGetCyclesList"
              />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="修饰词" prop="_sourceInfo.info_2.modifier">
              <SelectPage
                multiple
                :value="
                  (formState._sourceInfo.info_2.modifier || '').split(',')
                "
                @input="formState._sourceInfo.info_2.modifier = $event.join()"
                placeholder="请选择一个或多个修饰词"
                :fetch="handleGetModifiersList"
              />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="指定维度" prop="_sourceInfo.info_2.dimension">
              <SelectPage
                searchMode
                multiple
                :value="
                  (formState._sourceInfo.info_2.dimension || '').split(',')
                "
                @input="formState._sourceInfo.info_2.dimension = $event.join()"
                placeholder="请选择一个或多个维度"
                :fetch="handleGetDimensions"
              />
            </FormItem>
          </Col>
        </Row>
        <!-- 复杂指标 -->
        <Row v-if="formState.content.indicatorType === 3" key="fzzb">
          <Col :span="24">
            <FormItem
              label="依赖的指标"
              prop="_sourceInfo.info_3.indicatorName"
            >
              <SelectPage
                multiple
                searchMode
                :value="
                  (formState._sourceInfo.info_3.indicatorName || '').split(',')
                "
                @input="
                  formState._sourceInfo.info_3.indicatorName = $event.join()
                "
                placeholder="请选择一个或多个指标"
                :fetch="handleGetIndicators"
              />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="修饰词" prop="_sourceInfo.info_3.modifier">
              <SelectPage
                multiple
                :value="
                  (formState._sourceInfo.info_3.modifier || '').split(',')
                "
                @input="formState._sourceInfo.info_3.modifier = $event.join()"
                placeholder="修饰词"
                :fetch="handleGetModifiersList"
              />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="计算公式" prop="_sourceInfo.info_3.formula">
              <Input
                type="textarea"
                v-model="formState._sourceInfo.info_3.formula"
                placeholder="请输入计算公式，如：指标1-指标2"
              ></Input>
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="指定维度" prop="_sourceInfo.info_3.dimension">
              <SelectPage
                searchMode
                multiple
                :value="
                  (formState._sourceInfo.info_3.dimension || '').split(',')
                "
                @input="formState._sourceInfo.info_3.dimension = $event.join()"
                placeholder="请选择一个或多个维度"
                :fetch="handleGetDimensions"
              />
            </FormItem>
          </Col>
        </Row>
        <!-- 自定义指标 -->
        <Row v-if="formState.content.indicatorType === 4" key="zdyzb">
          <Col :span="24">
            <FormItem label="计算公式" prop="_sourceInfo.info_4.formula">
              <Input
                type="textarea"
                v-model="formState._sourceInfo.info_4.formula"
                placeholder="请输入计算公式，如：sum(字段名)"
              ></Input>
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="指定维度" prop="_sourceInfo.info_4.dimension">
              <SelectPage
                searchMode
                multiple
                :value="
                  (formState._sourceInfo.info_4.dimension || '').split(',')
                "
                @input="formState._sourceInfo.info_4.dimension = $event.join()"
                placeholder="请选择一个或多个维度"
                :fetch="handleGetDimensions"
              />
            </FormItem>
          </Col>
        </Row>
        <h2 class="form-block-title">口径定义</h2>
        <FormItem label="业务口径" prop="content.business">
          <Input v-model="formState.content.business" placeholder="业务口径">
          </Input>
        </FormItem>
        <FormItem label="业务负责人" prop="content.businessOwner">
          <Input
            v-model="formState.content.businessOwner"
            placeholder="业务负责人"
          >
          </Input>
        </FormItem>
        <FormItem label="技术口径" prop="content.calculation">
          <Input v-model="formState.content.calculation" placeholder="技术口径">
          </Input>
        </FormItem>
        <FormItem label="技术负责人" prop="content.calculationOwner">
          <Input
            v-model="formState.content.calculationOwner"
            placeholder="技术负责人"
          >
          </Input>
        </FormItem>
      </div>
    </Form>
    <Spin v-if="loading" fix></Spin>
    <div class="drawer-footer">
      <Button
        style="margin-right: 8px"
        type="primary"
        v-if="mode === 'edit'"
        @click="handleAddVersion"
        :disabled="mode === 'edit' && refCount !== 0"
      >
        新增版本
      </Button>
      <Button
        style="margin-right: 8px"
        type="primary"
        @click="handleOk"
        :disabled="mode === 'edit' && refCount !== 0"
      >
        确定
      </Button>
      <Button @click="handleCancel">取消</Button>
    </div>
  </Drawer>
</template>

<script>
import {
  getThemesList,
  getCyclesList,
  getModifiersList,
  getLayersList,
} from "@/apps/dataModelCenter/service/api/common";
import { getMeasures } from "@/apps/dataModelCenter/service/api/measures";
import { getDimensions } from "@/apps/dataModelCenter/service/api/dimensions";
import {
  getIndicators,
  createIndicators,
  editIndicators,
  getIndicatorsById,
  buildIndicatorsVersion,
} from "@/apps/dataModelCenter/service/api/indicators";
import SelectPage from "@dataModelCenter/components/selectPage";
import mixin from "@/common/service/mixin";
import { extend } from "@/common/util/object";

let sourceInfoMap = {
  0: { measure: "", formula: "", dimension: "" },
  1: { indicatorName: "", formula: "", dimension: "" },
  2: { indicatorName: "", cycle: "", modifier: "", dimension: "" },
  3: { indicatorName: "", formula: "", modifier: "", dimension: "" },
  4: { formula: "", dimension: "" },
};
export default {
  components: { SelectPage },
  model: {
    prop: "_visible",
    event: "_changeVisible",
  },
  props: {
    _visible: {
      type: Boolean,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
    },
  },
  mixins: [mixin],
  emits: ["finish", "_changeVisible"],
  watch: {
    _visible(val) {
      if (val && this.id) this.handleGetById(this.id);
    },
  },
  data() {
    return {
      // 是否加载中
      loading: false,
      // 表单数据
      formState: {
        name: "",
        fieldIdentifier: "",
        comment: "",
        owner: this.getUserName(),
        principalName: "ALL",
        isCoreIndicator: 0,
        isAvailable: 1,
        // 主题域 名字|英文名
        _themeArea: "",
        // themeArea
        // themeAreaEn
        // 分层 名字|英文名
        _layerArea: "",
        // layerArea
        // layerAreaEn
        content: {
          indicatorType: 0,
          sourceInfo: {},
          //
          formula: "formula",
          business: "",
          businessOwner: "",
          calculation: "",
          calculationOwner: "",
        },
        _sourceInfo: {
          info_0: Object.assign({}, sourceInfoMap[0]),
          info_1: Object.assign({}, sourceInfoMap[1]),
          info_2: Object.assign({}, sourceInfoMap[2]),
          info_3: Object.assign({}, sourceInfoMap[3]),
          info_4: Object.assign({}, sourceInfoMap[4]),
        },
      },
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
        fieldIdentifier: [
          {
            required: true,
            message: "标识符必填",
            trigger: "submit",
          },
          {
            message: "仅支持英文，下划线，数字",
            pattern: /^[a-zA-Z0-9_]+$/g,
            trigger: "submit",
          },
        ],
        _warehouseTheme: [
          {
            required: true,
            message: "主题域必选",
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
        "content.business": [
          {
            required: true,
            message: "业务口径必填",
            trigger: "submit",
          },
        ],
        "content.businessOwner": [
          {
            required: true,
            message: "业务口径负责人必填",
            trigger: "submit",
          },
        ],
        "_sourceInfo.info_0.measure": [
          {
            required: true,
            message: "关联度量必选",
            trigger: "submit",
          },
        ],
        "_sourceInfo.info_0.formula": [
          {
            required: true,
            message: "计算公式必填",
            trigger: "submit",
          },
        ],
        "_sourceInfo.info_1.indicatorName": [
          {
            required: true,
            message: "原子指标必选",
            trigger: "submit",
          },
        ],
        "_sourceInfo.info_1.formula": [
          {
            required: true,
            message: "计算公式必填",
            trigger: "submit",
          },
        ],
        "_sourceInfo.info_2.indicatorName": [
          {
            required: true,
            message: "指标必选",
            trigger: "submit",
          },
        ],
        "_sourceInfo.info_2.cycle": [
          {
            required: true,
            message: "时间周期必选",
            trigger: "submit",
          },
        ],
        "_sourceInfo.info_2.modifier": [
          {
            required: true,
            message: "修饰词必选",
            trigger: "submit",
          },
        ],
        "_sourceInfo.info_3.indicatorName": [
          {
            required: true,
            message: "指标必选",
            trigger: "submit",
          },
        ],
        "_sourceInfo.info_3.modifier": [
          {
            required: true,
            message: "修饰词必选",
            trigger: "submit",
          },
        ],
        "_sourceInfo.info_3.formula": [
          {
            required: true,
            message: "计算公式必填",
            trigger: "submit",
          },
        ],
        "_sourceInfo.info_4.formula": [
          {
            required: true,
            message: "计算公式必填",
            trigger: "submit",
          },
        ],
      },
      // 底部样式
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static",
      },
      // 角色列表
      authorityList: [
        {
          value: "ALL",
          label: "ALL",
        },
      ],
      // 引用次数
      refCount: 0
    };
  },
  methods: {
    // 获取维度列表
    handleGetDimensions(name) {
      return getDimensions({
        name: name,
        pageNum: 1,
        pageSize: 30,
        isAvailable: 1,
      }).then((res) => {
        return {
          list: res.list.map((item) => ({
            label: item.name,
            value: item.name,
          })),
        };
      });
    },
    // 获取度量列表
    handleGetMeasures(name) {
      return getMeasures({
        name: name,
        pageNum: 1,
        pageSize: 30,
        isAvailable: 1,
      }).then((res) => {
        return {
          list: res.list.map((item) => ({
            label: item.name,
            value: item.name,
          })),
        };
      });
    },
    // 获取指标列表
    handleGetIndicators(name) {
      return getIndicators({
        name: name,
        pageNum: 1,
        pageSize: 30,
        isAvailable: 1,
      }).then((res) => {
        return {
          list: res.list.map((item) => ({
            label: item.name,
            value: item.name,
          })),
        };
      });
    },
    // 获取原子指标列表
    handleGetIndicatorsTypeOne(name) {
      return getIndicators({
        name: name,
        pageNum: 1,
        pageSize: 30,
        isAvailable: 1,
        indicatorType: 0,
      }).then((res) => {
        return {
          list: res.list.map((item) => ({
            label: item.name,
            value: item.name,
          })),
        };
      });
    },
    // 获取修饰词列表
    handleGetModifiersList() {
      return getModifiersList().then((res) => {
        return {
          list: res.list.map((item) => ({
            label: item.modifierType,
            value: item.modifierType,
          })),
        };
      });
    },
    // 获取分层列表
    handleGetLayersList() {
      return getLayersList().then((res) => {
        return {
          list: res.list.map((item) => ({
            label: item.name,
            value: `${item.name}|${item.enName}`,
          })),
        };
      });
    },
    // 获取主题列表
    handleGetThemesList() {
      return getThemesList().then((res) => {
        return {
          list: res.list.map((item) => ({
            label: item.name,
            value: `${item.name}|${item.enName}`,
          })),
        };
      });
    },
    // 获取周期列表
    handleGetCyclesList() {
      return getCyclesList().then((res) => {
        return {
          list: res.list.map((item) => ({
            label: item.name,
            value: item.name,
          })),
        };
      });
    },
    // 根据id获取数据
    async handleGetById(id) {
      this.loading = true;
      let { detail } = await getIndicatorsById(id);
      this.loading = false;
      detail.content.indicatorSourceInfo = JSON.parse(
        detail.content.indicatorSourceInfo
      );
      let newFormState = {
        name: detail.name,
        fieldIdentifier: detail.fieldIdentifier,
        comment: detail.comment,
        _warehouseTheme: `${detail.warehouseThemeName}|${detail.warehouseThemeNameEn}`,
        owner: detail.owner,
        principalName: detail.principalName,
        isCoreIndicator: detail.isCoreIndicator,
        isAvailable: detail.isAvailable,
        _themeArea: `${detail.themeArea}|${detail.themeAreaEn}`,
        _layerArea: `${detail.layerArea}|${detail.layerAreaEn}`,
        content: {
          indicatorType: detail.content.indicatorType,
          sourceInfo: {},
          //
          formula: "formula",
          business: detail.content.business,
          businessOwner: detail.content.businessOwner,
          calculation: detail.content.calculation,
          calculationOwner: detail.content.calculationOwner,
        },
        _sourceInfo: {
          info_0: Object.assign({}, sourceInfoMap[0]),
          info_1: Object.assign({}, sourceInfoMap[1]),
          info_2: Object.assign({}, sourceInfoMap[2]),
          info_3: Object.assign({}, sourceInfoMap[3]),
          info_4: Object.assign({}, sourceInfoMap[4]),
        },
      };
      extend(
        newFormState._sourceInfo[`info_${detail.content.indicatorType}`],
        detail.content.indicatorSourceInfo
      );
      this.formState = newFormState;
      this.refCount = detail.refCount;
    },
    cancelCallBack() {
      this.$refs["formRef"].resetFields();
    },
    handleCancel() {
      this.$refs["formRef"].resetFields();
      this.$emit("_changeVisible", false);
    },
    // 新增版本
    async handleAddVersion() {
      this.$refs["formRef"].validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            await buildIndicatorsVersion(this.id, this.formatFormState());
            this.loading = false;
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
    // 格式化form中的数据，
    formatFormState() {
      let [themeArea, themeAreaEn] = this.formState._themeArea.split("|");
      let [layerArea, layerAreaEn] = this.formState._layerArea.split("|");
      let [warehouseThemeName, warehouseThemeNameEn] =
        this.formState._warehouseTheme.split("|");
      let key = `info_${this.formState.content.indicatorType}`;
      this.formState.content.sourceInfo = this.formState._sourceInfo[key];
      return Object.assign({}, this.formState, {
        _sourceInfo: undefined,
        _themeArea: undefined,
        _layerArea: undefined,
        _warehouseTheme: undefined,
        warehouseThemeName,
        warehouseThemeNameEn,
        themeArea,
        layerArea,
        themeAreaEn,
        layerAreaEn,
      });
    },
    // 表单确定
    async handleOk() {
      this.$refs["formRef"].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let data = this.formatFormState();
          try {
            if (this.mode === "create") {
              await createIndicators(data);
              this.loading = false;
            }
            if (this.mode === "edit") {
              await editIndicators(this.id, data);
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
.form-block-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}
</style>
