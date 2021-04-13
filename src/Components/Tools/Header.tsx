import classname from 'classnames'
import { PageHeader, Button, Row, Col, Divider } from "antd";
import { HeaderLayout, IButtonsTools } from "../../global";

export const HeaderDashboard = (props: HeaderLayout) => {

    return (
        <PageHeader className={props.pageClass}>
            <Row>
                <Col sm={props.smf}>{props.firstCol()}</Col>
                
                {props.centerCol === undefined ? (<></>) : (
                <Col className="header-center"
                     sm={props.smc}>{props.centerCol()}</Col>
                )}
                
                {props.lastCol === undefined ? (<></>) : (
                    <Col className={classname('header-right',
                         props.lastColClass )}
                        xs={props.xsr} md={4}
                    >
                        <Divider key="last" type="vertical" />
                        {props.lastCol()}
                    </Col>
                )}
            </Row>
        </PageHeader>
    )
}

export const ButtonsHeader = (button: IButtonsTools, index: number) => {
    if ( button.divider ) {
        return (
            <Divider key={button.divider} type="vertical" />
        )
    } else if ( button.icon ) {
        return (
            <Button type="text"
                shape="circle"
                size="small"
                title={button.title}
                className={button.class}
                icon={<button.icon />}
                key={index}
                onClick={button.click}
            />
        )
    } else if ( button.node ){
        return button.node()
    }
}
