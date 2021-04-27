import { Key } from "react";
import { IDesignTreeNode } from "../../../types/designs";
import { IDesignsContainer, IDesignsItem } from "../../types/designstree";

export const slicename: string = 'designstree';

export const mapDesignTree = (
    inputTree: IDesignsContainer[] | IDesignsItem[] | undefined,
    level?: number) => {

    const nodesContainer: Array<IDesignTreeNode> =
        inputTree?.length ? inputTree.map(

            (node: IDesignsContainer | IDesignsItem) => {

                const element = 'group' in node ? node.group : node;

                const treeItem: IDesignTreeNode = {
                    active: element.activ,
                    position: element.position,
                    label: element.name,
                    key: element.ins,
                    id: element.id,
                    level: level || 0,
                    data: element
                }

                if ('group' in node) {

                    if (node.group?.expand) treeItem.expanded = true

                    if (node?.child && node.child.length) {
                        treeItem.className = 'design-parent-node'
                        treeItem.hasChilds = true
                        treeItem.leaf = true
                    }

                    const nested = node?.next ? node.next : (node?.child ? node.child : undefined)

                    if (nested?.length) treeItem.children = mapDesignTree(nested, (level || 0) + 1)
                    else if (node.group.child > 0) treeItem.leaf = false

                } else if (node?.ins) {

                    treeItem.leaf = true
                    treeItem.isChild = true
                }

                return treeItem;

            }) : []

    return nodesContainer
}

export const expandedData = (nested: IDesignTreeNode[], isNested?: boolean): string[] => {

    const expanded: string[] = []

    nested.forEach((node: IDesignTreeNode) => {

        if (node?.expanded) expanded.push(node.key);
        if (node.children && !(node?.hasChilds)) {
            const expandedChilds = expandedData(node.children, true);
            if (expandedChilds.length) expanded.push(...expandedChilds)
        }
    })

    if (!isNested) console.log('Return exp: ', expanded)

    return expanded
}

export const searchNode = (search: Key | ((index: number, node: IDesignTreeNode,
    parent?: IDesignTreeNode) => any), nodes?: IDesignTreeNode[],
    parent?: IDesignTreeNode): any => { let __find = null;
    if (nodes) for (let i = 0; i < nodes.length; i++) {

        if (typeof search === 'function' &&
            (__find = search(i, nodes[i], parent))) break;

        else if (nodes[i].key === search) return nodes[i]
        else if (nodes[i].children?.length) {
            if ((__find = searchNode(search,
                nodes[i].children, nodes[i]))) break
        }
    }

    return __find;
}

export const levelNode = (search: Key,
    nodes: IDesignTreeNode[] | undefined,
    level?: number): number => {
    level = level || 0
    if (nodes) for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].key === search) return level + 1
        else if (nodes[i].children?.length) {
            const chilsLevel = levelNode(
                search, nodes[i].children, level + 1)
            if (chilsLevel > level + 1)
                return chilsLevel
        }
    }

    return level
}


export const mutationNode = (
    search: Key,
    designs: IDesignTreeNode[],
    mutation: (node: IDesignTreeNode, parent?: IDesignTreeNode) => IDesignTreeNode,
    parent?: IDesignTreeNode) => {

    return designs.flatMap((node: IDesignTreeNode) => {
        if (node.key === search) {
            return mutation(node, parent) || []
        } else if (node.children?.length) {
            node.children = mutationNode(search,
                node.children, mutation, parent)
        }

        return node
    })
}

const defaultMutation = {
    expandedData,
    mutationNode,
    searchNode,
    levelNode
}

export default defaultMutation