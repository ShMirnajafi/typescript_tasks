interface ILinkedList<T> {
    addEnd: (value: T) => void;

    addFirst: (value: T) => void;

    remove: (value: T) => boolean;

    print: () => void;
}

type node<T> = [
    data: T | null,
    next_node: node<T> | null
];

class LinkedList<T> implements ILinkedList<T> {
    private head: node<T> = [null, null];

    constructor (value: T) {
        this.head = [value, null];
    }

    public addEnd(value: T): void {
        let temp_node: node<T> = this.head;
        while (temp_node[1] !== null) {
            temp_node = temp_node[1];
        }
        temp_node[1] = [value, null];
        temp_node[1][1] = [null, null];
    }

    public addFirst(value: T): void {
        let temp_node: node<T> = this.head; 
        let fisrt_node: node<T> = [value, temp_node];
        this.head = fisrt_node;
    }

    public remove(value: T): boolean {
        let temp_node: node<T> = this.head;
        while (temp_node[1] !== null) {
            if (temp_node[1][0] === value) {
                temp_node[1] = temp_node[1][1];
                return true;
            }
            temp_node = temp_node[1];
        }
        return false;
    }

    public print(): void {
        let temp_node: node<T> = this.head;
        console.log('[');
        while (temp_node[1] !== null) {
            if (temp_node[0] === null) {
                temp_node = temp_node[1];
            } else {
                console.log(temp_node[0]);
                temp_node = temp_node[1];   
            }
        }
        console.log(']');
    }
}

let linkedlist = new LinkedList<number>(1);

linkedlist.addEnd(2);
linkedlist.addEnd(4);
linkedlist.addEnd(7);
linkedlist.addEnd(0);
linkedlist.print();

linkedlist.remove(2);
linkedlist.print();

linkedlist.addFirst(-1);
linkedlist.print();

linkedlist.addFirst(20);
linkedlist.print();

console.log(linkedlist.remove(-1));
linkedlist.print();