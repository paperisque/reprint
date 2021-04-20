import { Typography } from "antd"
import { DataNode } from "antd/lib/tree";
import { IDesignTreeNode } from "../../global";
import { FaCreditCard } from "react-icons/fa";
import classname from 'classnames';

const ActiveTool = ({ node }: { node: IDesignTreeNode }) => {
    return (
        <div className={classname({
            'design-active': node.active === 1,
            'design-passive': node.active === 0,
            'design-removed': node.active === -1,
        })} onClick={() => {
            console.log('....')
        }}
        ><FaCreditCard />
            <span>{node.active}</span>
        </div>
    )
}

const DesignsNodeTitle = (node: DataNode) => {
    const treeNode = node as IDesignTreeNode

    return (

        <div className="designs-node">
            <Typography.Text>
                {treeNode.title}
            </Typography.Text>
            <pre style={{ display: 'none' }}>{JSON.stringify(treeNode)}</pre>
            <div className="designs-node-tools">
                <ActiveTool node={treeNode} />
            </div>
        </div>
    )
}

export default DesignsNodeTitle