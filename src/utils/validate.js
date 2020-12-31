import { errorAlert } from "./alert"


//验证管理员
export let valitManager = (manager, bool) => {
    return new Promise((resolve, reject) => {
        if (manager.roleid === 0) {
            errorAlert("请选择所属角色");
            return;
        }
        if (manager.username === "") {
            errorAlert("请输入用户名");
            return;
        }
        if (manager.password === "" && bool) {
            errorAlert("请输入密码");
            return;
        }
        resolve();
    });
};

//验证角色
export let valitRole = (role, flag) => {
    // console.log("验证", check);
    return new Promise((resolve, reject) => {
        if (role.rolename === "") {
            errorAlert("请输入角色名称");
            return;
        }
        if (flag) {
            errorAlert("请选择权限");
            return;
        }
        resolve();
    });
};


//验证菜单
export let valitMenu = (menu) => {
    return new Promise((resolve, reject) => {
        if (menu.title === "") {
            errorAlert("请输入菜单名称");
            return;
        }
        if (menu.pid === "") {
            errorAlert("请选择");
            return;
        }
        if (menu.pid === 0 && menu.icon === "") {
            errorAlert("请选择菜单图标");
            return;
        }
        if (menu.pid !== 0 && menu.url === "") {
            errorAlert("请选择菜单路径");
            return;
        }
        resolve();
    });
};

//验证商品规格
export let valitSpecs = (specs, input) => {
    return new Promise((resolve, reject) => {
        if (specs.specsname === "") {
            errorAlert("请输入规格名称");
            return;
        }
        if (input.some((item) => item.input === "")) {
            errorAlert("请输入所有的规格");
            return;
        }
        resolve();
    });
};



//验证商品分类
export let valitCate = (cate) => {
    return new Promise((resolve, reject) => {
        if (cate.pid === "") {
            errorAlert("请选择上级分类");
            return;
        }
        if (cate.catename === "") {
            errorAlert("请输入分类名称");
            return;
        }
        if (cate.pid !== 0 && this.cate.img === null) {
            errorAlert("请上传图片");
            returnl;
        }
        resolve();
    });
};


//验证商品
export let valitGoods = (goods, des) => {
    return new Promise((resolve, reject) => {
        if (goods.first_cateid === "") {
            errorAlert("请选择一级分类");
            return;
        }
        if (goods.second_cateid === "") {
            errorAlert("请选择二级分类");
            return;
        }
        if (goods.goodsname === "") {
            errorAlert("请输入商品名称");
            return;
        }
        let reg = new RegExp(/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/);
        if (goods.price === "") {
            errorAlert("请输入商品价格");
            return;
        } else if (!reg.test(goods.price)) {
            errorAlert("商品价格输入有误");
            return;
        }
        if (goods.market_price === "") {
            errorAlert("请输入商品市场价格");
            return;
        } else if (!reg.test(goods.market_price)) {
            errorAlert("商品市场价格输入有误");
            return;
        }
        if (goods.img === null) {
            errorAlert("请上传图片");
            return;
        }
        if (goods.specsid === "") {
            errorAlert("请选择商品规格");
            return;
        }
        if (goods.specsattr.length === 0) {
            errorAlert("请选择规格属性");
            return;
        }
        if (des === "") {
            errorAlert("请输入商品描述");
            return;
        }
        resolve();
    });
};



//验证轮播图
export const valitBanner = (banner) => {
    return new Promise((resolve, reject) => {
        if (banner.title === "") {
            errorAlert("请输入标题");
            return;
        }
        if (banner.img === null) {
            errorAlert("请上传图片");
            return;
        }
        resolve();
    });
};

//验证秒杀
export let valitSeckill = (seckill, time) => {
    if (time == null) {
        time = [];
    }
    return new Promise((resolve) => {
        if (seckill.title === "") {
            errorAlert("请输入活动名称");
            return;
        }
        if (time.length === 0) {
            errorAlert("请选择时间");
            return;
        }
        if (seckill.first_cateid === "") {
            errorAlert("请选择一级分类");
            return;
        }
        if (seckill.second_cateid === "") {
            errorAlert("请选择二级分类");
            return;
        }
        if (seckill.goodsid === "") {
            errorAlert("请选择商品");
            return;
        }
        resolve();
    });
};