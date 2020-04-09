<template>
  <div>
    <el-popover
      ref="popover"
      trigger="click"
      v-model="isPopoverVisible"
      :width="contentWidth">
        <div class="popover-sync-tree">
          <sync-tree
            ref="syncTree"
            :map="treeMap"
            :page-size="100"
            :search-input-text="'搜索名称'"
            :set-tree-data="setTreeData"
            :set-search-data="setSearchData"
            :current-node-key="currentNodeKey"
            @current-change="handleNodeChange"
            :after-search="handleAfterSearch">
          </sync-tree>
        </div>
    </el-popover>
    <div v-popover:popover class="organization-input" @click="resizeBox">
      <span :title="text || defaultText" :style="{ color: text ? '' : '#ccc', width: 'calc(100% - 24px)' }" v-ellipsis>
        {{text || defaultText}}
      </span>
      <i
        v-if="showCloseIcon && text"
        class="el-input__icon h-icon-close_f"
        style="margin-right:24px"
        @click.stop="clearText"
        >
      </i>
      <i
        class="el-input__icon h-icon-angle_down_sm"
        >
      </i>
    </div>
  </div>
</template>

<script>
// 引用
// <dropdown-tree
//   ref="dropdownTree"
//   :showCloseIcon="true"
//   v-model="formData.organizationIds"
//   :default-text="'全部'">
// </dropdown-tree>
import { http } from '@/aaaa'

export default {
  name: 'DropdownTree',

  data () {
    return {
      text: '',
      contentWidth: 320,
      isPopoverVisible: false,

      // 加载状态
      loading: false,
      // 组织数据
      treeData: [],
      // 组织树配置项
      treeProps: {
        children: 'children',
        label: 'name'
      },
      treeMap: {
        nodeKey: 'id',
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
        svgIcon: 'icon',
        icon: 'iconSkin'
      },
      // 当前选中节点
      currentNode: null
    }
  },

  props: {
    defaultText: {
      type: String,
      default: ''
    },
    hasDefaultValue: {
      type: Boolean,
      default: false
    },
    showCloseIcon: {
      type: Boolean,
      default: false
    },
    isCentralClient: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    // 当前节点id
    currentNodeKey () {
      return this.currentNode && this.currentNode.id
    },
    httpActions () {
      return http
    }
  },

  watch: {
    currentNode (val) {
      this.handleOrgChange(val)
    }
  },

  methods: {
    handleOrgChange (node) {
      this.text = node.name
      this.$emit('input', node.id)
      this.isPopoverVisible = false
      this.$emit('set-org', node)
    },

    resizeBox () {
      this.contentWidth = this.$parent.$el.offsetWidth
    },
    clearText () {
      this.text = ''
      this.$emit('input', '')
    },
    handleNodeChange (nodeData) {
      this.currentNode = nodeData
    },

    setTreeData ({ pageSize, pageNo, parentId }) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await this.httpActions.bbbb({
            params: {
              parentOrgId: parentId,
              pageNo,
              pageSize
            }          })
          resolve(data)
        } catch (error) {
          console.error(error)
        }
      })
    },

    setSearchData (keyWord) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await this.httpActions.aaa({
            params: {
              name: keyWord
            }          })
          resolve(data)
        } catch (error) {
          console.error(error)
        }
      })
    },
    handleAfterSearch () {
      this.isPopoverVisible = true
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeBox)
  },
  mounted () {
    this.$nextTick(() => {
      this.resizeBox()
    })
    window.addEventListener('resize', this.resizeBox)
  }
}
</script>

<style lang="less">
.organization-input {
  display: block;
  width: 100%;
  height: 32px;
  line-height: 24px;
  background-color: #fff;
  position: relative;
  padding: 3px 36px 3px 8px;
  border: 1px solid lighten(#000, 80%);
  border-radius: 2px;
  transition: border-color 0.2s;
  cursor: pointer;
  // .text-overflow;
  &:hover {
    border-color: lighten(#000, 40%);
  }
  i {
    position: absolute;
    right: 4px;
    font-size: 24px;
  }
}
.popover-sync-tree {
  position: relative;
  height: 260px;
  padding: 12px 4px;
}
</style>
