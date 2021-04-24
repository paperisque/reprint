import { Key, useMemo } from "react";
import { IDesignTreeNode } from "../../global";
import { IDesignsOverviewProps } from "../../types/designstree";
import { Collapse } from 'antd'

const treeEbene = (
    ebene: IDesignTreeNode, keys: Key[]): IDesignTreeNode[] => {
    const children: IDesignTreeNode[] = [ebene]

    if (keys.indexOf(ebene.key) >= 0) return []
    else if (ebene.isParent) keys.push(ebene.key)
    else if (ebene.children && ebene.children.length) {
        for (let i = 0; i < ebene.children.length; i++) {
            const next = treeEbene(ebene.children[i], keys)
            if (next.length) {
                children.push(...next)
                break
            }
        }
    } else keys.push(ebene.key)
    return children

}

const branchEbenen = (tree: IDesignTreeNode[]) => {
    const ebenen = [], keys: Key[] = []; let branch = []

    for (let j = 0; j < tree.length; j++) {
        do {
            let __length = keys.length
            branch = treeEbene(tree[j], keys)
            if (keys.length === __length) break
            if (branch.length) ebenen.push(branch)

            //console.log(reduceHeader(branch))
        } while ( branch.length )

        keys.splice(0, keys.length)
    }

    return ebenen
}

const reduceHeader = (ebene: IDesignTreeNode[]) => {
    return ebene.reduce<Key[]>((header, node) => {
        header.push(node.title)
        return header
    }, []).join(' / ')
}

export default function DesignsAccordion({
    treeData, expanded, setSelected }: IDesignsOverviewProps) {

    const ebenen = useMemo(() => {
        return branchEbenen(treeData)
    }, [treeData])


    return (
        <Collapse>
            {ebenen.map((ebene: IDesignTreeNode[], index) => (
                <Collapse.Panel key={index} header={reduceHeader(ebene)}>
                </Collapse.Panel>
            ))}
        </Collapse>
    )

}

