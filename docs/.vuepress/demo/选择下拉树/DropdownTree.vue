<template>
  <el-dropdown ref="dropdown" class="form-dropdown" trigger="click" placement="bottom-start" @visible-change="visiDropDown">
    <div class="form-dropdown-area" @mouseover="handleMouseoverIcon" @mouseout="handleMouseoutIcon">
      <span :title="text || defaultText" :style="{ color: text ? '#4d4d4d' : '#aaa' }" >{{ text || defaultText }}</span>
      <i class="h-icon-angle_down_sm" @mouseover="handleMouseoverIcon" v-if="!showCloseIcon" :class="{open: isShowDropdown}"></i>
      <i class="h-icon-close" @click.stop="reset" @mouseout="handleMouseoutIcon" v-if="showCloseIcon" ></i>
    </div>
    <el-dropdown-menu class="dropdown-tree-menu" slot="dropdown" :style="{width: widthcontent +'px'}">
      <sync-tree
        ref="syncTree"
        simple-data
        :node-key="props.treeId"
        :parent-key="props.treePId"
        :searchInputText="props.treeSearchPlaceholder"
        :set-tree-data="setTreeData"
        :set-search-data="setSearchData"
        current-node-key="1"
        @node-click="handleClickNode"
      />
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
// 引用
// <dropdown-tree ref="dropdownTree" v-model="indexCode"
// :default-text="'全部'" :props="props_region"></dropdown-tree>
// props_region: {
//   treeId: 'indexCode',
//   treeName: 'name',
//   treePId: 'parentIndexCode',
//   treeUrl: '***/getTreeData',
//   treeSearchPlaceholder: '',
//   defaultParentId: '-1'
// }
import ddTreeMixin from '@/dropdownTree'
import { on, off } from '@/utils'
export default {
  name: 'DropdownTree',
  mixins: [ddTreeMixin],
  props: {
    value: [String, Number],
    defaultText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showCloseIcon: false,
      text: '', // 展示的文字
      isShowDropdown: false, // 改变箭头图标方向
      $dropdown: '',
      widthcontent: 300
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.resetSize()
    })
    this.$dropdown = document.querySelector('.form-dropdown')
    on(this.$dropdown, 'resize', this.resetSize)
  },
  beforeDestroy () {
    off(this.$el, 'resize', this.resetSize)
  },
  methods: {
    //  重置下拉框宽度
    resetSize () {
      // 设置ul宽度所占百分比
      this.widthcontent = document.querySelector('.form-dropdown') ? document.querySelector('.form-dropdown').scrollWidth : ''
    },
    // 打开el-dropdown,改变箭头图标方向
    visiDropDown () {
      this.isShowDropdown = !this.isShowDropdown
    },
    // 重置控件
    reset () {
      this.showCloseIcon = false
      this.text = ''
      this.$refs.syncTree.refresh()
      this.$emit('input', '')
    },

    /* 鼠标移动到下拉图标上 */
    handleMouseoverIcon () {
      if (this.text) {
        this.showCloseIcon = true
      }
    },

    /* 鼠标从删除图标上移走 */
    handleMouseoutIcon () {
      this.showCloseIcon = false
    },
    handleClickNode (nodeData) {
      this.text = nodeData[this.props.treeName]
      this.$emit('input', nodeData[this.props.treeId])
      this.$refs.dropdown.hide()
    }
  }
}
</script>
<style lang="scss">
.sync-tree-container .sync-tree-search {
  display: none;
}

$--transition-time: 0.2s;
@mixin utils-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form-dropdown {
  width: 100%;
}
.form-dropdown-area {
  position: relative;
  // width: 100%;
  height: 100%;
  padding: 0 2px;
  border: 1px solid #b3b3b3;
  border-radius: 2px;
  transition: border-color $--transition-time;
  cursor: pointer;
  @include utils-ellipsis;
  &:hover {
    border-color: #4d4d4d;
  }
  i {
    position: absolute !important;
    top: 3px;
    right: 4px;
    font-size: 24px;
    color: #4d4d4d;
    transition: transform 0.2s linear;
    &.open {
      transform: rotate(-180deg);
    }
  }
}

/* dropdown-tree: 下拉树
------------------------------ */

.el-dropdown-menu.dropdown-tree-menu {
  position: relative;
  min-width: 260px;
  height: 380px;
  padding: 12px;
}

.dropdown-tree-main {
  position: absolute;
  top: 48px;
  bottom: 6px;
  left: 12px;
  right: 12px;
}
</style>
