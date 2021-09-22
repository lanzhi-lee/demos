/**
 * 获取 SelfData格式的数据
 * @param {Object} data 
 */
function getSelfData(data) {
    let tempArr = []
    for (let key in data) {
        let temp = {
            "type": 1,
            "child_key_list": [],
            "children": []
        }
        temp.key = data[key]
        temp.label = data[key]
        temp.value = data[key]
        tempArr.push(temp)
    }
    return tempArr
}