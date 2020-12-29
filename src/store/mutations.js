export let state = {
    userInfo: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {},
};
export let mutations = {
    setUserInfo(state, obj) {
        state.userInfo = obj;

        if (obj.username) {
            //有这个属性重新设置值
            sessionStorage.setItem("user", JSON.stringify(obj));
        } else {
            //清除session
            sessionStorage.removeItem("user");
        }
    }
};
export let getters = {
    //导出
    userInfo(state) {
        return state.userInfo;
    }
};