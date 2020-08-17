import React from 'react'
import { Button, Modal, Input } from '@material-ui/core';
import './Signup.css'

function Signup({ opensignup, setOpenSignUp, modalStyle, paper, email, setEmail, username, setUsername, password, setPassword, signUp }) {

    return (
        <Modal
            open={opensignup}
            onClose={() => setOpenSignUp(false)}
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
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <Button disabled={!username || !password || !email} type="submit" onClick={signUp} >SignUp</Button>
                </form>
            </div>
        </Modal>
    )
}

export default Signup