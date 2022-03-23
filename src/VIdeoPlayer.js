import React from "react";
import { List, Avatar, Modal } from 'antd';
import { UnlockOutlined, LockOutlined } from '@ant-design/icons';
import videojs from "video.js";
import VideoJS from "./Video"; // point to where the functional component is stored
import "videojs-playlist";
import "videojs-seek-buttons";
import "videojs-seek-buttons/dist/videojs-seek-buttons";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";

import "videojs-playlist";

import playlistSrc from './playlist.json';

var Button = videojs.getComponent("Button");

const VideoPlayer = () => {
  const playerRef = React.useRef(null);
  let timer = null,
    totalTime = 0;
  let time = new Date();

  const videoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.playlist(playlistSrc);
    // Play through the playlist automatically.
    player.playlist.autoadvance(5);

    player.seekButtons({
      forward: 15,
      back: 15,
    });

    const NextButton = videojs.extend(Button, {
      //constructor: function(player, options) {
      constructor: function () {
        Button.apply(this, arguments);
        //this.addClass('vjs-chapters-button');

        /* FONT AWESOME ICON PREVIOUS NEXT */
        // this.addClass("icon-angle-right");
        // this.controlText("Next");

        /* NEW VIDEOJS ICON PREV NEXT */
        this.addClass("vjs-icon-next-item");
      },

      handleClick: function (props) {
        player.playlist.next();
      },
    });

    const PrevButton = videojs.extend(Button, {
      //constructor: function(player, options) {
      constructor: function () {
        Button.apply(this, arguments);
        //this.addClass('vjs-chapters-button');

        /* FONT AWESOME ICON PREVIOUS NEXT */
        // this.addClass("icon-angle-right");
        // this.controlText("Next");

        /* NEW VIDEOJS ICON PREV NEXT */
        this.addClass("vjs-icon-previous-item");
      },

      handleClick: function (props) {
        player.playlist.previous();
      },
    });

    videojs.registerComponent("PrevButton", PrevButton);
    videojs.registerComponent("NextButton", NextButton);

    player.getChild("controlBar").addChild("PrevButton", {}, 1);
    player.getChild("controlBar").addChild("NextButton", {}, 2);

    player.on("dispose", () => {
      console.log("player will dispose");
    });

    player.on("play", startPlaying);
    player.on("pause", pausePlaying);
    // player.controlBar.addChild('QualitySelector');
  };

  function startPlaying() {
    timer = window.setInterval(function () {
      totalTime += new Date().getTime() - time.getTime();
    }, 10);
  }

  function pausePlaying() {
    console.log(totalTime);
    if (timer) clearInterval(timer);
  }

  console.log("watched time in milli seconds", totalTime);

  function handleOnClick(data) {
    const selectedItem = data.sources[0];
    if(!data.is_free){
      playerRef.current.pause();
      Modal.info({
        title: data.title,
        content: (
          <div>
            <p>Buy</p>
          </div>
        ),
        onOk() {},
      })
    } else {
        playerRef.current.src({ src: selectedItem.src, type: selectedItem.type });
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection:'row', flexWrap:'wrap', width:'100%'}}>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <List
      style={{ width:'25vw'}}
    itemLayout="horizontal"
    dataSource={playlistSrc}
    pagination={{
      pageSize: 10,
    }}
    renderItem={item => (
      <List.Item onClick={() => handleOnClick(item)}>
        <List.Item.Meta
          avatar={<Avatar src={item.poster} />}
          title={item.title}
          description={<div>
            {item.is_free ? <UnlockOutlined /> :  <LockOutlined />} {item.description}
          </div>}
        />
      </List.Item>
    )}
  />
    </div>
  );
};



export default VideoPlayer;
