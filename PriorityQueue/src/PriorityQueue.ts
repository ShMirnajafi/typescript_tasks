interface IPriorityQueue<T> {
    enqueue: (value: T, priority?: number | undefined) => boolean;
    
    setPriority: (value: T, priority: number) => boolean;

    dequeue: () => component<T> | undefined;

    lenght: () => number;

    firstValue: () => component<T>;

    lastValue: () => component<T>;

    priorityOf: (value: T) => number | null;

    valueOf: (index: number) => component<T> | null;
}

type component<T> = [
    value: T, 
    priority: number
];

class PriorityQueue<T> implements IPriorityQueue<T>{
    private contents: component<T>[] = [];
    comparator: (a: component<T>, b: component<T>) => number;

    [Symbol.iterator]() {
        let counter: number = 0;
        let temp_contents = this.contents;

        return {
            next(): IteratorResult<T> {
                if (counter === temp_contents.length) {
                    let temp_counter = counter;
                    counter = 0;
                    return {
                        done: true,
                        value: temp_contents[temp_counter][0]
                    }
                } else {
                    let temp_counter = counter;
                    counter++
                    return {
                        done: false,
                        value: temp_contents[temp_counter][0]
                    }
                }
            }
        };
    }

    constructor(comparator: (a: component<T>, b: component<T>) => number) {
        this.comparator = comparator;
    }

    public enqueue(value: T, priority?: number | undefined): boolean {
        if (priority === undefined) {
            if (this.contents[this.contents.length - 1][1] === this.contents.length) {
                this.contents.push([value, this.contents[this.contents.length - 1][1] + 1]);
                return true;
            } else if (this.contents[this.contents.length - 1][1] > this.contents.length) {
                this.contents.push([value, 1]);
                let i = 1;
                while (!this.setPriority(value, i)) {
                    i++;
                }
                return true;
            } else {
                this.contents.push([value, this.contents.length]);
                return true;
            }
        } else {
            for (let index = 0; index < this.contents.length; index++) {
                if (this.contents[index][1] === priority) {
                    return false;
                }
            }
            this.contents.push([value, priority]);
            this.resetQueue();
            return true;
        }
    }

    public dequeue(): component<T> | undefined{
        // for (let index = 0; index < this.contents.length - 1; index++) {
        //     this.contents[index] = this.contents[index + 1];
        // }
        // this.contents.pop();
        this.resetQueue();
        
        return this.contents.pop();
    }

    public setPriority(value: T, priority: number):  boolean {
        for (let index = 0; index < this.contents.length; index++) {
            if (this.contents[index][1] === priority) {
                return false;
            }
        }
        for (let index = 0; index < this.contents.length; index++) {
            if (this.contents[index][0] === value) {
                this.contents[index][1] = priority;
                this.resetQueue();
                return true;
            }
        }
        return false;
    }

    public lenght(): number {
        return this.contents.length;
    }

    public firstValue(): component<T> {
        return this.contents[0];
    }

    public lastValue(): component<T> {
        return this.contents[this.contents.length - 1];
    }

    public priorityOf(value: T): number | null {
        for (let index = 0; index < this.contents.length; index++) {
            if (this.contents[index][0] === value) {
                return this.contents[index][1];
            }
        }
        return null;
    }

    public valueOf(index: number): component<T> | null {
        if (index > this.contents.length - 1 || index < 0) {
            return this.contents[index];
        } else {
            return null;
        }
    }

    public print(): void {
        console.log('[')
        for (let index = this.contents.length - 1; index >= 0; index--) {
            console.log(index + "- value: " + this.contents[index][0] + " - priority: " + this.contents[index][1]);
        }
        console.log(']');
    }

    private resetQueue(): void {
        // for (let i = 0; i < this.contents.length; i++) {
        //     for (let j = 0; j < this.contents.length; j++) {
        //         if (this.contents[i][1] < this.contents[j][1]) {
        //             let temp: component<T>;
        //             temp = this.contents[i];
        //             this.contents[i] = this.contents[j];
        //             this.contents[j] = temp;
        //         }
        //     }
        // }

        this.contents.sort(comparator);

        while (this.contents[0][1] !== 1) {
            for (let index = 0; index < this.contents.length; index++) {
                this.contents[index][1]--;
            }
        }
    }
}

function comparator<T>(a: component<T>, b: component<T>): number {
    if (a[1] > b[1]) {
        return 1;
    } else if (a[1] < b[1]) {
        return -1;
    } else {
        return 0;
    }
}

let pqueue = new PriorityQueue<number>(comparator);

pqueue.enqueue(1, 1);
pqueue.enqueue(7, 2);
pqueue.enqueue(4, 5);
pqueue.enqueue(6, 3);
pqueue.print();

pqueue.dequeue();
pqueue.print();

pqueue.enqueue(20);
pqueue.enqueue(30);
pqueue.enqueue(13);

pqueue.print();

pqueue.setPriority(7, 12);

pqueue.print();

console.log("priority of 7 is " + pqueue.priorityOf(7));

pqueue.dequeue();
pqueue.print();