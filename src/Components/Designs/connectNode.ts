import { Tree } from "primereact/tree"
import { IDesignTreeNode } from "../../types/designs";

const eachParent = (nodes : IDesignTreeNode[]) => {
    setTimeout(() => {
        nodes.forEach(( node ) => {
        
            if ( node.hasChilds ) return
            else if ( node.children?.length ){
                const serachClass = '.p-treenode.node-' + node.id;
                const domnode = document.querySelectorAll(serachClass)
                console.log('node con ', node, domnode);
                eachParent( node.children );
            }
        })
    }, 20 )
}

const resetConection = () => 0;

const connectioNode = (tree: Tree|null) => {

    console.log('render...', tree);
    const nodes = (tree as any)?.filteredNodes as IDesignTreeNode[]; 

    if ( nodes ) eachParent( nodes ); else resetConection()
}

export default connectioNode