// ========= 类型定义 =========

/**
 * @typedef {Object} BaseInterface
 * @property {number} num
 * @property {string} str
 * @property {boolean} boo
 * @property {Array<string>} arr1
 * @property {number[]} arr2
 * @property {{key1: number, key2: string}} obj1
 * @property {{[key: string]: string}} obj2
 * @property {() => void} fun1
 * @property {(param1: number, param2: string) => void} fun2
 * @property {() => number} fun3
 * 
 * @property {string} [optional] 可选参数
 * 
 * @property {'name' | 'age' | 'gender'} str_literal 字符串字面量
 * 
 * @property {[number, string]} tuple 元组
 * 
 * @property {Record<'key1'|'key2'|'key3', string>} Record
 */

/**
 * @typedef {Pick<BaseInterface, 'num'|'str'>} demoPick
 * https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
 */

// ========= 基本使用 =========

/** 这是一个普通变量 */
let baseVar = 1

/** @type {number} */
let baseVar1 = 1

/** @type {BaseInterface['num']} */
let baseVar2 = 1

// ========= 标记函数 =========

// 自动类型推断
function fun1() {
  return 1
}
const fun2 = () => 2

/** @type {() => void} */
let fun3;

/**
 * 标记函数参数类型
 * @param {number} param1 
 * @param {string} param2 
 */
function fun4(param1, param2) {
  return 0
}

/**
 * 标记函数返回值类型
 *  @returns {number} */
function fun5() {
  if (exp1) return var1
  else return var2
}

// ========= 标记类 =========

class Class1 {
  /**
   * @param {number} param1 
   * @param {number} param2 
   */
  constructor(param1, param2) {

    /** 普通类成员 */
    this.var2 = 1
  }
  /** @type {string} */
  static var1

  static fun1() { }
  /** 普通类方法 */
  fun2() { }
}

// Class1.var1
// Class1.fun1()
const c1 = new Class1()
// c1.var2
c1.fun2()