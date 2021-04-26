import { Key, useMemo } from "react";
import { IDesignTreeNode } from "../../global";
import { IDesignsOverviewProps } from "../../types/designstree";
import { Collapse } from 'antd'
import DesignsNodeBox from "./DesignsNodeBox";

const treeEbene = (
    ebene: IDesignTreeNode, keys: Key[]): IDesignTreeNode[] => {
    const children: IDesignTreeNode[] = [ebene]

    if (keys.indexOf(ebene.key) >= 0) return []
    else if (ebene.hasChilds) keys.push(ebene.key)
    else if (ebene.children && ebene.children.length) {
        for (let i = 0; i < ebene.children.length; i++) {
            const next = treeEbene(ebene.children[i], keys)
            if (next.length) {
                children.push(...next)
                break
            }
        }
        if (children.length === 1) {
            keys.push(ebene.key)
            return []
        }
    } else keys.push(ebene.key)
    return children

}

const branchingEbenen = (tree: IDesignTreeNode[]) => {
    const ebenen = [], keys: Key[] = []; let branch = []

    for (let j = 0; j < tree.length; j++) {
        do {
            let __length = keys.length
            branch = treeEbene(tree[j], keys)
            if (keys.length === __length) break
            if (branch.length) ebenen.push(branch)

            //console.log(reduceHeader(branch))
        } while (branch.length)

        keys.splice(0, keys.length)
    }

    return ebenen
}

const reduceHeader = (ebene: IDesignTreeNode[]) => {
    return ebene.reduce<Key[]>((header, node) => {
        header.push(node.title)
        return header
    }, []).join(' | ')
}

const designEbene = (ebene: IDesignTreeNode[]) => {
    const children = ebene[ebene.length - 1].children
    return children?.map((node) => (
        <li className="p-treenode" 
            key={node.key}>
            <div className="p-treenode-content">
                <span className="p-treenode-label">
                    {DesignsNodeBox(node)}
                </span>
            </div>    
        </li>
    ))
}

export default function DesignsAccordion({
    treeData, expanded, setSelected }: IDesignsOverviewProps) {

    const ebenen = useMemo(() => {
        return branchingEbenen(treeData)
    }, [treeData])


    return (
        <Collapse className="p-tree"
                  accordion={true}
                  bordered={false}
                  destroyInactivePanel={true}
        >
            {ebenen.map((ebene: IDesignTreeNode[], index) => (
                <Collapse.Panel className="p-tree-container"
                key={index} header={reduceHeader(ebene)}>
                <div className="p-treenode design-parent-node">
                    <ul className="p-treenode-children">
                        {designEbene(ebene)}
                    </ul>
                </div>        
                </Collapse.Panel>
            ))}
        </Collapse>
    )

}

