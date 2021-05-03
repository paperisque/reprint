import TreeNode from "primereact/components/treenode/TreeNode";
export interface IDesignTreeNode extends TreeNode {
    id:number;
    key: string;
    label: string;
    active: number,
    level: number,
    position: number;
    hasChilds?: boolean;
    isChild?: boolean;
    expanded?: boolean,
    children?: IDesignTreeNode[]
}
