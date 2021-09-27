
export const makeTree = (nodes: any[], parentId= -1) => nodes
    .filter((node) => node.parentId === parentId)
    .reduce(
      (tree, node) => [
        ...tree,
        {
          ...node,
          children: makeTree(nodes, node.id),
        },
      ],
      [],
    )
