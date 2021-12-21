<template>
  <tableVersionInfoView />
</template>
<script>
import tableVersionInfoModel from "@dataModelCenter/module/tableVersionInfo";
export default {
  components: {
    tableVersionInfoView: tableVersionInfoModel.component,
  },
};
</script>
