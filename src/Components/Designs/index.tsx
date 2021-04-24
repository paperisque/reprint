import { useTypedSelector } from "../../hooks/useTypedSelector";
import DesignsTree from "./DesignsTree";
import { IDesignsOverviewProps} from "../../types/designstree";

const DesignsOverview = ( props: IDesignsOverviewProps ) => {
    
    const designsMode = useTypedSelector(
        state => state.designsmode.mode
    )

    return designsMode ? (
        <></>
    ) : <DesignsTree {...props} />

}

export default DesignsOverview