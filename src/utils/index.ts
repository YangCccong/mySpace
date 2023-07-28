export function arrToTree(array, paramsKey) {
    // parentId 和id 都是字符串
    const treeList = [],
            map = {}
    const parentId = paramsKey.parentId;
    const id = paramsKey.id;
    let copyArr = JSON.parse(JSON.stringify(array));
    // 筛选出没有父级的数据
    // array.forEach(function(item){
    // 	copyArr = copyArr.filter(function(child){
    // 		return child[parentId] !== item[id]
    // 	})
    // })

    copyArr.forEach(item => {
        item.children = []
        map[item[id]] = item
    });
    console.log(map)
    copyArr.forEach(item => {
        const parent = map[item[parentId]]
        if (parent) {
            parent.children.push(item)
        } else {
            treeList.push(item)
        }
    })

    return treeList
    // copyArr = copyArr.filter(function (child) {
    //     return !child[parentId]
    // })
    // // 递归转换
    // function treeLoop(arr = [], total = []) {
    //     for (let i = 0; i < arr.length; i++) {
    //         const aid = arr[i][id]
    //         let children = total.filter(function (child) {
    //             return child[parentId] === aid
    //         });
    //         if (children.length > 0) {
    //             children = treeLoop(children, total);
    //         }
    //         if (children.length) {
    //             arr[i].children = children;
    //         }
    //     }
    //     return arr;
    // }
    // return treeLoop(copyArr, array)
}