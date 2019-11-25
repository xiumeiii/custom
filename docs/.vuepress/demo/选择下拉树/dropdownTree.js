import service from '@/service.js'
export default {
  props: {
    props: { /** 对参数做一层转换 **/
      default () {
        return {
          treeId: '', // 树 - 节点id
          treePId: '', // 树 - 父节点id
          treeName: '', // 树 - 节点名称
          treePathName: '',
          treeUrl: '', // 树 - 请求url
          // treeDefaultParam: {}, // 树 - 默认参数
          treeSearchPlaceholder: '', // 树 -搜索placeholder
          defaultParentId: '' // 获取根节点时候没有时的默认传值
        }
      }
    }
  },
  methods: {
    /**
     * @desc 获取异步树数据
     */
    setTreeData ({ parentId, pageNo, pageSize, keyWord }) {
      const params = {}
      // 合并默认参数
      Object.assign(params, {
        pageNo: pageNo,
        pageSize: pageSize,
        parentIndexCode: parentId || this.props.defaultParentId
      })
      return new Promise(async (resolve, reject) => {
        try {
          let { data: { list } } = await service.getTreeData(this.props.treeUrl, params)
          list = list ? list.map(item => {
            return Object.assign(item, {
              id: item[this.props.treeId],
              pId: item[this.props.treePId],
              name: item[this.props.treeName],
              svgIcon: item.iconSkin
            })
          }) : []
          resolve(list)
        } catch (err) {
          console.error(err)
        }
      })
    },

    // 搜索异步树
    setSearchData (keyWord) {
    }
  }
}
