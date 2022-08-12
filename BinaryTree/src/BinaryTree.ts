interface IBinaryTree<T> {
    insert: (value: T) => void;

    search: (value: T) => boolean;
}

class BTnode<T> {
    value: T;
    left_child?: BTnode<T>;
    right_child?: BTnode<T>;

    constructor(value: T) {
        this.value = value;
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
                    if (temp_node.right_child) {
                        temp_node = temp_node.right_child;
                    } else {
                        temp_node.right_child = new BTnode(value);
                        return true;
                    }
                } else if (value < temp_node.value) {
                    if (temp_node.left_child) {
                        temp_node = temp_node.left_child;
                    } else {
                        temp_node.left_child = new BTnode(value);
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
                    if (!temp_node.right_child) {
                        return false;
                    } else {
                        temp_node = temp_node.right_child;
                    }
                } else {
                    if (!temp_node.left_child) {
                        return false;
                    } else {
                        temp_node = temp_node.left_child;
                    }
                }
            }
            return true;
        }
        
    }

    public traverseInOrder(node: BTnode<T> | undefined): void {
        if (node) {
            this.traverseInOrder(node.left_child);
            console.log(" " + node.value);
            this.traverseInOrder(node.right_child);
        }
    }

    public traversePreOrder(node: BTnode<T> | undefined): void {
        if (node) {
            console.log(" " + node.value);
            this.traverseInOrder(node.left_child);
            this.traverseInOrder(node.right_child);
        }
    }

    public traversePostOrder(node: BTnode<T> | undefined): void {
        if (node) {
            this.traverseInOrder(node.left_child);
            this.traverseInOrder(node.right_child);
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