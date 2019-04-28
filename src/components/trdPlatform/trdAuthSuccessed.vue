<template>
    <div>

    </div>
</template>
<script>

    import trdAuthAccountBusiness from "../../assets/js/business/user/trdAuthAccountBusiness";

    export default {
        data(){

            return {}
        },

        created(){
            var result = this.$route.query.result;
            if (result == null) {
                this.lalterError("获取授权数据失败")
                this.$router.push({path: "index"});
                return;
            }

            result = decodeURIComponent(result);
            var param = JSON.parse(result);
            var way = param.way;

            if(way != null){
                if (way == "AUTO_LOGIN") {
                    this.$router.push({path: "index"});
                    return;
                }

                if (way == "AUTO_REG_LOGIN") {
                    this.$router.push({path: "autoRegSuccessed", query: param});
                    return;
                }

                if (way == "NOT_LOGIN") {
                    this.$router.push({path: "newCreateUser", query: param});
                    return;
                }
            }

            //下面的逻辑只要是要兼容老的接口请求方式 如果是新的接口可以忽略下面的逻辑
            if (param.login == true) {
                if (param.autoReg == true) {
                    this.$router.push({path: "autoRegSuccessed", query: param})
                } else {
                    this.$router.push({path: "index"});
                }
            } else {
                this.$router.push({path: "bindUser", query: param})
            }



        },


    }
</script>
