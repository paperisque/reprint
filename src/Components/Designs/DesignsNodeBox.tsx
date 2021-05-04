import { Typography } from "antd"
import { IDesignTreeNode } from "../../types/designs";
import { FaSquare } from "react-icons/fa";
import classname from 'classnames';
import TreeNode from 'primereact/components/treenode/TreeNode';

const ActiveTool = ({ node }: { node: IDesignTreeNode }) => {
    return (
        <div className={classname({
            'design-passive': !node.active,
            'design-active': node.active === 1,
            'design-removed': node.active < 0,
        })} onClick={() => {
            console.log('....')
        }}
        ><FaSquare />
        </div>
    )
}

const DesignsNodeBox = (node: IDesignTreeNode | TreeNode) => {
    const designNode = node as IDesignTreeNode

    return (
        <div className="designs-node">
            <Typography.Text
                ellipsis={{ tooltip: node.label }}
                className="design-node-title">
                {node.label}
            </Typography.Text>
            <pre style={{ display: 'none' }}>{JSON.stringify(node)}</pre>
            <pre style={{ display: 'none' }}>{designNode.expanded ? 1 : 0}</pre>
            <div className="designs-node-tools">
                <ActiveTool node={designNode} />
            </div>
            <div className="connection-node">
                <div className="connection-container">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        version="1.1">
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default DesignsNodeBox