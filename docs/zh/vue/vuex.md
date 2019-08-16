# Vuex的辅助函数mapState, mapActions, mapMutations
## 目录结构如下：

```pure
demo1                                       # 工程名
|   |--- dist                               # 打包后生成的目录文件             
|   |--- node_modules                       # 所有的依赖包
|   |--- app
|   | |---index
|   | | |-- views                           # 存放所有vue页面文件
|   | | | |-- parent.vue                    # 父组件
|   | | | |-- child.vue                     # 子组件
|   | | | |-- index.vue
|   | | |-- components                      # 存放vue公用的组件
|   | | |-- js                              # 存放js文件的
|   | | |-- store                           # store仓库
|   | | | |--- actions.js
|   | | | |--- mutations.js
|   | | | |--- state.js
|   | | | |--- mutations-types.js
|   | | | |--- index.js
|   | | |-- app.js                          # vue入口配置文件
|   | | |-- router.js                       # 路由配置文件
|   |--- views
|   | |-- index.html                        # html文件
|   |--- webpack.config.js                  # webpack配置文件 
|   |--- .gitignore  
|   |--- README.md
|   |--- package.json
|   |--- .babelrc                           # babel转码文件
```

:::tip store文件code
```js
// app/index/store/state.js 
export default {
  add: 0,
  errors: '',
  counts: 0
}
```
```js
// app/index/store/mutations.js
import * as types from './mutations-types';

export default {
  [types.ADD] (state, payload) {
    state.add = payload;
  },
  [types.SETERROR] (state, payload) {
    state.errors = payload;
  },

  [types.COUNTASYNC] (state, payload) {
    state.counts = payload;
  }
}
```
```js
// app/index/store/mutations-types.js 
// 新增list
export const ADD = 'ADD'; 

// 设置错误提示
export const SETERROR = 'SETERROR';

// 异步操作count
export const COUNTASYNC = 'COUNTASYNC';
```
```js
// app/index/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

Vue.config.devtools = true;

export default new Vuex.Store({
  state,
  mutations,
  actions
});
```

```js
// app/index/store/actions.js
...
export default {
 commonActionGet ({ commit }, payload) {
   ...
  }
}
...
```
:::

## mapState
方法1：不使用mapState
```js
this.$store.state.add
this.$store.state.counts
```
方法2：使用mapState
```js
  ...mapState({
    add: state => state.add,
    counts: state => state.counts
  })
  // 或
  ...mapState([
    'add',
    'counts'
  ])
```
:::tip 
利用mapState的时候，一定要和state的属性值相对应，也就是说 state中定义的属性值叫add，那么mapState就叫add
:::
## mapActions
方法1：不使用mapActions
```js
...
methods: {
  test() {
    // 调用action 需要时使用 this.$store.dispatch '派发'(第1个参数是action里面方法的字符串，第2个参数传给方法的参数)
    Promise.all([this.$store.dispatch('commonActionGet', {})]).then((res) =>{
    });
  }
}
...
```

方法2：使用mapActions
```js
...
  import { mapActions } from 'vuex';
...
methods: {
  test() {
    // 调用
    Promise.all([this.commonActionGet('commonActionGet',{})]).then((res) => {
    });
  },
  ...mapActions(['commonActionGet', 'commonActionGetJSON'])
  // 或者
  ...mapActions({
    'commonActionGet': 'commonActionGet',
    'commonActionGetJSON': 'commonActionGetJSON'
  })
}
...
```
## mapMutations
方法1：不使用mapMutations
```js
...
methods: {
  test() {
    Promise.all([this.$store.commit('ADD', 1)]).then(() =>{
      console.log(this);
    });
  }
}
...
```
方法2：使用mapMutations
```js
...
  import { mapMutations } from 'vuex';
...
methods: {
  test() {
      // 使用 mapMutations 调用方式如下：
      Promise.all([this.ADD(1)]).then(() => {
        console.log(this);
      });
    },
  ...mapMutations(['ADD'])
  //  或
  ...mapMutations({
    'ADD': 'ADD'
  })
}
...
```

# vuex 

new Vuex.store({}) 含义是创建一个Vuex实列。store是vuex的一个核心方法，字面含义为 '仓库'的意思。实列化完成后，需要注入到vue实列中，它有五个核心的选项，state、mutations、getters、actions和modules。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script type="text/javascript" src='https://unpkg.com/vue/dist/vue.js'></script>
  <script type="text/javascript" src='https://unpkg.com/vuex@3.0.1/dist/vuex.js'></script>
</head>
<body>
  <div id='app'>
    <p></p>
  </div>
  <script type="text/javascript">
    Vue.use(Vuex); // 使用vuex
    var myStore = new Vuex.Store({
      // state是存储状态 定义应用状态全局的数据结构
      state: {
        name: 'kongzhi',
        todoLists: []
      },
      /*
        mutations是提交状态修改，也就是set、get中的set，这是vuex中唯一修改state的方式，但是不支持异步操作。
        每个mutation都有一个字符串的事件类型(type)和一个回调函数(handler)
        第一个参数默认是state，外部调用方式为：store.commit('SET_AGE', 30).
      */
      mutations: {
        // 新增list
        ADDLIST(state, item) {
          state.todoLists.push(item);
        },
        // 删除list中的项
        DELLIST(state, index) {
          state.todoLists.splice(index, 1);
        },
        // 设置 错误提示信息
        SETERROR(state, msg) {
          state.message = msg;
        }
      },
      /*
        getters是从state中派生出状态的。也就是set、get中的get，它有两个可选的参数，state和getters，
        分别可以获取state中的变量和其他的getters。外部调用的方式：store.getters.todoCount()
      */
      getters: {
        todoCount(state) {
          return state.todoLists.length;
        }
      },
      /*
       和上面的mutations类似，但是actions支持异步操作的，外部调用方式为：store.dispatch('nameAction')
       常见的使用是：从服务器端获取数据，在数据获取完成后会调用 store.commit()来更改Store中的状态。
       Action函数接收一个与store实列具有相同方法和属性的context对象，因此我们可以使用 context.commit 提交一个
       mutation，或者通过 context.state 和 context.getters来获取state和getters
      */
      actions: {
        addList(context, item) {
          if (item) {
            context.commit('ADDLIST', item);
            context.commit('SETERROR', '');
          } else {
            context.commit('SETERROR', '添加失败');
          }
        },
        delList(context, index) {
          context.commit('DELLIST', index);
          context.commit('SETERROR', '删除成功');
        }
      },
      /*
       modules 对象允许将单一的Store拆分为多个Store的同时保存在单一的状态树中。
      */
      modules: {

      }
    });
    // 注册vue组件 xxx
    Vue.component('xxx', {
      template: "<div>{{name}}</div>",
      computed: {
        name: function() {
          console.log(this.$store.state);
          return this.$store.state.name;
        }
      },
      mounted: function() {
        console.log(this);
      }
    });
    new Vue({
      el: '#app',
      data: {
        name: 'init name'
      },
      store: myStore,
      mounted: function() {
        console.log(this);
      }
    })
  </script>
</body>
</html>
```

:::tip
***理解context***:  context是和 this.$store 具有相同的方法和属性的对象。我们可以通过 context.state 和 context.getters来获取state和getters。

***理解dispatch***: 它含有异步操作，含义可以理解为 '派发'，比如向后台提交数据，可以为 this.$store.dispatch('actions方法名', 值);
:::

## 使用vuex到项目中
### 创建vuex
```js
// app/index/store/index.js 
import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

Vue.config.devtools = true;

export default new Vuex.Store({
  state,
  mutations,
  actions
});
```

### 引入到Vue中
```js
// 入口文件 app/index/app.js 引入store即可
import Vue from 'vue';

// 添加store
import store from './store/index';

// 暂时先用 vue-resource 演示
import VueResource from 'vue-resource';

import Index from './views/index';

// 引入路由
import router from './router';

// Resource
Vue.use(VueResource);

new Vue({
  el: '#app',
  router: router,
  // vue实列添加store
  store: store,
  render: h => h(Index)
});
```

## 实例-store拆分成多个模块
单个store合并
```js
// one.js
export default {
  namespaced: true,
  state: {
    param1,
    param2
  },
  // getters:{  },  可有可无，主要作用是过滤state数据
  actions: {
  },
  mutations: {
  }
}


```
多个store合并
```js
// multi.js
import Vue from 'vue'
import Vuex from 'vuex'
import one from './one'
import two from './two'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    param11,
    param22
  },
  // getters:{  },  可有可无，主要作用是过滤state数据
  actions: {
  },
  mutations: {
  },
  modules: {
    one,
    two
  }
})
```
项目main.js中引入全部的store
```js
...
import router from './router'
import store from './multi.js'
 new Vue({
    router,
    store,
    render () {
      return <router-view />
    }
  }).$mount('#app')
...
```








