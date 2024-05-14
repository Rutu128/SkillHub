import react from 'react';
import Header from '../header/header.js';
import Headeroptions from '../header/Headeroptions.js';
import Profile from './Profile.js';
// import "./Profileupdate.css";

function ProfilePage({ name, message }) {
    return (
      <div className="posts">
        <Header />
        <Profile />
        <Headeroptions />
        <div className="post__header">
          <div className="post__headerLeft">
  
          </div>
        </div>
  
        <div className="post__body">
          <p>{message}</p>
        </div>
  {/* 
        <div className="post__footer">
              <div className="post__footer__option">
                  <img src="https://cdn-icons-png.flaticon.com/128/9513/9513802.png"/>
                  <span>Like</span>
              </div>
  
              <div className="post__footer__option">
                  <img src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png"/>
                  <span>Comment</span>
              </div>
          </div> */}
  
        {/* <Post name="Naisargi Bhatt" message="We are learning react js" /> */}
  
  
      </div>
    )
  }
  
  export default ProfilePage
  