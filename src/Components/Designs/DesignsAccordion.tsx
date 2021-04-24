import React, { Key } from "react";
import { IDesignTreeNode } from "../../global";
import { IDesignsOverviewProps } from "../../types/designstree";

const treeEbene = (
    ebene: IDesignTreeNode, keys: Key[]): IDesignTreeNode[] => {

    const children: IDesignTreeNode[] = [ebene]

    if ( keys.indexOf(ebene.key) >= 0 ) return []
    else if ( ebene.isParent ) keys.push(ebene)
    else if ( ebene.children ) {
        for ( let i = 0; i < ebene.children.length; i++) {
            const next = treeEbene(ebene.children[i], keys)
            if (next.length) {
                children.push(...next)
                break
            }
        }
    }
    return children

}

export default function DesignsAccordion({
    treeData, expanded, setSelected }: IDesignsOverviewProps) {

    const ebenen = [], keys: Key[] = []; let branch = []

    for (let j = 0; j < treeData.length; j++) {
        do {
            branch = treeEbene(treeData[j], keys)
            if( branch.length ) ebenen.push(branch)

        } while ( branch.length )
    }

    return (
        <React.Fragment>
            {JSON.stringify(ebenen)}
        </React.Fragment>
    )

}

