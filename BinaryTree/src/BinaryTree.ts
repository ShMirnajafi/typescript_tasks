interface IBinaryTree<T> {
    insert: (value: T) => void;

    search: (value: T) => boolean;
}

class BTnode<T> {
    private data: T;
    private left_child?: BTnode<T>;
    private right_child?: BTnode<T>;
    private level: number = 1;

    constructor(value: T) {
        this.data = value;
    }

    public get value(): T {
        return this.data;
    }
    
    public get leftChild(): BTnode<T> | undefined {
        return this.left_child;
    }
    
    public get rightChild(): BTnode<T> | undefined {
        return this.right_child;
    }
    
    public get getLevel(): number {
        return this.level;
    }
    
    public set setLeftChild(node: BTnode<T>) {
        this.left_child = node;
    }
    
    public set setRightChild(node: BTnode<T>) {
        this.right_child = node;
    }
    
    public set setLevel(num: number) {
        this.level = num;
    }
}

type Nodes<T> = (BTnode<T>)[];

class BinaryTree<T> implements IBinaryTree<T> {
    private root?: BTnode<T>;
    private height: number = -1; 
    private levels: Nodes<T>[] = [];

    constructor (value?: T) {
        if (value) {
            this.root = new BTnode<T>(value);
            this.levels[0] = [];
            this.levels[0][0] = this.root;
        }
    }

    [Symbol.iterator]() {
        let temp_height = this.height;
        let temp_levels = this.levels;
        let current_level = 0;
        let current_index = 0;

        return {
            next(): IteratorResult<T> {
                if (current_index === temp_levels[current_level].length) {
                    current_index = 0;
                    current_level++;
                }

                let return_level = current_level;
                let return_index = current_index;
                let temp_level = temp_levels[return_level];

                if (current_level === temp_height) {
                    current_level = 0;
                    return {
                        done: true,
                        value: undefined
                    }
                } 
                else {
                    current_index++
                    return {
                        done: false,
                        value: temp_level[return_index].value
                    }
                }
            }
        }
    }

    public insert(value: T): boolean {
        if (!this.root) {
            this.root = new BTnode(value);
            this.height = this.root.getLevel;
            this.levels[0] = [];
            this.levels[0][0] = this.root;
            return true;
        } else {
            let temp_node = this.root;
            let new_node = new BTnode<T>(value);
    
            while (true) {
                if (value > temp_node.value) {
                    if (temp_node.rightChild) {
                        temp_node = temp_node.rightChild;
                    } else {
                        temp_node.setRightChild = new_node;
                        new_node.setLevel = temp_node.getLevel + 1;
                        if (!this.levels[new_node.getLevel - 1]) {
                            this.levels[new_node.getLevel - 1] = [];
                        }
                        (this.levels[new_node.getLevel - 1]).push(new_node);
                        this.setMaxHeight(new_node.getLevel);
                        return true;
                    }
                } else if (value < temp_node.value) {
                    if (temp_node.leftChild) {
                        temp_node = temp_node.leftChild;
                    } else {
                        temp_node.setLeftChild = new_node;
                        new_node.setLevel = temp_node.getLevel + 1;
                        if (!this.levels[new_node.getLevel - 1]) {
                            this.levels[new_node.getLevel - 1] = [];
                        }
                        (this.levels[new_node.getLevel - 1]).push(new_node);
                        this.setMaxHeight(new_node.getLevel);
                        return true;
                    }
                } else {
                    return false;
                }
            }
        }
    }

    public search(value: T): boolean {
        if (!this.root) {
            return false;
        } else {
            let temp_node = this.root;

            while (temp_node.value !== value) {
                if (value > temp_node.value) {
                    if (!temp_node.rightChild) {
                        return false;
                    } else {
                        temp_node = temp_node.rightChild;
                    }
                } else {
                    if (!temp_node.leftChild) {
                        return false;
                    } else {
                        temp_node = temp_node.leftChild;
                    }
                }
            }
            return true;
        }
        
    }

    public traverseInOrder(node: BTnode<T> | undefined): void {
        if (node) {
            this.traverseInOrder(node.leftChild);
            console.log(" " + node.value);
            this.traverseInOrder(node.rightChild);
        }
    }

    public traversePreOrder(node: BTnode<T> | undefined): void {
        if (node) {
            console.log(" " + node.value);
            this.traverseInOrder(node.leftChild);
            this.traverseInOrder(node.rightChild);
        }
    }

    public traversePostOrder(node: BTnode<T> | undefined): void {
        if (node) {
            this.traverseInOrder(node.leftChild);
            this.traverseInOrder(node.rightChild);
            console.log(" " + node.value);
        }
    }

    private setMaxHeight(num: number): void {
        if (num > this.height) {
            this.height = num;
        }
    }

    public getRoot(): BTnode<T> | undefined {
        return this.root;
    }

    
    public get leftNode(): BTnode<T> | undefined {
        let temp_node = this.root;

        while (temp_node?.leftChild) {
            temp_node = temp_node.leftChild;
        }
        return temp_node;
    }
    
    
    public get rightNode(): BTnode<T> | undefined {
        let temp_node = this.root;

        while (temp_node?.rightChild) {
            temp_node = temp_node.rightChild;
        }
        return temp_node;
    }
    
    public get getHeight(): number {
        return this.height;
    }
    
    public level(num: number): (BTnode<T>)[] {
        return this.levels[num] as BTnode<T>[];
    }
    
}

let binaryTree = new BinaryTree<number>;

//binaryTree.insert(8);
binaryTree.insert(10);
console.log("height :" + binaryTree.getHeight);
binaryTree.insert(20);
binaryTree.insert(30);
binaryTree.insert(5);
binaryTree.insert(8);
binaryTree.insert(3);
binaryTree.insert(9);
// console.log(binaryTree);
// console.log(binaryTree.leftNode);
// console.log(binaryTree.rightNode);

console.log("root is: " + binaryTree.getRoot()?.value);
console.log("is contain 3: " + binaryTree.search(3));
console.log("is contain 6: " + binaryTree.search(6));
console.log("height :" + binaryTree.getHeight);

console.log("level 0:" + binaryTree.level(0));
console.log("level 1:" + binaryTree.level(1));
console.log("level 2:" + binaryTree.level(2));
console.log("level 3:" + binaryTree.level(3));

console.log("iterator :");
for (const n of binaryTree) {
    console.log(n);
}

console.log('[');
binaryTree.traverseInOrder(binaryTree.getRoot());
console.log(']');

console.log('[');
binaryTree.traverseInOrder(binaryTree.getRoot()?.leftChild);
console.log(']');

console.log('[');
binaryTree.traverseInOrder(binaryTree.getRoot()?.rightChild);
console.log(']');

console.log('[');
binaryTree.traversePostOrder(binaryTree.getRoot());
console.log(']');

console.log('[');
binaryTree.traversePreOrder(binaryTree.getRoot());
console.log(']');