import Tree, { useTreeState } from 'react-hyper-tree'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectTreeData } from '../../store/reducers/sliceDesignsTree'

export default function DesignsTree(){

    const datatree = useTypedSelector(selectTreeData)
     
    const { required, handlers } = useTreeState({
        data:datatree,
        id: 'your_tree_id_000',
    })
    
      return (
        <Tree
          {...required}
          {...handlers}
        />
      )
}