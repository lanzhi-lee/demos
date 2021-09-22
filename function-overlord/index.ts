interface IDemo {
  acc: () => void
  acc: (param1: number) => void
  acc: () => void
  acc: () => void
}

class Demo {
  acc() { }
}

function pick(): string
function pick(param1: number): void
function pick(param1: number, param2: number): number

function pick(...params: number[]) {
  // if (typeof param1 === 'undefined') return 'string'
  let str: string
  let num: number
  if (params.length === 0) return str
  if (params.length === 1) return
  if (params.length === 2) return num
}