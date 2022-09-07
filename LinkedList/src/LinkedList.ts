interface ILinkedList<T> {
    add: (value: T) => void;

    addFirst: (value: T) => void;

    remove: (value: T) => boolean;

    print: () => void;
}

class node<T> {
    private data: T;
    private next_node: node<T> | null;
    private previous_node: node<T> | null;

    constructor (data: T) {
        this.data = data;
        this.next_node = null;
        this.previous_node = null;
    }
    
    public get nextNode(): node<T> | null {
        return this.next_node;
    }

    public get value(): T | null {
        return this.data;
    }

    public get previousNode(): node<T> |null {
        return this.previous_node;
    }
    
    public set previous(node: node<T>) {
        this.previous_node = node;
    }
    
    
    public addNode (node: node<T> | null): void {
        this.next_node = node;
    }

    public removeNextNode (): void {
        this.next_node = null;
    }
}

class LinkedList<T> implements ILinkedList<T> {
    private head: node<T>;
    private final_node: node<T>;

    [Symbol.iterator]() {
        let temp_node: node<T> | null = this.head;
        let temp_node2: node<T> | null = this.final_node;
        let temp_head = this.head;
        let temp_final_node = this.final_node;

        return {
            next(): IteratorResult<T> {
                let temp_return_node = temp_node;
                if (!temp_node) {
                    temp_node = temp_head;
                    return {
                        done: true,
                        value: temp_return_node?.value
                    }
                } else {
                    temp_node = temp_node.nextNode!;
                    return {
                        done: false,
                        value: temp_return_node!.value!
                    }
                }
            },
            
            previous(): IteratorResult<T> {
                let temp_return_node = temp_node2;
                if (!temp_node2) {
                    temp_node2 = temp_final_node;
                    //console.log(temp_final_node);
                    return {
                        done: true,
                        value: temp_return_node?.value
                    }
                } else {
                    temp_node2 = temp_node2.previousNode;
                    return {
                        done: false,
                        value: temp_return_node!.value!
                    }
                }
            }
        };
    }

    constructor (value: T) {
        this.head = new node(value);
        this.final_node = new node(value);
    }

    public add(value: T): void {
        let temp_node: node<T> = this.head;
        while (temp_node.nextNode !== null) {
            temp_node = temp_node.nextNode;
        }
        temp_node.addNode(new node(value));
        let new_node: node<T> = temp_node.nextNode!;
        new_node!.previous = temp_node;
        this.final_node = new_node!;
        console.log(this.final_node);
    }

    public addFirst(value: T): void {
        let temp_node: node<T> = this.head; 
        let fisrt_node: node<T> = new node(value);
        fisrt_node.addNode(temp_node);
        temp_node.previous = fisrt_node;
        this.head = fisrt_node;
    }

    public remove(value: T): boolean {
        let temp_node: node<T> = this.head;
        while (temp_node.nextNode !== null) {
            if (temp_node.nextNode.value === value) {
                let temp_next_node: node<T> | null = temp_node.nextNode.nextNode;
                temp_node.removeNextNode();
                if (temp_next_node !== null) {
                    temp_node.addNode(temp_next_node);
                    temp_next_node.previous = temp_node;
                }
                return true;
            }
            temp_node = temp_node.nextNode;
        }
        return false;
    }

    public print(): void {
        let temp_node: node<T> = this.head;
        console.log('[');
        while (temp_node !== null) {
            console.log(temp_node.value);
            temp_node = temp_node.nextNode!;
        }
        console.log(']');
    }
    
    // public get finalNode(): node<T> {
    //     let temp_node = this.head;

    //     while (temp_node.nextNode) {
    //         temp_node = temp_node.nextNode;
    //     }
    //     return temp_node;
    // }
    
}

let linkedlist = new LinkedList<number>(1);

linkedlist.add(2);
linkedlist.add(4);
linkedlist.add(7);
linkedlist.add(0);
linkedlist.print();
let iterator = linkedlist[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log("-------------");
console.log(iterator.previous());
console.log(iterator.previous());
console.log(iterator.previous());
console.log(iterator.previous());
console.log(iterator.previous());
console.log(iterator.previous());
console.log(iterator.previous());

console.log("with iterator:");
for (const n of linkedlist) {
    console.log(n);
}

linkedlist.remove(2);
linkedlist.print();
console.log("with iterator:");
for (const n of linkedlist) {
    console.log(n);
}

linkedlist.addFirst(-1);
linkedlist.print();

linkedlist.addFirst(20);
linkedlist.print();

console.log("with iterator:");
for (const n of linkedlist) {
    console.log(n);
}

console.log(linkedlist.remove(-1) + "\n" + linkedlist.remove(-3));
linkedlist.print();