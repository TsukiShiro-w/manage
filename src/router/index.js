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
// 2.注册路由
Vue.use(VueRouter);

// 路由实例化
let router = new VueRouter({
    // 路由匹配
    routes: [
        {
            path: '/',
            component: login,
        },
        {
            path: '/layout',
            component: home,
            children: [
                {
                    path: 'chart',
                    component: chart,
                },
                {
                    path: 'userList',
                    component: userList,
                },
                {
                    path: 'question',
                    component: question,
                },
                {
                    path: 'business',
                    component: business,
                },
                {
                    path: 'subject',
                    component: subject,
                },
            ]
        }
    ]
});

export default router;