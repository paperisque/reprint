import  React, { Key, useMemo } from "react";
import DesignsNodeBox from './DesignsNodeBox';
//import connectioNode from './connectNode'
import { useActions } from '../../hooks';
import { EventNodeParams, ExpandedKeysType, Tree } from 'primereact/tree';
import TreeNode from "primereact/components/treenode/TreeNode";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectTreeSelected } from "../../store/reducers/DesignsTree/sliceDesignsTree";
import { IDesignsOverviewProps } from "../../store/types/designstree";
import { IDesignTreeNode } from '../../types/designs';
import { useTranslation } from "react-i18next";

export default function DesignsTree({
    treeData, expanded, setSelected }: IDesignsOverviewProps) {

    const { designsExpandActions } = useActions()
    const { designsTreeLazyChildsActions } = useActions()
    const { t } = useTranslation()
    const treeRef = React.useRef<Tree>(null)

    const ExpandNode = (expandedKeys: Key[]) => {
        designsExpandActions(expandedKeys)
    }

    const primeData = treeData as TreeNode[]

    //React.useEffect(() => { connectioNode( treeRef.current ) }, [expanded])

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

    const transition = ( e: EventNodeParams ) => {
        const nodeBox: any = {
            node: e.originalEvent.target as Element,
            searchops : 4
        }

        do { nodeBox.node = nodeBox.node.parentNode
        if ( nodeBox.node === undefined ) return;
        if ( nodeBox.node.classList.contains('p-treenode') ) break;
        } while( nodeBox.searchops-- )

        if ( nodeBox.node.classList.contains('p-treenode') ) {
             nodeBox.node.classList.add('p-expanding')   
             setTimeout(() => {
                nodeBox.node.classList.remove('p-expanding')
             }, 300 )
        }
        
    }

    return (
        <Tree
            ref={treeRef}
            value={primeData}
            id="design-prime-tree"
            selectionMode="single"
            metaKeySelection={false}
            expandedKeys={expandedPrime}
            selectionKeys={primeSelected}
            nodeTemplate={DesignsNodeBox}
            filterPlaceholder={t('Search')}
            filterBy="data.name,data.childnames"
            filter={true}
            onToggle={(e) => {
                console.log('...toogle tree', e)
                ExpandNode(expandedAntd(e.value))
            }}

            onExpand={(e : EventNodeParams) => {
                console.log('...Expand tree', e)
                const node = e.node as IDesignTreeNode
                if ( e.node.children ){ transition(e); return true;}
                else designsTreeLazyChildsActions(node)
            }}

            onCollapse={(e: EventNodeParams) => {
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