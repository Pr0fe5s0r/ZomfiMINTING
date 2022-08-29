import React from 'react'
import './css/MiddlePad.css'
import background from '../assets/background.jpeg'
import playicon from '../assets/youtube.png'
import coinIcon from '../assets/coins.png'

function MiddlePad() {
  return (
    <div className='middlepad'>
        <div className='details'>
            <div className='titleZomfi' align={"left"}>
                Mint Playable Zomfi NFTs
            </div>
            <div className='descriton' align={"left"}>
            Mint your own Land, Hero and Statue NFTs which can be played in the game once Zomfi is launched.
            </div>
            <div className='btngroup'>
                <div className='minttut'>
                    <img className='playIcon' src={playicon} alt='' />
                    <div className='nametut'>Mint Tutorial</div>
                </div>
                <div className='minttut'>
                    <img className='coinIcon' src={coinIcon} alt='' />
                    <div className='nametut'>Land Staking</div>
                </div>
            </div>
        </div>
        <div className='landImageContainer'>
            <img className='landImage' src={background} alt='' />
        </div>
    </div>
  )
}

export default MiddlePad