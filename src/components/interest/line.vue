<script>
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import userInfo from  "../../assets/js/api/userInfo";
    import { Line,mixins } from 'vue-chartjs'
        export default {
        extends: Line,
        mixins: [mixins.reactiveProp],
        props: ['chartdata', 'options'],
        data () {
                return {
                gradient: null,
                }
        },
        mounted () {
            this.renderChart(this.chartdata,this.options)
        }
    }
</script>
