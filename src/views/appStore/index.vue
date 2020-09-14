<template>
  <div class="app-store">
    <el-button @click="goHome" type="primary">返回主页</el-button>
    <h1>
      应用商店
    </h1>
    <el-row :gutter="20">
      <el-col :span="12" v-for="item in microApps" :key="item.app_id"
        ><el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ item.app_name }}</span>
            <el-button
              @click="Select(item)"
              style="float: right; padding: 3px 0;font-size:22px"
              type="text"
            >
              <i v-if="item.selected" class="el-icon-star-on"></i>
              <i v-else class="el-icon-star-off"></i>
            </el-button>
          </div>
          <div>{{ item.app_des }}</div>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'AppStore',
  components: {},
  data() {
    return {
      microApps: [],
      oldSubApps: [],
    };
  },
  computed: {},
  mounted() {
    this.oldSubApps = JSON.parse(localStorage.getItem('sub_apps'));
    this.getAppList();
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'home' });
    },
    async Select(item) {
      if (item.selected) {
        item.selected = false;
      } else {
        item.selected = true;
      }
      const apps = JSON.stringify(
        Object(this.microApps.filter((app) => app.selected))
      );
      localStorage.setItem('sub_apps', apps);
    },
    getAppList() {
      axios
        .get(
          'https://service-6udoqptb-1301671399.bj.apigw.tencentcs.com/release/mysql'
        )
        .then((res) => {
          this.microApps = res.data.map((item) => {
            if (this.oldSubApps) {
              if (this.oldSubApps.find((sub) => sub.app_id == item.app_id)) {
                item.selected = true;
              } else {
                item.selected = false;
              }
            }
            return item;
          });
        });
    },
  },
};
</script>
<style rel="stylesheet/scss" scoped>
.app-store {
  width: 100%;
}
.app-store h1 {
  text-align: center;
}
</style>
