interface IQueue<T> {
    enqueue: (value: T) => void;

    dequeue: () => T;

    lenght: () => number;

    firstValue: () => T;

    lastValue: () => T;

    indexOf: (value: T) => number | null;

    valueOf: (index: number) => T | null;
}

class Queue<T> implements IQueue<T>{
    private contents: T[] = [];
    
    public enqueue(value: T): void {
        this.contents.push(value);
    }

    public dequeue(): T {
        let content = this.contents[0];
        for (let index = 0; index < this.contents.length - 1; index++) {
            this.contents[index] = this.contents[index + 1];
        }
        this.contents.pop();
        return content;
    }

    public lenght(): number {
        return this.contents.length;
    }

    public firstValue(): T {
        return this.contents[0];
    }

    public lastValue(): T {
        return this.contents[this.contents.length - 1];
    }

    public indexOf(value: T): number | null{
        for (let index = 0; index < this.contents.length; index++) {
            if (this.contents[index] === value) {
                return index;
            }
        }
        return null;
    }

    public valueOf(index: number): T | null{
        if (index > this.contents.length - 1 || index < 0) {
            return this.contents[index];
        } else {
            return null;
        }
    }

    public print(): void {
        console.log('[')
        for (let index = this.contents.length - 1; index >= 0; index--) {
            console.log(index + " : " + this.contents[index]);
        }
        console.log(']');
    }
}

let queue = new Queue<number>;

console.log("lenght : "+ queue.lenght());

queue.enqueue(1);

queue.print();

console.log("first value is: " + queue.firstValue() + " - last value is: " + queue.lastValue());

queue.enqueue(4);
queue.enqueue(100);

console.log("first value is: " + queue.firstValue() + " - last value is: " + queue.lastValue());

queue.enqueue(7);
queue.enqueue(15);

queue.print();

console.log(queue.dequeue());
queue.print();

console.log(queue.dequeue());
queue.print();

console.log(queue.dequeue());
queue.print();

