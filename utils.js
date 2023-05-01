function throttle(fun, time = 100) {
    let begin = 0
    let timer = null;
    return function () {
        clearTimeout(timer)
        let flag = false
        let cur = new Date().getTime()
        if (cur - begin > time) {
            fun.apply(this, arguments)
            begin = cur
            flag = true
        }
        if (!flag) {
            timer = setTimeout(() => {
                fun.apply(this, arguments)
            }, time)
        }
    }
}
//对象数组去重

function deepDouble(arr) {
    let obj = {}
    let list = arr.reduce(function (item, next) {
        obj[next.key] ? '' : obj[next.key] = true && item.push(next)
        return item
    }, [])
    return list
}