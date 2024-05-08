import React from 'react'
import "./home.css"
import Header from '../header/header.js';
import Feed from './feed.js';
import Headeroptions from '../header/Headeroptions.js';

function Home({ name, message }) {
  return (
    <div className="posts">
      <Header />
      <Feed />
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

export default Home


{/* <div className="header"><Header/></div> 
<div className="sidebar"><Sidebar/></div> 
 <div className="feed"><Feed/></div>
 <div className="headeroption"><Headeroptions/></div> */}