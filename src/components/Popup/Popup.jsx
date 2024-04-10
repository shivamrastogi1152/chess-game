import React from 'react';
import { GameStatus } from '../../constants';
import { useAppContext } from '../../contexts/context';
import { closePopup } from '../../reducer/actions/popup';
import './Popup.css'

const Popup = ({children})=>{

    const {appState, dispatch} = useAppContext();

    function OnClosePopup(){
        dispatch(closePopup());
    }

    if(appState.gameStatus === GameStatus.IN_PROGRESS) return null;

    
    return (
        <div className='popup'>
            {React.Children
            .toArray(children)
            .map(child => React.cloneElement(child, {OnClosePopup}))}
        </div>
    )

}

export default Popup;