import { Spin } from "antd";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AppState } from "../../store";

export default function Loader() {

    const isLoading = useTypedSelector(
        ( state: AppState ) => 
          state.designstree.isLoading
    );

    return (
        <div className="dashboard-content-loader"
             style={{display : isLoading ? 'block' : 'none'}}>
            <Spin />
        </div>
    )
}