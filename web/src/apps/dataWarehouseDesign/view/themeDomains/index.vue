<template>
  <themeDomainsView />
</template>
<script>
import themeDomainsModel from "@dataWarehouseDesign/module/themeDomains";
export default {
  components: {
    themeDomainsView: themeDomainsModel.component,
  },
};
</script>
