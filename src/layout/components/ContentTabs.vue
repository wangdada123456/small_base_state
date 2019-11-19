<template>
  <div>
    <el-tabs v-model="editableTabsValue" closable @tab-click="selectTab" @tab-remove="removeTab">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.icon"
        :label="item.title"
        :name="item.title"
        >
      </el-tab-pane>
    </el-tabs>
  </div>
  
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      editableTabsValue: "",
      editableTabs: [],
      contentTabs:[],
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.meta;
      let contentTab = {
         name:this.$route.name,
         title:matched.title
      };
      this.editableTabs = [...new Set([...this.editableTabs,matched])];
      this.contentTabs = [...new Set([...this.contentTabs,contentTab])];
      this.editableTabsValue = this.getHighLightName(matched);
    },
    getHighLightName(mate){
      return this.editableTabs.filter(item => item.title == mate.title)[0].title;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.title === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.title;
            };
          };
        });
      };
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.title !== targetName);
    },
    selectTab(tab){
      tab = this.contentTabs.filter(item => item.title === tab.name);
      if(Array.isArray(tab) && tab.lenght > 0 && tab[0].name){
         this.$router.push({ name: tab[0].name })
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
