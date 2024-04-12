import './MovesList.css'
import {useAppContext} from "../../../contexts/context"

const MovesList = ()=>{

    const {appState} = useAppContext();
    const {movesNotationList} = appState;

    return <div className="moves-list">
        {movesNotationList.map((notation, i)=>
            <div key={i} data-number={Math.floor(i/2)+1}>{`${notation}`}</div>
        )}
    </div>
}

export default MovesList;