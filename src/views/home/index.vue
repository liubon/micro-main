<template>
  <div id="main-app">
    <el-button @click="goAppStore" type="primary">前往应用市场</el-button>
    <div class="hello">
      <img alt="Vue logo" src="../../assets/logo.png" />
      <HelloWorld msg="This is The Main App !" />
      <div>
        <span class="label">同步值</span>
        <input class="input" type="text" v-model="value" @input="handleInput" />
      </div>
    </div>
    <div v-if="container.length < 1" class="noApp-link">
      请前往
      <el-button @click="goAppStore" type="text"
        ><span style="font-size:20px">应用市场</span> </el-button
      >添加应用
    </div>
    <el-row v-else :gutter="20">
      <el-col :span="12" v-for="item in container" :key="item.id"
        ><el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ item.name }}</span>
          </div>
          <div :id="'child-app-' + item.id" class="container"></div> </el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import { loadMicroApp } from 'qiankun';
export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      value: '这里的的值将同步到微应用',
      childApp: {},
      container: [],
    };
  },
  mounted() {
    this.loadChild();
  },
  methods: {
    goAppStore() {
      this.$router.push({ name: 'appStore' });
    },
    handleInput() {
      const value = this.value;
      for (let app in this.childApp) {
        this.childApp[app].update({ value });
      }
    },
    loadChild() {
      const subs = JSON.parse(localStorage.getItem('sub_apps'));
      this.container = [];
      const props = { value: this.value };
      if (subs) {
        subs.forEach((item) => {
          this.container.push({ name: item.app_name, id: item.app_id });
          this.childApp[item.app_name] = loadMicroApp({
            name: item.app_name,
            entry: item.app_url,
            container: '#child-app-' + item.app_id,
            props,
          });
        });
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="less" scope>
#main-app {
  .hello {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
    height: 100%;
    margin-bottom: 20px;
  }
  .noApp-link {
    margin-top: 60px;
    font-size: 22px;
    color: #606266;
    text-align: center;
  }
  .child-app {
    width: 50%;
  }
  .container {
    height: 500px;
    overflow: auto;
  }
  .label {
    font-size: 24px;
    margin-right: 20px;
    font-weight: 600;
  }
  .input {
    height: 30px;
    width: 400px;
    font-size: 20px;
  }
}
</style>
