"use strict";

function BinaryTree() {

    this.rootNode = null;
}

BinaryTree.prototype = {

    // insert a new node in the correct position in the tree
    addNode: function(value) {

        // create a new node object
        var treeNode = {

            value: value,
            left: null,
            right: null
        }; 

        // check for an empty tree
        if (this.rootNode === null) {

            this.rootNode = treeNode;
        }

        else {

            // assign a temporary node
            var currentNode = this.rootNode;

            while (true) {

                // if the new value is less than this node's value, go left
                if (value < currentNode.value) {

                    // if there is no node to the left, this is the new node's position
                    if (currentNode.left === null) {

                        currentNode.left = treeNode;
                        break;
                    }

                    // if there is a node to the left, move on to this node and loop again
                    else {

                        currentNode = currentNode.left;
                    }
                }

                // if the new value is greater than this node's value, go right
                else if (value > currentNode.value) {

                    // if there is no node to the right, this is the new node's position
                    if (currentNode.right === null) {

                        currentNode.right = treeNode;
                        break;
                    }

                    // if there is a node to the right, move on to this node and loop again
                    else {

                        currentNode = currentNode.right;
                    }
                }

                // if the new value is equal to the current node's value, do not add the node
                else {

                    console.log("A node with the value of " + currentNode.value + " already exists!");
                    break;
                }
            }
        }
    },

    // search a node and return the path from the root if found
    findNode: function(value) {

        var searchNode = false,
            searchPath = "Search path for the value of " + value + ": ",
            currentNode = this.rootNode;

        // check for an empty tree
        while (!searchNode && currentNode) {

            // if the searched value is less than the current node, go left
            if (value < currentNode.value) {

                currentNode = currentNode.left;
                searchPath = searchPath + "left ";
            }

            // if the searched value is greater than the current node, go right
            else if (value > currentNode.value) {

                currentNode = currentNode.right;
                searchPath = searchPath + "right ";
            }

            // if the searched value is equal to the current node, end the search
            else {

                searchNode = true;
            }
        }

        // if the node is not found, return a message
        if (searchNode === false) {

            searchPath = "The node with the value of " + value + " has not been found!";
        }

        return searchPath;
    },

    // traverse the tree using the in-order traversal algorithm
    traverseTree: function(ownerMethod) {

        function orderTree(treeNode) {

            if (treeNode) {

                // traverse the left subtree
                if (treeNode.left !== null) {

                    orderTree(treeNode.left);
                }

                // call the process method on the node
                ownerMethod.call(this, treeNode);

                // traverse the right subtree
                if (treeNode.right !== null) {

                    orderTree(treeNode.right);
                }
            }
        }

        // start the traversal from the root node
        orderTree(this.rootNode);
    },

    getSize: function() {

        var treeSize = 0;

        this.traverseTree(function(treeNode) {

            treeSize++;
        });

        return treeSize;
    },

    toArray: function() {

        var treeArray = [];

        this.traverseTree(function(treeNode) {

            treeArray.push(treeNode.value);
        });

        return treeArray;
    },

    // convert to sorted array and build the balanced tree
    balanceTree: function() {

        var sortedArray = this.toArray(),
            arrayLength = sortedArray.length,
            balancedTree = new BinaryTree();

        function buildTree(sortedArray, arrayLength) {

            if (arrayLength > 0) {

                var arrayMiddle = Math.floor(arrayLength / 2),
                    midPoint = sortedArray[arrayMiddle],
                    leftHalf = sortedArray.slice(0, arrayMiddle),
                    leftLength = leftHalf.length,
                    leftMiddle = Math.floor(leftLength / 2),
                    leftPoint = leftHalf[leftMiddle],
                    rightHalf = sortedArray.slice(arrayMiddle + 1, arrayLength),
                    rightLength = rightHalf.length,
                    rightMiddle = Math.floor(rightLength / 2),
                    rightPoint = rightHalf[rightMiddle];
                balancedTree.addNode(midPoint);
                buildTree(leftHalf, leftLength);
                buildTree(rightHalf, rightLength);
            }
        }

        buildTree(sortedArray, arrayLength);
        return balancedTree;
    }
}

// populate a new tree with values
var bTree = new BinaryTree();
bTree.addNode(3);
bTree.addNode(4);
bTree.addNode(1);
bTree.addNode(7);
bTree.addNode(2);
bTree.addNode(5);
bTree.addNode(6);
bTree.addNode(9);
bTree.addNode(8);

// find a node value in the tree
console.log(bTree.findNode(8));
console.log(bTree.findNode(10));

// get the node count of the tree
console.log(bTree.getSize());

// convert the tree to an ordered array
console.log(bTree.toArray());

// modify the tree to make it balanced
var newTree = bTree.balanceTree();
console.log(newTree);
console.log(newTree.findNode(1));
console.log(newTree.findNode(2));
console.log(newTree.findNode(3));
console.log(newTree.findNode(4));
console.log(newTree.findNode(5));
console.log(newTree.findNode(6));
console.log(newTree.findNode(7));
console.log(newTree.findNode(8));
console.log(newTree.findNode(9));