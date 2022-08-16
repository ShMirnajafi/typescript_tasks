
import {IStack} from "./IStack";

class Stack<T> implements IStack<T>, Iterable<T>{
    private contents: T[] = [];
    private counter: number = 0;

    [Symbol.iterator]() {
        return this;
    }

    public next(): IteratorResult<T> {
        if (this.counter === this.contents.length) {
            let temp_counter = this.counter;
            this.counter = 0;
            return {
                done: true,
                value: this.contents[temp_counter]
            }
        } else {
            let temp_counter = this.counter;
            this.counter++
            return {
                done: false,
                value: this.contents[temp_counter]
            }
        }

    }

    public hasNext() : IteratorResult<T> {
        if (this.counter === this.contents.length) {
            return {
                done: true,
                value: this.contents[this.counter]
            }
        } else {
            return {
                done: false,
                value: this.contents[this.counter]
            }
        }

    }
    
    public push(value: T){
        this.contents.push(value);
    }

    public pop (): T | null{
       return this.contents.pop() as T;
    }

    public topValue (): null | T{
        return this.contents.length === 0 ? null : this.contents[this.contents.length -1];
    }

    public isEmpty (): boolean {
        return this.contents.length === 0 ? true : false;
    }

    public valueOf (index: number): string | T {
        return (index > (this.contents.length - 1) || index < 0)? "{this home is undefined}" : this.contents[index];
    }

    public lenght (): number{
        return this.contents.length;
    }

}
let stack = new Stack<string>;
//test the stack class
console.log("is stack empty : " + stack.isEmpty() + "\n");

console.log("top value is : " + stack.topValue() + "\n");

stack.push('1');
stack.push('hi');
stack.push('true');

console.log("\n" + "is stack empty : " + stack.isEmpty() + "\n");

console.log("top value is : " + stack.topValue() + "\n");

for (let index = -1; index < 5; index++) {
    console.log(index + " :" + stack.valueOf(index));
}
console.log("with iterator: ");
while (!stack.hasNext().done) {
    console.log(stack.next().value);
}
stack.next();
console.log("with iterator: ");
for (const s of stack) {
    console.log(s);
}
console.log();

stack.pop();

for (let index = -1; index < 5; index++) {
    console.log(index + " :" + stack.valueOf(index));
}
console.log("with iterator: ");
for (const s of stack) {
    console.log(s);
}

console.log("\n" + "top value is : " + stack.topValue() + "\n");

stack.pop();
stack.pop();

for (let index = -1; index < 5; index++) {
    console.log(index + " :" + stack.valueOf(index));
}
console.log("with iterator: ");
for (const s of stack) {
    console.log(s);
}
