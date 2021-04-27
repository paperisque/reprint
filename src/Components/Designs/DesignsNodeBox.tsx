import { Typography } from "antd"
import { IDesignTreeNode } from "../../types/designs";
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

const DesignsNodeBox = (node: IDesignTreeNode) => {

    return (
        <div className="designs-node">
                <Typography.Text
                    ellipsis={{ tooltip: node.label}}
                    className="design-node-title">
                    {node.label}
                </Typography.Text>
            <pre style={{ display: 'none' }}>{JSON.stringify(node)}</pre>
            <div className="designs-node-tools">
                <ActiveTool node={node} />
            </div>
        </div>
    )
}

export default DesignsNodeBox