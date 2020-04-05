import Vue from 'vue';
// 1.导入路由实例化对象
import VueRouter from 'vue-router'

// 2.注册路由
Vue.use(VueRouter);

// 路由实例化
let router  = new VueRouter({
    // 路由匹配
    routes:[
        {
            path:'/',
            components:null,
        }
    ]
});

export default router;