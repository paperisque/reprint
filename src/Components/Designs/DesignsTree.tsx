import { Key, useMemo } from "react";
import DesignsNodeBox from './DesignsNodeBox';
import { useActions } from '../../hooks';
import { ExpandedKeysType, Tree as PrimeTree } from 'primereact/tree';
import TreeNode from "primereact/components/treenode/TreeNode";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectTreeSelected } from "../../store/reducers/DesignsTree/sliceDesignsTree";
import { IDesignsOverviewProps } from "../../store/types/designstree";
import { IDesignTreeNode } from '../../types/designs';

export default function DesignsTree({
    treeData, expanded, setSelected }: IDesignsOverviewProps) {

    const { designsExpandActions } = useActions()
    const { designsTreeLazyChildsActions } = useActions()

    const ExpandNode = (expandedKeys: Key[]) => {
        designsExpandActions(expandedKeys)
    }

    const primeData = treeData as TreeNode[]

    const expandedPrime = useMemo(() => {
        const fliped: ExpandedKeysType = {}
        expanded.forEach(key => { fliped[key] = true })
        return fliped
    }, [expanded])

    const expandedAntd = (values: ExpandedKeysType) => {
        return Object.keys(values)
    }

    const selected = useTypedSelector(selectTreeSelected)
    const primeSelected = useMemo(() => {
        if (selected) return selected.key
    }, [selected])

    return (
        <PrimeTree
            value={primeData}
            id="design-prime-tree"
            selectionMode="single"
            metaKeySelection={false}
            expandedKeys={expandedPrime}
            selectionKeys={primeSelected}
            nodeTemplate={DesignsNodeBox}
            onToggle={(e) => {
                console.log('...toogle tree', e)
                ExpandNode(expandedAntd(e.value))
            }}

            onExpand={(e : { node: TreeNode }) => {
                console.log('...Expand tree', e)
                const node = e.node as IDesignTreeNode
                if ( e.node.children ) return true;
                else designsTreeLazyChildsActions(node)
            }}

            onCollapse={(e) => {
                console.log('...Collapce tree', e)
            }}

            onSelect={(e: any) => {
                console.log('Selected prime...', e)
                setSelected([e.value], {
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