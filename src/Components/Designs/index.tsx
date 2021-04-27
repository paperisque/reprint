import { useTypedSelector } from "../../hooks/useTypedSelector";
import DesignsTree from "./DesignsTree";
import { IDesignsOverviewProps} from "../../store/types/designstree";
import DesignsAccordion from "./DesignsAccordion";

const DesignsOverview = ( props: IDesignsOverviewProps ) => {
    
    const designsMode = useTypedSelector(
        state => state.designsmode.mode
    )

    return designsMode ? (
        <DesignsAccordion {...props} />
    ) : <DesignsTree {...props} />

}

export default DesignsOverview