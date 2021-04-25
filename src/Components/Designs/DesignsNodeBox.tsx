import { Typography } from "antd"
import { DataNode } from "antd/lib/tree";
import { IDesignTreeNode } from "../../global";
import { FaSquare } from "react-icons/fa";
import classname from 'classnames';

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

const DesignsNodeBox = (node: DataNode) => {
    const treeNode = node as IDesignTreeNode

    return (
        <div className="designs-node">
                <Typography.Text
                    ellipsis={{ tooltip: treeNode.title}}
                    className="design-node-title">
                    {treeNode.title}
                </Typography.Text>
            <pre style={{ display: 'none' }}>{JSON.stringify(treeNode)}</pre>
            <div className="designs-node-tools">
                <ActiveTool node={treeNode} />
            </div>
        </div>
    )
}

export default DesignsNodeBox