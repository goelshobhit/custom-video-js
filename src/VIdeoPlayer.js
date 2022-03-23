import React from "react";
import videojs from "video.js";
import VideoJS from "./Video"; // point to where the functional component is stored
import "videojs-playlist";
import "videojs-seek-buttons";
import "videojs-seek-buttons/dist/videojs-seek-buttons";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";

import "videojs-playlist";
import "videojs-playlist-ui";
import "videojs-playlist-ui/dist/videojs-playlist-ui.css";

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

    player.playlist([
      {
        sources: [
          {
            src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/ab/Caminandes_3_-_Llamigos_-_Blender_Animated_Short.webm/Caminandes_3_-_Llamigos_-_Blender_Animated_Short.webm.240p.webm",
            type: "video/webm",
          },
        ],
        poster: "http://media.w3.org/2010/05/sintel/poster.png",
      },
      {
        sources: [
          {
            src: "http://vjs.zencdn.net/v/oceans.mp4",
            type: "video/mp4",
          },
        ],
        poster: "http://www.videojs.com/img/poster.jpg",
      },
      {
        sources: [
          {
            src: "http://media.w3.org/2010/05/bunny/movie.mp4",
            type: "video/mp4",
          },
        ],
        poster: "http://media.w3.org/2010/05/bunny/poster.png",
      },
      {
        sources: [
          {
            src: "http://media.w3.org/2010/05/video/movie_300.mp4",
            type: "video/mp4",
          },
        ],
        poster: "http://media.w3.org/2010/05/video/poster.png",
      },
    ]);
    player.playlistUi();

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

  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  );
};

export default VideoPlayer;
