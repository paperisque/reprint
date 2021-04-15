import classnames from 'classnames';
import { useCallback } from 'react';
import Tree, { useTreeState } from 'react-hyper-tree'
import { TreeNode } from 'react-hyper-tree/dist/helpers/node';

interface DesignsTreeProps {
  treeData: TreeNode | {}
}

export default function DesignsTree(props: DesignsTreeProps) {

  //console.log(props);
  /*
      return (
        <></>
      )
  */
  
  const { required, handlers } = useTreeState({
    data: props.treeData,
    defaultOpened:true, // extenden with once
    id: 'your_tree_id_000',
  })

  const renderNode = useCallback(({
    node,
    onToggle,
  }) => {

    //console.log( node )    

    return (
      <div className="tree-node" 
           key={node.data.id}>
        <div
          onClick={onToggle}
          className={classnames({
            'tree-icon': true,
            'empty-icon': !node.hasChildren(),
            [node.options.opened
              ? 'close-icon'
              : 'open-icon']: node.hasChildren(),
          })}
        />
        <div
          className={classnames({
            'node-content-wrapper': true,
            'node-selected': node.isSelected(),
          })}
          onClick={
            () => handlers.setSelected(
              node,
              !node.isSelected(),
            )
          }
        >
          <div className="titles">
            <div className="node-title">
              {node.data.name}
            </div>
            {node.data.title && (
              <div className="node-subtitle">
                {node.data.title}
              </div>
            )}
          </div>
          {!!node.options.childrenCount && (
            <div className="children-length">
              <div>{node.options.childrenCount}</div>
            </div>
          )}
        </div>
      </div>
  )}, [handlers])
  
  return (
    <Tree
      {...required}
      {...handlers}

      draggable={true}
      classes={{
        nodeWrapper: 'designNodeWrapper',
        selectedNodeWrapper: 'designNodeWrapper',
        children: 'designChildren',
        collapsedChildren: 'designCollapsedChildren',
        treeWrapper: 'designTreeWrapper',
        parentChildren: 'designParentChildren',
        level: 'designLevel'
      }}
      depthGap={0}
      disableLines={true}
      renderNode={renderNode}

    />
  )

}