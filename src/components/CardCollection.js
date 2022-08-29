import React from 'react'
import Card from './Card'
import wallapaer from '../assets/wallpaper1.jpg'
import './css/CardCollection.css'

function CardCollection() {
  return (
    <div className='cardcollection'>
        <Card image={wallapaer} titleText="Hello" des="hello" buttonText="MINT NFT"/>
    </div>
  )
}

export default CardCollection