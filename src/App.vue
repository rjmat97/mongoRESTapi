<template>
  <div id="app">
    <el-table
      :data="statesInfo"
      style="width: 100%">
      <el-table-column v-for="i in Object.keys(statesInfo[0])" :key="i" 
        :prop="i" :label="i" width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data(){
    return{
      url:'http://localhost:3000/',
      statesInfo: []      
    }
  },
  methods:{
    getData(){
      axios.get(this.url).then(res => {
        let dat = res.data
        this.statesInfo = dat.map(val => {
          let tmpJSON = {}
          Object.keys(val._id).forEach(key => tmpJSON[key] = val._id[key])
          tmpJSON.count = val.count
          return tmpJSON
        })
      })
    }
  },
  mounted(){
    this.getData()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
