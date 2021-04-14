///import Tree, { useTreeState } from 'react-hyper-tree'
import { IDesignsTree } from '../../types/designstree';

interface DesignsTreeProps {
  datatree: IDesignsTree | {}
}

export default function DesignsTree(props: DesignsTreeProps){

    console.log(props);

    return (
      <></>
    )
/* 
    const { required, handlers } = useTreeState({
        data: props.datatree,
        id: 'your_tree_id_000',
    })
    
    return (
      <Tree
        {...required}
        {...handlers}
      />
    )
     */
}