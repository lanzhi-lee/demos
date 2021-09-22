class Stack {
    constructor() {
        this.items = []
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
    clear() {
        this.items = [];
    }
    print() {
        console.log(this.items.toString());
    }
}

const question = `{({[()]})}`

const map = {
    '{': '}',
    '[': ']',
    '(': ')'
}

function test(str) {
    let arr = str.split('')
    let stk = new Stack()
    arr.forEach(elem => {
        console.log(stk.peek(), elem)

        if (stk.size === 0) {
            stk.push(elem)
        } else {

            if (map[stk.peek()] === elem) {
                stk.pop()
                console.log(stk.items)
            } else {
                stk.push(elem)
            }
        }
    });
    return stk.isEmpty()
}
