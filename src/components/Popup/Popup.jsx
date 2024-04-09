import { GameStatus } from '../../constants';
import { useAppContext } from '../../contexts/context';
import { closePopup } from '../../reducer/actions/popup';
import './Popup.css'
import PromotionBox from './PromotionBox/PromotionBox';

const Popup = ()=>{

    const {appState, dispatch} = useAppContext();

    function OnClosePopup(){
        dispatch(closePopup());
    }

    if(appState.gameStatus === GameStatus.PAWN_PROMOTION){
        return (
            <div className='popup'>
                <PromotionBox OnClosePopup={OnClosePopup}/>
            </div>
        )
    }

    else return null
    
}

export default Popup;