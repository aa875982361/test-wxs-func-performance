function $gwh() {
    function x() {
    }
    x.prototype =
    {
        hn: function (obj, all) {
            if (typeof (obj) == 'object') {
                var cnt = 0;
                var any1 = false, any2 = false;
                for (var x in obj) {
                    any1 = any1 | x === '__value__';
                    any2 = any2 | x === '__wxspec__';
                    cnt++;
                    if (cnt > 2) break;
                }
                return cnt == 2 && any1 && any2 && (all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h') ? "h" : "n";
            }
            return "n";
        },
        nh: function (obj, special) {
            return { __value__: obj, __wxspec__: special ? special : true }
        },
        rv: function (obj) {
            return this.hn(obj, true) === 'n' ? obj : this.rv(obj.__value__);
        },
        hm: function (obj) {
            if (typeof (obj) == 'object') {
                var cnt = 0;
                var any1 = false, any2 = false;
                for (var x in obj) {
                    any1 = any1 | x === '__value__';
                    any2 = any2 | x === '__wxspec__';
                    cnt++;
                    if (cnt > 2) break;
                }
                return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__));
            }
            return false;
        }
    }
    return new x;
}
wh = $gwh();
function $gdc(o, p, r) {
    o = wh.rv(o);
    if (o === null || o === undefined) return o;
    if (o.constructor === String || o.constructor === Boolean || o.constructor === Number) return o;
    if (o.constructor === Object) {
        var copy = {};
        for (var k in o)
            if (o.hasOwnProperty(k))
                if (undefined === p) copy[k.substring(3)] = $gdc(o[k], p, r);
                else copy[p + k] = $gdc(o[k], p, r);
        return copy;
    }
    if (o.constructor === Array) {
        var copy = [];
        for (var i = 0; i < o.length; i++) copy.push($gdc(o[i], p, r));
        return copy;
    }
    if (o.constructor === Date) {
        var copy = new Date();
        copy.setTime(o.getTime());
        return copy;
    }
    if (o.constructor === RegExp) {
        var f = "";
        if (o.global) f += "g";
        if (o.ignoreCase) f += "i";
        if (o.multiline) f += "m";
        return (new RegExp(o.source, f));
    }
    if (r && o.constructor === Function) {
        if (r == 1) return $gdc(o(), undefined, 2);
        if (r == 2) return o;
    }
    return null;
}

function main(){
    const tempObj = {
        "type":"scroll",
        "timeStamp":333626,
        "target":{
            "id":"",
            "offsetLeft":0,
            "offsetTop":0,
            "dataset":{
                "cardWidth":115
            }
        },
        "currentTarget":{
            "id":"",
            "offsetLeft":0,
            "offsetTop":0,
            "dataset":{
                "cardWidth":115
            }
        },
        "mark":{
    
        },
        "detail":{
            "scrollLeft":0,
            "scrollTop":0,
            "scrollHeight":206,
            "scrollWidth":1864,
            "deltaX":1287,
            "deltaY":0
        },
        "mut":false,
        "instance":{
            "selectAllComponents":null,
            "selectComponent":null,
            "removeClass":null,
            "addClass":null,
            "hasClass":null,
            "setStyle":null,
            "getDataset":null,
            "getState":null,
            "triggerEvent":null,
            "callMethod":null,
            "requestAnimationFrame":null,
            "getComputedStyle":null,
            "setTimeout":null,
            "clearTimeout":null,
            "getBoundingClientRect":null,
            "animate":null,
            "clearAnimation":null
        }
    }
    const obj = new Array(100).fill(0).map((item, index) => {
        return {
            ...tempObj,
            id: index,
        }
    })
    let preTime = +new Date()
    let res = $gdc(obj, "nv_")
    let endTime = +new Date()
    console.log("res", res)
    console.log("runTime", endTime - preTime);
    preTime = endTime
    res = JSON.parse(JSON.stringify(obj))
    endTime = +new Date()
    console.log("runTime", endTime - preTime);
}
main()