import { Form, Input, Select } from 'antd';
import { TreeProps } from 'primereact/tree'

interface FilterInputOptions {
    className: string;
    onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;
    onChange(event: React.KeyboardEvent<HTMLInputElement>): void;
}


interface HeaderTemplateOptions {
    filterContainerClassName: string;
    filterIconClasssName: string;
    filterInput: FilterInputOptions;
    filterElement: JSX.Element;
    element: JSX.Element;
    props: TreeProps;
}

const DesignsTools = ( props: HeaderTemplateOptions ): any => {

    const { Item } = Form

    return (
       <Item><Input /><Select></Select></Item>
    )
}

export default DesignsTools