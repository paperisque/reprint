import { Tree } from "antd";
import { Key, useMemo } from "react";
import { IDesignTreeNode } from '../../global';
import DesignsNodeTitle from './DesignsNodeTitle';
import { useActions } from '../../hooks';
import { ExpandedKeysType, Tree as PrimeTree } from 'primereact/tree';
import TreeNode from "primereact/components/treenode/TreeNode";
import '../../assets/root.scss';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectTreeSelected } from "../../store/reducers/sliceDesignsTree";


export default function DesignsTreeAntd({ 
    treeData, expanded, setSelected }: {
    treeData: Array<IDesignTreeNode> | undefined,
    expanded: Key[], 
    setSelected:(selectedKeys: Key[], info: any)=> void
}) {

    const { designsExpandActions } = useActions()
    const ExpandNode = (expandedKeys: Key[]) => {
        designsExpandActions(expandedKeys)
    }

    const primeData = treeData as TreeNode[]

    const expandedPrime = useMemo(() => {
        const fliped: ExpandedKeysType = {}
        expanded.forEach( key => { fliped[key] = true })
        return fliped
    }, [expanded] )

    const expandedAntd = ( values: ExpandedKeysType ) => {
       return Object.keys( values ) 
    }

    const selected = useTypedSelector(selectTreeSelected)
    const primeSelected = useMemo(() => {
        if ( selected ) return selected.key
    }, [selected])

    return 0 ? (
        <Tree
            className="designs-tree"
            draggable
            blockNode
            showIcon={false}
            titleRender={DesignsNodeTitle}
            expandedKeys={expanded}
            treeData={treeData}
            onExpand={ExpandNode}
            onSelect={setSelected}
            onDragStart={info => {
                console.log(info)
            }}
        />
    ) : (
        <PrimeTree 
            value={primeData}
            id="design-prime-tree"
            selectionMode="single"
            metaKeySelection={false}
            expandedKeys={expandedPrime}
            selectionKeys={primeSelected}
            nodeTemplate={DesignsNodeTitle}
            onToggle={( e ) => {
                console.log('...toogle tree', e)
                ExpandNode(expandedAntd(e.value))
            }}

            onExpand={(e) => {
                console.log('...Expand tree', e)
            }}

            onCollapse={(e) => {
                console.log('...Collapce tree', e)
            }}
            
            onSelect={( e: any) => {
                console.log('Selected prime...', e)
                setSelected([ e.value ], {
                    selected: true,
                    selectedNodes: [e.node]
                })
            }}

            onUnselect={() => {
                console.log('Unselect prime...')
                setSelected([], { selected: false })
            }}
        />
    )
}