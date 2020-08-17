import React, { useState } from 'react'
import { Modal, Input, Button } from '@material-ui/core';
import './UploadImage.css'
import { storage, db } from '../../Database/firebase';
import firebase from 'firebase'

function Uploadimage({ openupload, setOpenUpload, modalStyle, paper, userName }) {
    const [uploadingstate, setUploadingSate] = useState(false)
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')

    const upload = (e) => {
        e.preventDefault()
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setUploadingSate(true)
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },
            (error) => {
                alert(error.message)
            },
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            imageUrl: url,
                            caption: caption,
                            userName: userName
                        })
                    })
                console.log("yes")
                setImage('')
                setCaption('')
                setProgress(0)
                setOpenUpload(false)
                setUploadingSate(false)
            }
        )
    }
    return (
        <Modal
            open={openupload}
            onClose={() => setOpenUpload(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={paper}>

                <form onSubmit={upload} className="modal">
                    <center >
                        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instragram"></img>
                    </center>
                    <Input
                        className="inputfield"
                        type="text"
                        placeholder="Enter Caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    ></Input>
                    <input type="file" className="inputfield" onChange={(e) => setImage(e.target.files[0])} ></input>
                    {!uploadingstate && (<Button type="submit" className="inputfield" variant="contained" color="primary">Submit</Button>)}
                    {uploadingstate && (<progress className="modal__progressbar" value={progress} max={100}></progress>)}

                </form>

            </div>
        </Modal>
    )
}

export default Uploadimage