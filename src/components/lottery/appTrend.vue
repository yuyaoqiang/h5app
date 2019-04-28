<template>

</template>
<script>

    export default {
        created:function () {
            var id = this.$route.query.id;
            if(id == 66 || id==203){
                this.$router.push({path:'lhcTrend',query:{id:id}});
                return;
            }
            if(id == 74){
                this.$router.push({path:'xyxzlhcTrend',query:{id:id}});
                return;
            }
            if(id==27){
                this.$router.push({path:'pcTrend',query:{id:id}});
                return;
            }

            this.$router.push({path:'basicTrend',query:{id:id}});
        }
    }
</script>
