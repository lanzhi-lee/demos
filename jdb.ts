import fs from 'fs'
import path from 'path'
import { filter, findLastIndex, matches, pullAt, remove } from 'lodash'

interface NormalIndexType {
  [key: string]: any
}

interface Course {
  course: {
    name: string
    time: number
  }[]
  [key: string]: any[]
}

interface DataBase {
  [key: string]: any[]
}

export class JSONDataBase<T extends DataBase> {
  /** 是否处于写入等待状态 */
  private _isPending = false
  /** 本地数据库json的路径 */
  private _path: string
  /** 全部数据集 */
  private _data: T
  /** 当前集合名称 */
  private _curCollectionName = ''

  /** 当前指针指向的集合 */
  private get _curCollection() {
    return this._data[this._curCollectionName]
  }

  /** 当前指针指向的集合 */
  private set _curCollection(val) {
    // NOTE https://github.com/microsoft/TypeScript/pull/30769
    ;(this._data as DataBase)[this._curCollectionName] = val
  }

  /** 初始化数据库，需传入持久化json数据的文件路径 */
  public constructor(dataPath: string) {
    this._path = dataPath
    this._data = JSON.parse(fs.readFileSync(this._path).toString() || '{}')
  }

  /** 将当前的集合指针切换至指定的值 */
  public use(collectionName: string) {
    if (!(collectionName in this._data)) {
      ;(this._data as DataBase)[collectionName] = []
    }
    this._curCollectionName = collectionName
  }

  public insert(data: any) {
    this._data[this._curCollectionName].push(data)

    // TODO 写入文件
    // this.save()
  }

  public find(conditions: NormalIndexType) {
    if (Object.keys(conditions).length === 0) {
      return this._curCollection
    }

    return filter(this._curCollection, matches(conditions))
  }

  public findOne(conditions: NormalIndexType) {
    if (Object.keys(conditions).length === 0) return null

    return this._curCollection[findLastIndex(this._curCollection, conditions)]
  }

  public findAndUpdate(conditions: NormalIndexType, data: NormalIndexType) {
    let _hasUpdated = false
    this._curCollection.forEach((elem, index) => {
      if (matches(conditions)(elem)) {
        if (!_hasUpdated) _hasUpdated = true

        this._curCollection[index] = { ...this._curCollection[index], ...data }
      }
    })

    return { code: 0, msg: _hasUpdated ? '更新成功！' : '未查找到符合条件的值！' }
  }

  public findOneAndUpdate(conditions: NormalIndexType, data: NormalIndexType) {
    if (Object.keys(conditions).length === 0) return { code: 1, msg: '至少需要一个查找条件！' }

    const indexFlag = findLastIndex(this._curCollection, conditions)

    if (indexFlag === -1) return { code: 2, msg: '未查找到符合条件的值！' }

    this._curCollection[indexFlag] = { ...this._curCollection[indexFlag], ...data }
    return { code: 0, msg: '更新成功！' }
  }

  public findAndDelete(conditions: NormalIndexType) {
    const deletedElems = remove(this._curCollection, matches(conditions))
    return { code: 0, msg: '删除成功！', data: deletedElems }
  }

  public findOneAndDelete(conditions: NormalIndexType) {
    if (Object.keys(conditions).length === 0) return { code: 1, msg: '至少需要一个查找条件！' }

    const indexFlag = findLastIndex(this._curCollection, conditions)

    if (indexFlag === -1) return { code: 2, msg: '未查找到符合条件的值！' }

    const deletedElems = pullAt(this._curCollection, indexFlag)

    return { code: 0, msg: '更新成功！', data: deletedElems }
  }

  /** 将内存中的数据保存至文件 */
  public save() {
    this._setPending(true)
    fs.writeFileSync(this._path, JSON.stringify(this._data), { encoding: 'utf-8' })
    this._setPending(false)
  }

  /** 设置写入等待状态 */
  private _setPending(pending: boolean) {
    this._isPending = pending
    console.log(this._isPending)
  }
}

const jdb = new JSONDataBase<Course>(path.resolve(__dirname, './db.json'))

jdb.use('course')

console.log(jdb.find({ time: 1 }))
console.log(jdb.find({ name: 'eat' }))
console.log(jdb.findOne({ name: 'eat' }))

jdb.insert({ name: 'inserted by cmd', time: 999 })
console.log(jdb.find({}))

jdb.findOneAndUpdate({ name: 'inserted by cmd' }, { time: 998 })
console.log(jdb.find({}))

jdb.findOneAndDelete({ name: 'inserted by cmd' })
console.log(jdb.find({}))

jdb.findAndUpdate({ name: 'eat' }, { time: 11 })
console.log(jdb.find({}))
// jdb.save()
