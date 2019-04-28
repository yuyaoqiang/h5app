
export default {
    indexOf(array, value){
        var index = -1;
        if (array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] == value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    },

    removeRepeat(array){
        var result = [array[0]];
        for (var i = 1; i < array.length; i++) {
            var repeat = false;
            for (var j = 0; j < result.length; j++) {
                if (array[i] == result[j]) {
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                result.push(array[i]);
            }
        }
        return result;
    },
    remove(array, item){
        var index = this.indexOf(array, item);
        if (index >= 0) {
            array.splice(index, 1);
        }
        return array;
    },
    cover(array,newArray){
        this.clear(array);
        this.pushAll(array,newArray);
    },
    sortToHeight(array){
        array.sort(function(a,b){
            return a-b});
    },
    sortToLow(array){
        array.sort(function(a,b){
            return b-a});
    },
    clear(array){
        if (array) {
            array.splice(0, array.length);
        }
    },
    findFirst(array, expression){
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            var result = expression(item);
            if (result) {
                return item;
            }
        }
        return null;
    },
    pushAll(array, subArray){
        this.forEach(subArray,item=>{
            array.push(item);
        });
        return array;
    },
    randomArray(len) {
        var result = new Array();
        while (true) {
            var r = parseInt(len * Math.random())
            var index = result.indexOf(r);
            if (index > -1) {
                continue;
            }
            result.push(r);
            if (result.length == len) {
                break;
            }
        }
        return result;
    },
    filter(array, expression){
        var tmp = new Array();
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            var result = expression(item);
            if (result) {
                tmp.push(item);
            }
        }
        return tmp;
    },
    join(array, action, separator){
        var tmp = "";
        separator = separator ? separator : ",";
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            var result = action(item);
            if(result == null) continue;
            tmp += result+separator;
        }

        if(tmp != ""){
            tmp = tmp.substr(0,tmp.length-1);
        }

        return tmp;
    },
    isEmpty(array){
        return array == null || array.length == 0;
    },
    isNotEmpty(array){
        return this.isEmpty(array)==false;
    },
    deepCopy: function (array) {
        var newArray = new Array();
        for (var i = 0; i < array.length; i++) {
            var source = array[i];
            var result = {};
            for (var key in source) {
                result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
            }
            newArray.push(result);
        }
        return newArray;
    },
    forEach:function (array, action) {
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            action(item,i);
        }
    },
    count:function (array,action) {
        var count=0;
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            var result = action(item,i);
            if(result ==true){
                count++;
            }
        }

        return count;
    },
    insertAt(array,index, item){
        array.splice(index, 0, item);
    },
    repeat(str){
        var n = [];
        for(var i = 0; i < str.length; i++)
        {
            if (n.indexOf(str[i]) == -1) n.push(str[i]);
        }
        return n;
    },
}