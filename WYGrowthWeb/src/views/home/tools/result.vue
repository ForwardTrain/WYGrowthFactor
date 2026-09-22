<template>
  <div>
    <div v-html="htmlData"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      htmlData: '',
    }
  },
  mounted() {
    if(localStorage.getItem('toolsResult')) {
      this.htmlData = JSON.parse(localStorage.getItem('toolsResult'))
    }
  },
  methods: {
    
  },
}
</script>

<style scoped lang='scss'>
body {
  padding-top: 0px !important;
}


::v-deep(.footer) {
  display: none;
}
::v-deep(.breadcrumb) {
  display: none;
}
::v-deep(.navbar) {
  display: none;
}
  ::v-deep(.col-md-3) {
    display: none;
  }
</style>
