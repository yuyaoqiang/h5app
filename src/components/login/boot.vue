<template>
    <div>
    </div>
</template>

<script>
    import appContext from '../../assets/js/context/appContext'

    export default {

        beforeCreate(){
            // var path = "guid";
            // if (window.location.href.indexOf(appContext.toLoginFlag) != -1) {
            //    path="login";
            // }
            // window.location.href = "/" + appContext.getDevice().paths[0] + "#/" + path;
            this.$router.push('login')
        },
    }
</script>

