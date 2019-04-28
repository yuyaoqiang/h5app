import arrayUtil  from './arrayUtil'
import objectUtil  from './objectUtil'
export default {
    //改变年份
    // yearAnimals:new Date().getTime()<new Date(2019,2,5).getTime()?2018:2019,

    ballColor:{
        red:['01','02','07','08','12','13','18','19','23','24','29','30','34','35','40','45','46'],
        blue:['03','04','09','10','14','15','20','25','26','31','36','37','41','42','47','48'],
        greed:['05','06','11','16','17','21','22','27','28','32','33','38','39','43','44','49'],
    },
    chinaColor:[
        {english:'red',china:'红'},
        {english:'blue',china:'蓝'},
        {english:'greed',china:'绿'},
    ],
    isInit:false,
    currentCache:{},
    years:[2018,2019,2020,2021,2022],
    animals:['猪','鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗'],
    baseData:[
        [ 1 , 13 , 25 , 37 , 49],
        [ 12 , 24 , 36 , 48],
        [ 11 , 23 , 35 , 47],
        [ 10 , 22 , 34 , 46],
        [ 9 , 21 , 33 , 45],
        [ 8 , 20 , 32 , 44],
        [ 7 , 19 , 31 , 43],
        [ 6 , 18 , 30 , 42],
        [ 5 , 17 , 29 , 41],
        [ 4 , 16 , 28 , 40],
        [ 3 , 15 , 27 , 39],
        [ 2 , 14 , 26 , 38]
    ],
    shenxiao:{
        currentAnimal:'鸡',
        year:2017,
        animal:{
            '猪':[ 1 , 13 , 25 , 37 , 49],
            '鼠':[ 12 , 24 , 36 , 48],
            '牛':[ 11 , 23 , 35 , 47],
            '虎':[ 10 , 22 , 34 , 46],
            '兔':[ 9 , 21 , 33 , 45],
            '龙':[ 8 , 20 , 32 , 44],
            '蛇':[ 7 , 19 , 31 , 43],
            '马':[ 6 , 18 , 30 , 42],
            '羊':[ 5 , 17 , 29 , 41],
            '猴':[ 4 , 16 , 28 , 40],
            '鸡':[ 3 , 15 , 27 , 39],
            '狗':[ 2 , 14 , 26 , 38]
        }
    },
    jiaye:[
        {
            type:0,
            names:['牛','马','羊','鸡','狗','猪',],
            number:[],
        },
        {
            type:1,
            names: ['鼠','虎','兔','龙','蛇','猴',],
            number:[],
        }
    ],
    weishuColumn:{
            firstColumn:['00尾','01尾',	'02尾','03尾','04尾','05尾','06尾','07尾','08尾','09尾'],
            secondColumn:['10-20-30-40','01-11-21-31-41','02-12-22-32-42','03-13-23-33-43','04-14-24-34-44','05-15-25-35-45','6-16-26-36-46','07-17-27-37-47','08-18-28-38-48','09-19-29-39-49'],
    },
    duanshu:{
        firstColumn:['00段','01段','02段','03段','04段','05段','06段','07段','08段','09段',],
        secondColumn:['01-02-03-04-05','06-07-08-09-10','11-12-13-14-15','16-17-18-19-20','21-22-23-24-25','26-27-28-29-30','31-32-33-34-35','36-37-38-39-40','41-42-43-44-45','46-47-48-49'],
    },
    setJiayeData(yearTime){
        this.countAnimalNumber(yearTime);
        var jiaye = this.jiaye;
        var animalList = this.shenxiao.animal;
        for(var i  in animalList){
            arrayUtil.forEach(jiaye,item =>{
                var names = item.names;
                if(arrayUtil.indexOf(names,this.animals[i])!=-1){
                    item.number = item.number.concat(animalList[i]);
                }
            })
        }
    },
    getAnimalStyle(yearTime,num,type){
       this.setJiayeData(yearTime);
       var flag = false;
        if(type==0) {
            var tempArr = this.jiaye[0].number;
            flag =  arrayUtil.indexOf(tempArr, num)!= -1 ?true :false;
        }else{
            var tempArr = this.jiaye[1].number;
            flag = arrayUtil.indexOf(tempArr, num)!= -1 ?true :false;
        }
        return flag;
    },
    //智能走势
    zhinengTrend(yearTime,array,data,selectIndex){
        if(selectIndex==0){
            this.pingma(array,data);
        }else{
            this.tema(array,data);
            this.animal(yearTime,array,data);
            this.singleAndDouble(array,data);
            this.getColorName(array,data);
            this.header(array,data);
            this.tail(array,data);
            this.heshuang(array,data);
            this.heshu(array,data);
        }
    },
    getYear(){
     var currentDate =  new Date();
     return currentDate.getFullYear();
    },
    morkColumnNums(){
        var arr = [];
        for(var i=1;i<=49;i++){
            arr.push(i)
        }
        return arr;
    },
    getWeiNumbers(){
     return this.weishuColumn;
    },
    getbose(){
     return this.ballColor;
    },
    getDuanNumber(){
     return this.duanshu;
    },

    morkAnimalNums(){

        var yeartime = new Date().getTime()>new Date(2020,1,24).getTime()?2020:2019

        this.countAnimalNumber(yeartime);
        var animalList = this.shenxiao.animal;
        var list = objectUtil.extendDeepCopy(animalList);
        var concatList = [];
        for(var i in list){
            var arr = list[i];
            arrayUtil.forEach(arr,(item,index)=>{
                if(arr.length-1 == index){
                    arr[index]={num:item,border:'trend-number'}
                }else{
                    arr[index]={num:item}
                }

            })
            concatList =  concatList.concat(arr);
        }
        return concatList;
    },
    morkAnimalNums2(){
        this.countAnimalNumber(2018);
        var animalList = this.shenxiao.animal;
        var list = objectUtil.extendDeepCopy(animalList);
        var concatList = [];
        for(var i in list){
            var arr = list[i];
            concatList.push(arr)
        }
        return concatList;
    },
    countAnimalNumber(yeartime){
        var _this =this;
        this.shenxiao.animal = this.currentCache[yeartime];
        if(this.isInit)return
        for(var i= 0; i<this.years.length; i++){
            _this.arrUpate(this.years[i]);
        }
        this.shenxiao.animal = this.shenxiao.animal;
        this.shenxiao.animal = this.currentCache[yeartime];
        this.isInit = true;
    },
    arrUpate(year){
        var arr = [];
        for(let i=0;i<this.baseData.length;i++){
            if(i==11){
                arr[0] = this.baseData[i];
            }else{
                arr[i+1] = this.baseData[i];
            }
        }
        if(this.currentCache['2017'] == null){
            var newAnimal={};
            arrayUtil.forEach(this.animals,(item,index)=>{
                newAnimal[index] = this.baseData[index];
            })
            this.currentCache['2017'] = newAnimal;
        }
        this.baseData = arr;
        var newAnimal={};
        arrayUtil.forEach(this.animals,(item,index)=>{
            newAnimal[index] = arr[index];
        })
        this.currentCache[year] = newAnimal;
    },
    getListLastNumber(numberList){
         var item =  numberList.slice(6,7)[0];
         return item;
    },
    getAnimal(yeartime,item){
        var ruslut ="";
        this.countAnimalNumber(yeartime);
        var animal = this.shenxiao.animal;
        for(var i in animal){
            arrayUtil.forEach(animal[i],a=>{
                if(item == a){
                    ruslut = this.animals[i];
                }
            })
        }
        return ruslut;
    },
    selectColor(item){
        var colorArr= this.ballColor;
        var color = "";
        for(var i in colorArr){
            arrayUtil.forEach(colorArr[i],j=>{
                if(item == j){
                    color = i;
                }
            })
        }
        return color;
    },
    pingma(numberList,arr){
         var temp =  numberList.slice(0,6)
        arrayUtil.forEach(temp,(item,index)=>{
             var color = this.selectColor(item)
            arr.push({num:item,color:color});
            if(temp.length-1==index){
                arr[index].borderRight='trend-number';
            }
        })
    },
    everyNumSetColor(item,arr){
        var color = this.selectColor(item)
            arr.push({num:item,color:color,border:'trend-number'});
    },
    tema(numberList,arr){
        var item =  this.getListLastNumber(numberList);
        var color = this.selectColor(item)
        arr.push({num:item,color:color,borderRight:'trend-number'});
    },
    animal(yearTime,numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        var color = this.selectColor(item);
        var animal= this.getAnimal(yearTime,item/1)
        arr.push({num:animal,color:color,borderRight:'trend-number'});
    },
    singleAndDouble(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        if(item%2 == 0){
            arr.push({num:'双',borderRight:'trend-number'});
        }else{
            arr.push({num:'单',borderRight:'trend-number'});
        }
    },
    getColorName(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        var colorName = this.selectColor(item);
        var chinaName = this.chinaColor;
        arrayUtil.forEach(chinaName,name=>{
           if( name.english == colorName){
               arr.push({num:name.china,borderRight:'trend-number'});
           }
        })
    },
    getwuxing(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        arr.push({num:'金',borderRight:'trend-number'});
    },
    header(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        arr.push({num:item[0]+'头',borderRight:'trend-number'});
    },
    tail(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        arr.push({num:item[1]+'尾',borderRight:'trend-number'});
    },
    heshuang(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        var count = (item[0]/1) +(item[1]/1)
        var num=  count%2 == 0?'合双':'合单'
        arr.push({num:num,borderRight:'trend-number'});
    },
    heshu(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        var count = (item[0]/1) +(item[1]/1)
        arr.push({num:count+"合",borderRight:'trend-number'});
    },
    daxiao(numberList,arr){
        var ruslut = '';
        var item  =  this.getListLastNumber(numberList);
        ruslut = item/1 > 25 ? "大于>25":"小于<25";
        if(item == 25){
           ruslut = "等于=25"
        }
        arr.push({num:ruslut,borderRight:'trend-number'});
    },
    countNumber(numberList,arr){
        var ruslut = 0;
        arrayUtil.forEach(numberList,item =>{
            var num = item/1;
            ruslut+=num;
        })
        ruslut = ruslut/1 >= 175 ? ruslut+"≥176": ruslut+"≤175";
        arr.push({num:ruslut,borderRight:'trend-number'});
    }
}