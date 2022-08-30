import React from 'react'
import './css/Card.css'
import wallapaper from "../assets/weapon.jpg"
import land from "../assets/land.jpg"
import {useHistory } from "react-router-dom";
import Swal from 'sweetalert2/src/sweetalert2.js'

function Card({iswalletConnected}) {
    let history = useHistory();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    const FireToastNotConnected = () =>{
        if(!iswalletConnected){
            Toast.fire({
                icon: 'error',
                title: 'Wallet Not Connected!'
            })
        }
        else{
            history.push("/mint/land")
        }
    }

    function CommingSoon(){
        Swal.fire({
            title: 'Comming Soon!',
            icon: "info",
          })
    }

  return (
    <div className='maincards'>
        <div className='allcards'>
            <div className='cards'>
                <div className='imageContainer'>
                    <img className='topImage1' src={land} alt='' /> 
                </div>
                <div className='textdetails'>
                    <div className='titleName'>
                        <div>Land NFTs</div>
                    </div>
                    <div className='desText'>
                        <div>Land is the primary NFT asset in Mavia, and is required in order to build a base and to train an army.</div>
                    </div>
                    <div className='mintnft'>
                        <div className='buttonName' onClick={()=> FireToastNotConnected()}>Mint NFT</div>
                    </div>
                </div>
            </div>

            <div className='cards'>
                <div className='imageContainer'>
                    <img className='topImage' src={wallapaper} alt='' /> 
                    <div className='overlay'></div>
                </div>
                <div className='textdetails'>
                    <div className='titleName'>
                        <div>Weapon NFTs</div>
                    </div>
                    <div className='desText'>
                        <div>Weapon is the Key of winning in a fight. Mint your own Weapon for your Game here.</div>
                    </div>
                    <div className='mintnft'>
                        <div className='buttonName' onClick={()=> CommingSoon()}>Mint NFT</div>
                    </div>
                </div>
            </div>

            <div className='cards'>
                <div className='imageContainer'>
                    <img className='topImage' src={wallapaper} alt='' /> 
                </div>
                <div className='textdetails'>
                    <div className='titleName'>
                        <div>Pet NFTs</div>
                    </div>
                    <div className='desText'>
                        <div>Pets are the once which we love and which love us. And they also protect us. Mint your own pets here.</div>
                    </div>
                    <div className='mintnft'>
                        <div className='buttonName' onClick={()=> CommingSoon()}>Mint NFT</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card