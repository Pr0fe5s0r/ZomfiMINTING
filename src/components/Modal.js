import {motion} from "framer-motion";
import Backdrop from "./Backdrop";
import React,{useEffect, useState} from 'react'
import "./css/Modal.css"
import metaLogo from "../assets/metamask.png"
import connect from "./Header"


function Modal({gcase, handleClose, connectfun}) {

    useEffect(() => {
        if(gcase)
        {
            document.body.style.overflow = "hidden"
        }
    }, [gcase])
    

    const dropIn = {
        hidden:{
            y: "-100vh",
            opacity: 0,
        },
        visible:{
            y:"0",
            opacity:1,
            transition:{
                duration: 0.1,
                type: "spring",
                damping: 100,
                stiffness: 500,
            }
        },
        exit:{
            y:"100vh",
            opacity: 0,
        },
    };

  return (
    <Backdrop onClick={handleClose}>
        <motion.div onClick={(e)=> e.stopPropagation()} 
            className="modalOri"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
                <div className="cardoption">
                    <div className="closeX" onClick={handleClose}>
                        X
                    </div>
                    <div className="selectwallet">
                        Select Wallet
                    </div>
                    <div className="buttonMetamask" onClick={connectfun}>
                        <div className="metamask">
                            MetaMask
                        </div>
                        <div className="logoMeta">
                            <img className="metaLgo" src={metaLogo} alt="" />
                        </div>
                    </div>
                </div>
        </motion.div>
    </Backdrop>
  )
}

export default Modal