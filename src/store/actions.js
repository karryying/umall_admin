export let actions = {
    reqUserInfo(context, obj) {
        //保存用户信息
        context.commit("setUserInfo", obj);
    }
}