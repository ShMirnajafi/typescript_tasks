interface IBinaryTree<T> {
    insert: (value: T) => void;

    search: (value: T) => boolean;
}

class BTnode<T> {
    private data: T;
    private left_child?: BTnode<T>;
    private right_child?: BTnode<T>;

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
    
    
    public set leftChildValue(value: T) {
        this.left_child = new BTnode(value);
    }
    
    public set rightChildValue(value: T) {
        this.right_child = new BTnode(value);
    }
    
}

class BinaryTree<T> implements IBinaryTree<T> {
    private root?: BTnode<T>;

    public insert(value: T): boolean {
        if (!this.root) {
            this.root = new BTnode(value);
            return true;
        } else {
            let temp_node = this.root;
    
            while (true) {
                if (value > temp_node.value) {
                    if (temp_node.rightChild) {
                        temp_node = temp_node.rightChild;
                    } else {
                        temp_node.rightChildValue = value;
                        return true;
                    }
                } else if (value < temp_node.value) {
                    if (temp_node.leftChild) {
                        temp_node = temp_node.leftChild;
                    } else {
                        temp_node.leftChildValue = value;
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

    public getRoot(): BTnode<T> | undefined{
        return this.root;
    }

}

let binaryTree = new BinaryTree<number>;

binaryTree.insert(8);
binaryTree.insert(10);
binaryTree.insert(7);
binaryTree.insert(4);
binaryTree.insert(5);
binaryTree.insert(3);

console.log("root is: " + binaryTree.getRoot()?.value);
console.log("is contain 3: " + binaryTree.search(3));
console.log("is contain 6: " + binaryTree.search(6));

console.log('[');
binaryTree.traverseInOrder(binaryTree.getRoot());
console.log(']');

console.log('[');
binaryTree.traversePostOrder(binaryTree.getRoot());
console.log(']');

console.log('[');
binaryTree.traversePreOrder(binaryTree.getRoot());
console.log(']');