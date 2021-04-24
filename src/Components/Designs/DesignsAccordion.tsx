import React, { Key } from "react";
import { IDesignTreeNode } from "../../global";
import { IDesignsOverviewProps } from "../../types/designstree";

const treeEbene = ( 
    ebene: IDesignTreeNode, keys: Key[] ): IDesignTreeNode[] => {
    
    const children: IDesignTreeNode[] = [ebene]    

    if ( ebene.children ) {
        for( let i = 0; i < ebene.children.length; i++ ){
            if ( keys.indexOf( ebene.children[i].key ) < 0 ){
                children.push( ...treeEbene( ebene.children[i], keys ) )
            }
        }
    }
    return children
    
}

export default function DesignsAccordion({
    treeData, expanded, setSelected }: IDesignsOverviewProps){

    const ebenen = [];

    return (
        <React.Fragment />
    )
    
}

