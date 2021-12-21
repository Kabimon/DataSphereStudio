<template>
  <statPeriodView />
</template>
<script>
import statPeriodModel from "@dataWarehouseDesign/module/statPeriod";
export default {
  components: {
    statPeriodView: statPeriodModel.component,
  },
};
</script>
