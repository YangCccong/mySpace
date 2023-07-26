export function arrToTree(array, paramsKey) {
    // pid 和id 都是字符串
    const pid = paramsKey.pid;
    const id = paramsKey.id;
    let copyArr = JSON.parse(JSON.stringify(array));
    // 筛选出没有父级的数据
    // array.forEach(function(item){
    // 	copyArr = copyArr.filter(function(child){
    // 		return child[pid] !== item[id]
    // 	})
    // })
    copyArr = copyArr.filter(function (child) {
        return !child[pid]
    })
    console.log(copyArr)
    // 递归转换
    function treeLoop(arr = [], total = []) {
        for (let i = 0; i < arr.length; i++) {
            const aid = arr[i][id]
            let children = total.filter(function (child) {
                return child[pid] === aid
            });
            if (children.length > 0) {
                children = treeLoop(children, total);
            }
            if (children.length) {
                arr[i].children = children;
            }
        }
        return arr;
    }
    return treeLoop(copyArr, array)
}