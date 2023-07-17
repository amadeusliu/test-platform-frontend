import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import createStore  from '../store/index';

const routes: Array<RouteRecordRaw> = [
/*   {
    path: '/',
    name: 'home',
    component: HomeView
  }, */


  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/user/LoginView.vue')
  },


  {
    path: '/main',
    component: () => import( '../views/main/MainPage.vue'),
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'fileUpload',
        component: () => import( '../views/user/FileUploadView.vue')
      },
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'fileList',
        component: () => import( '../views/user/FileListView.vue')
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'checkTool',
        component: () => import( '../views/user/CheckToolView.vue')
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'userAdd',
        component: () => import( '../views/user/UserAddView.vue')
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'userList',
        component: () => import( '../views/user/UserListView.vue')
      }



    ],
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/* router.beforeEach(async (to, from) => {
const tokenFromLocalStorage = localStorage.getItem("token");
const tokenFromStore=createStore.state.token;
if(from.name==undefined&&to.name==undefined&&(tokenFromLocalStorage==null||tokenFromLocalStorage=="")
&&(tokenFromStore==null||tokenFromStore=="")){
  return {name:'login'};
}
if(to.name!="login"&&to.name!=undefined){
  if(tokenFromLocalStorage!=null||tokenFromLocalStorage!=""
    ||tokenFromStore!=null||tokenFromStore!="")
  {
  return {name:to.name};
  }
  else{
    return {name:'login'};

  }
}

if(from.name=="login"&&to.name==undefined){
  if((tokenFromLocalStorage==null||tokenFromLocalStorage=="")
    &&(tokenFromStore==null||tokenFromStore==""))
  {
    return {name:'login'};
  }
  console.log(tokenFromLocalStorage);
  console.log(tokenFromStore);
}



}) */

export default router
