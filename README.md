## vue-md（vue的无埋点方案）

# 介绍

```

1、支持页面、按钮级别埋点数据的收集

2、代码无侵入性，与业务代码隔离

```

# 原理

```

1、页面挂载时，监听页面跳转和点击事件

2、页面监听方法addViewListener：基于vue-router的beforeEach钩子，进行监听，收集页面router的值

3、点击事件addClickListener：基于冒泡事件原理监听document.onclick方法，获取元素最近一层级dom上绑定的data-xxx属性，进行数据通信

```

## 启动项目

```

npm install

npm run server

```

## 查看埋点效果

```

打开控制台可查看埋点数据

```

# 如何使用

## 在main.js中直接引用VueMD

```

import VueMD from './vue-md.js'

Vue.use(VueMD);

```

# 如何存储数据

## 收集页面访问数据addViewListener()

```

自动采集页面访问数据，无需主动操作，会保存ruoter.js上定义的路由信息

```

## 收集点击事件addClickListener()

```

dom上必须绑定一个data-md-name属性，来声明dom是一个埋点dom

```

```

案例：

<div data-md-name="测试按钮" data-value="222">测试，点击我进行埋点</div>

```

# 如何发送数据给服务端pushOrigin()

```

使用vue-router的afterEach钩子，上传埋点数据。

其实埋点上传数据的时间节点，可以自定义...haha

```

## vue-md.js代码

```

import router from './router'

function isEmptyObject(obj) {

    return !obj || !Object.keys(obj).length

}

const install = () => {

    // 全局只挂在一个实例子

    window.onload = () => {

        window.$MD = new VueMD();

    }

}

/* web数据埋点 */

class VueMD {

    constructor() {

        this.pageFrom = {}; // 页面从哪里来

        this.pageCurrent = {}; // 当前页面

        this.mdList = [];

        this.addListenner();

    }

    // 添加全局的埋点监听

    addListenner() {

        this.addViewListener();

        this.addClickListener();

    }

    // 监听页面的路由更改

    addViewListener() {

        const handleViewMD = () => {

            const data = {

                type: 'view',

                page: {

                    from: this.pageFrom,

                    current: this.pageCurrent,

                },

                data: null,

            }

            this.recordMD(data)

        }

        // 记录路由数据

        router.beforeEach((to, from, next) => {

            this.pageFrom = from;

            this.pageCurrent = to;

            handleViewMD();

            next()

        })

        // 推送已存在的埋点数据

        router.afterEach(() => {

            this.mdList.length && this.pushOrigin();

        })

    }

    // 监听点击事件

    addClickListener() {

        const handleClickMD = (dataset) => {

            const data = {

                type: 'click',

                page: {

                from: this.pageFrom,

                current: this.pageCurrent,

                },

                data: dataset,

           }

           this.recordMD(data)

        }

        document.onclick = (e) => {

            let i = 0;

            while(i < e.path.length) {

                const data = e.path[i].dataset;

                if (!isEmptyObject(data)) {

                    // 如果data-md-name存在的时候，才进行埋点

                    if (data.mdName) {

                    i = e.path.length

                    handleClickMD(data);

                    }

                }

                i ++;

            }

        }

    }

    // 记录md数据

    recordMD(data) {

        console.warn(data)

        console.log('%c记录数据埋点...', "color: red;")

        this.mdList.push(data);

    }

    // 埋点数据推送到远程

    pushOrigin() {

        console.warn(this.mdList)

        console.log('%c推送埋点数据....', "color: red;")

        this.mdList = [];

    }

}

export default install;

```