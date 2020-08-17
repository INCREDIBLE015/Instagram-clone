import React from 'react'
import { Button, Modal, Input } from '@material-ui/core';
import './Login.css'

function Login({ opensignin, setOpenSignIn, modalStyle, paper, email, setEmail, password, setPassword, signIn }) {

    return (
        <Modal
            open={opensignin}
            onClose={() => setOpenSignIn(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={paper}>

                <form className="modal">
                    <center >
                        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instragram"></img>
                    </center>
                    <Input
                        className="inputfield"
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Input>
                    <Input
                        className="inputfield"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Input>
                    <Button disabled={!password || !email} type="submit" onClick={signIn} >LogIn</Button>
                </form>
            </div>
        </Modal>
    )
}

export default Login