<template>
  <indicatorsView />
</template>
<script>
import indicatorsModel from "@dataModelCenter/module/indicators";
export default {
  components: {
    indicatorsView: indicatorsModel.component,
  },
};
</script>
