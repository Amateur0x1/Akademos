// 输入
// 两个图形元素树，每个节点包含以下属性：
// - id: 图形元素的唯一标识符。
// - type: 图形元素的类型。
// - children: 子图形元素的列表，可能为空。

// 输出
// 一个列表，包含需要更新的节点 id 和 type 的列表。
// 实现一个函数 diffTrees(oldTree, newTree)，返回需要更新的节点 id 和 type 的列表。
// 提示
// - 比较两个树的差异时，可以通过比较节点的 id、type 和 children 来确定差异。
// - 可以使用广度优先搜索（BFS）或深度优先搜索（DFS）来遍历树结构。
const oldTree = {
  id: "A",
  type: "group",
  children: [
    {
      id: "B",
      type: "rectangle",
      children: [
        {
          id: "D",
          type: "text",
          children: [],
        },
        {
          id: "E",
          type: "circle",
          children: [],
        },
      ],
    },
    {
      id: "C",
      type: "group",
      children: [
        {
          id: "F",
          type: "rectangle",
          children: [],
        },
      ],
    },
  ],
};

const newTree = {
  id: "A",
  type: "group",
  children: [
    {
      id: "B",
      type: "rectangle",
      children: [
        {
          id: "D",
          type: "text",
          children: [],
        },
        {
          id: "E",
          type: "circle",
          children: [],
        },
      ],
    },
    {
      id: "C",
      type: "group",
      children: [
        {
          id: "F",
          type: "rectangle",
          children: [
            {
              id: "G",
              type: "text",
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

interface TreeNode {
  id: string;
  type: string;
  children: TreeNode[];
}

function solution(oldTree: TreeNode, newTree: TreeNode) {
  const changes: { id: string; type: string }[] = [];

  function helper(oldNode: TreeNode, newNode: TreeNode) {
    if (
      !oldNode ||
      oldNode.id !== newNode.id ||
      oldNode.type !== newNode.type
    ) {
      changes.push({ id: oldNode.id, type: oldNode.type });
      return;
    }

    const oldChildren = oldNode.children || [];
    const newChildren = newNode.children || [];

    const oldChildrenMap = {};

    oldChildren.forEach((child) => (oldChildrenMap[child.id] = child));

    newChildren.forEach((newChild) => {
      const oldChild = oldChildrenMap[newChild.id];
      helper(oldChild, newChild);
    });
  }

  helper(oldTree, newTree);
  return changes;
}

console.log(solution(oldTree, newTree));
