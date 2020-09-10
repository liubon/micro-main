<template>
  <div>
    <div id="main-app">
      <img alt="Vue logo" src="./assets/logo.png" />
      <HelloWorld msg="This is The Main App !" />
      <div>
        <span class="label">同步值</span>
        <input class="input" type="text" v-model="value" @input="handleInput" />
      </div>
    </div>
    <div class="container">
      <div class="child-app" id="child-app-01"></div>
      <div class="child-app" id="child-app-02"></div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import { loadMicroApp } from 'qiankun';
export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      value: '这里的的值将同步到微应用',
      childApp: {
        vue_app: null,
        react_app: null,
      },
    };
  },
  mounted() {
    this.loadChild();
  },
  methods: {
    handleInput() {
      const value = this.value;
      for (let app in this.childApp) {
        this.childApp[app].update({ value });
      }
    },
    loadChild() {
      const value = this.value;
      this.childApp.vue_app = loadMicroApp({
        name: 'vue app',
        entry: '/child-app/vue-app-001',
        container: '#child-app-01',
        props: { value },
      });
      this.childApp.react_app = loadMicroApp({
        name: 'react app',
        entry: '/child-app/react-app-002',
        container: '#child-app-02',
        props: { value },
      });
    },
  },
};
</script>

<style>
#main-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 20px;
}
.container {
  display: flex;
  height: 568px;
}
.child-app {
  width: 50%;
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
</style>
