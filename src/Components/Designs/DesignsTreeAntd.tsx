import { Tree } from "antd";
import { EventDataNode } from "antd/lib/tree";
import { Key } from "react";
import { IDesignTreeNode } from "../../global";
import DesignsNodeTitle from './DesignsNodeTitle';
import { useActions } from '../../hooks';

export default function DesignsTreeAntd({ 
    treeData, expanded }: {
    treeData: Array<IDesignTreeNode> | undefined,
    expanded: Key[]
}) {

    const { designsExpandActions } = useActions()

    const ExpandNode = (expandedKeys: Key[], info: {
        node: EventDataNode;
        expanded: boolean;
        nativeEvent: MouseEvent;
    }) => {
    
        designsExpandActions(expandedKeys)
    }
       
    return (
        <Tree
            className="designs-tree"
            draggable
            blockNode
            titleRender={DesignsNodeTitle}
            //defaultExpandedKeys={expanded}
            expandedKeys={expanded}
            onExpand={ExpandNode}
            treeData={treeData}
            onDragStart={info => {

                console.log(info)

            }}
        />
    )
}