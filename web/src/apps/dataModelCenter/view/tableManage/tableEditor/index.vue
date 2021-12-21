<template>
  <tableEditorView />
</template>
<script>
import tableEditorModel from "@dataModelCenter/module/tableEditor";
export default {
  components: {
    tableEditorView: tableEditorModel.component,
  },
};
</script>
