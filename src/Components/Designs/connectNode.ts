import { Tree } from "primereact/tree"
import { IDesignTreeNode } from "../../types/designs";
import { getOffset } from 'dom-lib'
interface Offset {
    top: number;
    left: number;
    height: number;
    width: number;
}


const classQuery = (node: IDesignTreeNode) => '.p-treenode.node-' + node.id;

const addPath = (childNode: Element, paths: string[], height: number) => {
    const connectBox: any = childNode.querySelector('.connection-container svg')
    connectBox.setAttribute('width',  30)
    connectBox.setAttribute('height', height)
    connectBox.innerHTML = '';
    paths.forEach(d => {
        const pathNode = document.createElement("path")
        pathNode.setAttribute('d', d)
        connectBox.append(pathNode)
    })
}

const addConection = (node: IDesignTreeNode, domnode: Element) => {

    const parentPosition: any = getOffset(domnode)

    let center: number = 0;
    let position: Offset | DOMRect | any = null;
    let childNode: Element | any
    let d: string[] = [];

    try {

        if (node.children?.length) {

            for (let i = 0; i < node.children.length; i++) {

                if ( i === 0 ) continue;

                childNode = domnode.querySelector(classQuery(node.children[i]));
                position = getOffset(childNode as Element)
                center = Math.round((position.height||0) / 2)
                d.push(
                    'M' + (180) + ',' + ( center * 2 + 1 ) + 
                    'v' + (position.top - parentPosition.top + center ) +
                    'h' + (position.left - parentPosition.left + 5)
                )
            }
        }

        addPath(domnode, d, position.top + center)

    } catch (e) {

        console.log('Error connent...', domnode, e)
    }


}

const eachParent = (nodes: IDesignTreeNode[], expandedKeys: any) => {
    setTimeout(() => {
        nodes.forEach((node) => {

            if (node.hasChilds && !expandedKeys[node.key]) return
            else if (node.children?.length) {
                const domnode = document.querySelector(classQuery(node))
                if (domnode) addConection(node, domnode)
                console.log('node con ', node, domnode);
                eachParent(node.children, expandedKeys);
            }
        })
    }, 20)
}

const resetConection = () => 0;

const connectioNode = (tree: Tree | null) => {

    console.log('render...', tree);
    const nodes = (tree as any).filteredNodes as IDesignTreeNode[];
    const expandedKeys = (tree as any).props.expandedKeys

    if (nodes) eachParent(nodes, expandedKeys); else resetConection()
}

export default connectioNode