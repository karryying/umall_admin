import axios from "axios"
import qs from "qs"
import Vue from "vue"
import { errorAlert } from "./alert"
import router from "../router"
import store from "../store"

//开发时使用
let baseUrl = "/api";
Vue.prototype.$pre = "http://localhost:3000"

//打包时使用
// let baseUrl = "";
// Vue.prototype.$pre = ""

//进行请求拦截
axios.interceptors.request.use(config => {
    console.log(config);
    if (config.url !== baseUrl + "/api/userlogin") {
        //如果不是登录的路径就不需要携带请求头
        config.headers.authorization = store.state.userInfo.token;
    }
    return config;
})

//配置响应拦截
axios.interceptors.response.use(res => {
    console.group("==============本次请求的地址是:" + res.config.url);
    console.log(res);
    if (res.data.code !== 200) {
        errorAlert(res.data.msg);
    }

    if (res.data.list === null) {
        res.data.list = [];
    }

    if (res.data.msg === "登录已过期或访问权限受限") {
        //清空登录的数据
        store.dispatch("setUserInfo", {});
        router.replace("/login");
    }
    console.groupEnd();
    return res;
})

//数据交互

/*-------------------菜单管理 start---------------------**/

//菜单添加
export const reqMenuAdd = (menu) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(menu)
    })
}

//获取菜单列表
export const getMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        params: {
            istree: true
        }
    })
}

//菜单修改  获取单个菜单信息
export const getMenuDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        params: obj
    })
}

//菜单修改提交
export const reqMenuUpdate = (menu) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(menu)
    })
}


//菜单删除
export const reqMenuDelete = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

/*-------------------菜单管理 end---------------------**/


/*--------------------角色管理  start----------------*/


//角色列表
export const getRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
    })
}

//角色添加
export const reqRoleAdd = (role) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(role)
    })
}


//菜单修改  获取一条角色信息
export const getRoleDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        params: obj
    })
}

//修改提交
export const reqRoleUpdate = (role) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(role)
    })
}

//角色删除
export const reqRoleDelete = (obj) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

/*--------------------角色管理  end----------------*/


/*---------------管理员管理 start------------------*/

//管理员登录
export const reqUserLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}

//管理员的总数
export const getUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount"
    })
}

//管理员列表
export const getUserList = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        params: obj
    })
}

//管理员添加
export const reqUserAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}


//菜单修改  获取一条管理员信息
export const getUserDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        params: obj
    })
}

//修改提交
export const reqUserUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}

//管理员删除
export const reqUserDelete = (obj) => {
    console.log(obj, "这是");
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(obj)
    })
}



/*---------------管理员管理 end------------------*/


function fileToFormData(obj) {
    let data = new FormData();
    for (let k in obj) {
        data.append(k, obj[k])
    }
    return data;
}

/***************商品分类  start**************/

//获取商品分类列表
export const getCateList = (pid) => {
    return axios({
        url: baseUrl + "/api/catelist",
        params: {
            istree: true,
            pid
        }
    })
}

//商品分类添加
/**
 * pid上级分类编号
 * catename商品分类名称
 * img图片(文件，一般用于二级分类)
 * status状态   1正常2禁用
 * @param {*} cate 
 */
export const reqCateAdd = (cate) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: fileToFormData(cate)
    })
}

//菜单修改  获取一条管理员信息
/**
 * id  分类编号{id:id}
 * @param {*} obj 
 */
export const getCateDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        params: obj
    })
}

//修改提交
/**
 * id分类编号，必填项
 * pid上级分类编号
 * catename商品分类名称
 * img图片(一般用于二级分类)
 * status状态1正常2禁用
 * @param {*} cate 
 */
export const reqCateUpdate = (cate) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: fileToFormData(cate)
    })
}

//商品分类删除
/**
 * 
 * @param {id:id} obj 
 */
export const reqCateDelete = (obj) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

/***************商品分类   end**************/

/****************商品规格  start****************/

//获取总数
export const getSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount"
    })
}

//获取商品规格列表
/**
 * size查询条数
 * page页码数
 * @param {*} obj 
 */
export const getSpecsList = (obj) => {
    return axios({
        url: baseUrl + "/api/specslist",
        params: obj
    })
}


//商品规格添加
/**
 * specsname商品规格名称string
 * attrs商品规格属性值 "['白色','红色‘，’黄色‘]"
 * status状态 1正常 2禁用
 * @param {*} specs 
 */
export const reqSpecsAdd = (specs) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(specs)
    })

}

//菜单修改  获取一条商品规格信息
/**
 * id  分类编号{id:id}
 * @param {*} obj 
 */
export const getSpecsDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        params: obj
    })
}

//修改提交
/**
 * id分类编号，必填项
 * specsname商品规格名称
 * attrs商品规格属性值
 * status状态1正常2禁用
 * @param {*} specs 
 */
export const reqSpecsUpdate = (specs) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(specs)
    })
}

//商品规格删除
/**
 * 
 * @param {id:id} obj 
 */
export const reqSpecsDelete = (obj) => {
    console.log(obj, "这是");
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

/****************商品规格  end****************/



/*************商品管理 start***************/

//商品的总数
export const getGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount"
    })
}

//商品列表
/**
 * 
 * @param {*} obj 
 */
export const getGoodsList = (obj) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        params: obj
    })
}

//商品添加
export const reqGoodsAdd = (goods) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: fileToFormData(goods)
    })
}


//菜单修改  获取一条商品信息
export const getGoodsDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        params: obj
    })
}

//修改提交
export const reqGoodsUpdate = (goods) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: fileToFormData(goods)
    })
}

//商品删除
export const reqGoodsDelete = (obj) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

/*************商品管理 end***************/



/*************会员管理 start***************/

//会员列表

export const getMemberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
    })
}

//菜单修改  获取一条会员信息
export const getMemberDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        params: obj
    })
}

//修改提交
export const reqMemberUpdate = (member) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(member)
    })
}

/*************会员管理 end***************/



/*************轮播图管理 start***************/

//轮播图列表
export const getBannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
    })
}

//轮播图添加
export const reqBannerAdd = (banner) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: fileToFormData(banner)
    })
}


//轮播图修改  获取一条轮播图信息
export const getBannerDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        params: obj
    })
}

//修改提交
export const reqBannerUpdate = (banner) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: fileToFormData(banner)
    })
}

//轮播图删除
export const reqBannerDelete = (obj) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

/*************轮播图管理 end***************/


/*************限时秒杀管理 start***************/
//限时秒杀列表
export const getSeckList = (obj) => {
    return axios({
        url: baseUrl + "/api/secklist"
    })
}

//限时秒杀添加
export const reqSeckAdd = (seck) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(seck)
    })
}


//菜单修改  获取一条限时秒杀信息
export const getSeckDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        params: obj
    })
}

//修改提交
export const reqSeckUpdate = (seck) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(seck)
    })
}

//限时秒杀删除
export const reqSeckDelete = (obj) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

/*************限时秒杀管理 end***************/