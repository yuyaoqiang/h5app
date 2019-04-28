import appContext from "../../context/appContext"
export default {
    toLoginView(){
        appContext.current.$router.push({path: "newLogin",query:{"ref":appContext.current.$route.path}});
    }
}