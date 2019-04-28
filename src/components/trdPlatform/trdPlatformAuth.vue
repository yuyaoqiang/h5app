<template>
    <div>

    </div>
</template>
<script>
    import trdAuthAccount from "../../assets/js/api/trdAuthAccount";

    export default {
        data(){
            return {

            }
        },
        created(){
            this.checkAuth()
        },
        methods:{
            checkAuth(){
                var _this=this;
                var params = JSON.stringify(_this.$route.query);
                alert(params)
                _this.lshowWait();
                trdAuthAccount.checkAuth({params:params},(resp)=>{
                    _this.lcloseWait();
                    if(resp.code ==200){
                        var data=resp.data;
                        if(data.login==true){
                            _this.$router.push({path:"index"});
                            return;
                        }
                        var nickName=data.nickName||"";
                        var type=data.type;
                        _this.$router.push({path:"bindUser",query:{nickName:nickName,type:type}})

                    }else {
                        _this.lalterError(resp.msg);
                    }
                });
            }
        }
    }
</script>
