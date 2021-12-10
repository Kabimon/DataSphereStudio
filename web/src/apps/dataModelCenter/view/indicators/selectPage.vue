<template>
  <Select
    :value="formatValue"
    @input="handleChangeVal"
    :loading="loading"
    :placeholder="placeholder"
    :multiple="multiple"
    :filterable="searchMode"
    :remote="searchMode"
    :remote-method="handleGetData"
    v-if="update"
  >
    <Option
      ref="optionRef"
      v-for="(item, index) in dataList"
      :value="item.value"
      :label="item.label"
      :key="index"
    >
    </Option>
  </Select>
</template>

<script>
export default {
  props: {
    // value
    value: {},
    // 是否多选
    multiple: {
      type: Boolean,
      default: () => false,
    },
    // 请求方法
    fetch: {
      type: Function,
      require: true,
    },
    // 是否远程搜索
    searchMode: {
      type: Boolean,
    },
    // 提示
    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      dataList: [],
      loading: false,
      update: true,
    };
  },
  mounted() {
    if (!!this.searchMode === false) {
      this.handleGetData();
    }
  },
  computed: {
    formatValue() {
      if (this.value === void 0) return void 0;
      let valueArr = this.value.split(",");
      if (valueArr.length > 1) {
        this.fileDataList(valueArr);
        return valueArr;
      } else if (valueArr.length === 1) {
        if (valueArr[0] === "" || valueArr[0] === "|") return void 0;
        this.fileDataList(valueArr);
        return valueArr[0];
      } else {
        return void 0;
      }
    },
  },
  methods: {
    // 空数据的时候填充数据数组
    fileDataList(value) {
      setTimeout(() => {
        if (!!this.searchMode === false) return;
        if (this.dataList.length === 0) {
          let resArr = [];
          for (let i = 0; i < value.length; i++) {
            resArr.push({
              label: value[i].split("|")[0],
              value: value[i],
            });
          }
          this.dataList = [...resArr];
          this.update = false;
          this.$nextTick(() => {
            this.update = true;
          });
        }
      });
    },
    // 值改变的时候
    handleChangeVal(value) {
      // 忽略undefined处理
      if (value === void 0) {
        this.$emit("input", void 0);
        this.$emit("change", void 0);
        return;
      }
      // 如果是数组
      if (value instanceof Array) {
        // 拆分出 中文名数组和英文名数组
        let name = [];
        let enName = [];
        for (let i = 0; i < value.length; i++) {
          let [_name, _enName] = value[i].split("|");
          name.push(_name);
          enName.push(_enName);
        }
        // 触发事件
        this.$emit("input", name.join(","));
        this.$emit("change", enName.join(","));
      } else {
        let [name, enName] = value.split("|");
        this.$emit("input", name);
        this.$emit("change", enName);
      }
    },
    // 搜索方法
    handleGetData(query) {
      this.loading = true;
      this.fetch(query)
        .then((data) => {
          this.loading = false;
          this.dataList = data.list;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>
