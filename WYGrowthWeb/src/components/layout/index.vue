<template>
  <div class="app-wrapper">
    <headBox class="head-box"></headBox>
    <div class="page-box">
      <navbar class="navbar-box"></navbar>
      <div class="content-box">
        <navBox></navBox>
        <workTable class="router-box"></workTable>
      </div>
    </div>
  </div>
</template>

<script>
import  navbar from '../navbar'
import  headBox from './head'
import  navBox from './nav'

import  workTable from '../../views/workTable'
export default {
  name: '',
  components: {
    workTable,
    navbar,
    headBox,
    navBox
  },
  data() {
    return {
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
.app-wrapper {
  .page-box {
    display: flex;
    background: #E6E8F1;
  }
  .content-box {
    // width: 100%;
  }
  .router-box {
    width: 100%;
  }
  .content-box2 {
    width: 100%;
  }
}
</style>