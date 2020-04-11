import Vue from 'vue';
// 1.导入路由实例化对象
import VueRouter from 'vue-router';

// 导入子组件
import login from '@/view/login/login.vue';
import home from '@/view/home/layout.vue';
import chart from '@/view/home/chart/chart.vue'
import userList from '@/view/home/userList/userList.vue'
import question from '@/view/home/question/question.vue'
import business from '@/view/home/business/business.vue'
import subject from '@/view/home/subject/subject.vue'


//进度条
import  NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 2.注册路由
Vue.use(VueRouter);



// 路由实例化
let router = new VueRouter({
    // 路由匹配
    routes: [
        {
            path: '/',
            component: login,
            meta:{
                title:'登录',
            }
        },
        {
            path: '/layout',
            redirect:'/layout/chart',
            component: home,
            children: [
                {
                    path: 'chart',
                    component: chart,
                    meta:{
                        title:'数据概览',
                    }
                },
                {
                    path: 'userList',
                    component: userList,
                    meta:{
                        title:'用户列表',
                    }
                },
                {
                    path: 'question',
                    component: question,
                    meta:{
                        title:'题库列表',
                    }
                },
                {
                    path: 'business',
                    component: business,
                    meta:{
                        title:'企业列表',
                    }
                },
                {
                    path: 'subject',
                    component: subject,
                    meta:{
                        title:'学科列表',
                    }
                },
            ]
        }
    ]
});

router.beforeEach((to,from,next)=>{
    NProgress.start();
    next();
});

router.afterEach((to)=>{
    NProgress.done();
    //to等于$route
    document.title = to.meta.title;
})

export default router;