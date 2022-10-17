const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/


class BinarySearchTree {

  constructor() {
    this.tree = null
  }

  root() {
    return this.tree
  }

  add(data) {

    function addNode(node, data) {
      if (!node) return new Node(data)
      if (node.data === data) return node

      data < node.data
        ? node.left = addNode(node.left, data)
        : node.right = addNode(node.right, data)

      return node
    }

    this.tree = addNode(this.tree, data)
  }

  has(data) {
    function hasNode(node, data) {
      if (!node) return false
      if (node.data === data) return true

      return data < node.data
        ? hasNode(node.left, data)
        : hasNode(node.right, data)
    }

    return hasNode(this.tree, data)
  }

  find(data) {

    function searcNode(node, data) {
      if (!node) return null
      if (node.data === data) return node

      return data < node.data
        ? searcNode(node.left, data)
        : searcNode(node.right, data)
    }

    return searcNode(this.tree, data)
  }

  remove(data) {
    this.tree = removeNode(this.tree, data)

    function removeNode(node, data) {
      if (!node) return null

      if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
      } else if (data > node.data) {
        node.right = removeNode(node.right, data)
        return node
      } else {

        // если листья то null
        if (!node.left && !node.right) return null

        // правый ребенок
        if (!node.left) {
          node = node.right
          return node
        }

        // левый ребенок
        if (!node.right) {
          node = node.left
          return node
        }

        // если оба ребенка существуют
        let minRight = node.right

        while (minRight.left) {
          minRight = minRight.left
        }
        node.data = minRight.data
        node.right = removeNode(node.right, minRight.data)

        return node
      }
    }
  }

  min() {
    if (!this.tree) return null

    let min = this.tree
    while (min.left) {
      min = min.left
    }
    return min.data
  }

  max() {
    if (!this.tree) return null

    let max = this.tree
    while (max.right) {
      max = max.right
    }
    return max.data
  }
}

module.exports = {
  BinarySearchTree
};