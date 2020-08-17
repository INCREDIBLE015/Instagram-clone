import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Components/Post/Post';
import { db, auth } from './Database/firebase';
import InstagramEmbed from 'react-instagram-embed';
import { Button, makeStyles } from '@material-ui/core';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Uploadimage from './Components/UploadImage/UploadImage';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  const classes = useStyles()
  const modalStyle = getModalStyle()
  const [posts, setPosts] = useState([])
  const [opensignup, setOpenSignUp] = useState(false)
  const [opensignin, setOpenSignIn] = useState(false)
  const [openupload, setOpenUpload] = useState(false)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    db.collection('posts')
      .orderBy("timestamp", 'desc')
      .onSnapshot(snapshot => (
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          imageUrl: doc.data().imageUrl,
          userName: doc.data().userName,
          caption: doc.data().caption,
          timestamp: doc.data().timestamp
        })))
      ))
  }, [])

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        //logged in
        setUser(authuser)
      } else {
        //logged out
        setUser(null)
      }
    }
    )
    return () => {
      unSubscribe()
    }
  }, [user, username])

  const signUp = (event) => {
    event.preventDefault()

    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch(error => alert(error.message))
    setOpenSignUp(false)
  }

  const signIn = (e) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
      .catch(error => console.log(error.message))
    setOpenSignIn(false)
  }


  return (
    <div className="app">

      {/* NavBar */}
      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instragram"></img>
        {user?.displayName ?
          (
            <div className="app__header__signedin__state">
              <strong>Hello, {user.displayName}</strong>
              {user ? (
                <div className='app__uploadimage'>
                  <Button onClick={() => setOpenUpload(true)} className='app__uploadimage__button'>Upload Image</Button>
                </div>
              ) : (
                  <div className='app__uploadimage'>
                    <Button className='app__uploadimage__button'  disabled>Login To Upload</Button>
                  </div>
                )}
              <Button onClick={() => auth.signOut()} >LogOut</Button>

            </div>
          )
          :
          (
            <div className="app__header__signedout__state">
              <Button onClick={() => setOpenSignIn(true)} >LogIn</Button>
              <Button onClick={() => setOpenSignUp(true)} >Sign up</Button>
            </div>
          )
        }
 

      </div>

     

      {/* Modals */}
      <Signup
        opensignup={opensignup}
        setOpenSignUp={setOpenSignUp}
        modalStyle={modalStyle}
        paper={classes.paper}
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        signUp={signUp}
      />

      <Login
        opensignin={opensignin}
        setOpenSignIn={setOpenSignIn}
        modalStyle={modalStyle}
        paper={classes.paper}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        signIn={signIn}
      />

      <Uploadimage
        openupload={openupload}
        setOpenUpload={setOpenUpload}
        modalStyle={modalStyle}
        paper={classes.paper}
        userName={user?.displayName}
      />


      {/* Modals End */}
      <div className="app__content">
        <div className="app__content__posts">
          {/* posts */}
          {posts.map(post =>
            (
              <Post user={user} key={post.id} postId={post.id} loggedInUser={user?.displayName} timestamp={post.timestamp} userName={post.userName} imageUrl={post.imageUrl} caption={post.caption} />
            )
          )}
        </div>
        <div className="app__content__embed">
          <InstagramEmbed
            url='https://www.instagram.com/p/CBtMP5DF6GY/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
        </div>
      </div>





    </div>
  );
}

export default App;