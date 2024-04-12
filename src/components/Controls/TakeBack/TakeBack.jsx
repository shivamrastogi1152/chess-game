import './TakeBack.css'
import {useAppContext}  from "../../../contexts/context"
import { takeBack } from '../../../reducer/actions/move';

const TakeBack = ()=>{

    const {appState, dispatch} = useAppContext();
    const {positions} = appState;

    function onClick(e){
        dispatch(takeBack());
    }

    return <div className='btn-container'>
        {
            positions.length > 1 ? 
                <button className='takeback-btn' onClick={onClick}>Takeback</button> : 
                null
        }
        {/* <button className='download-btn'></button> */}
    </div>
}

export default TakeBack;