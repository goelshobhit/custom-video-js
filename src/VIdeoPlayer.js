import React from "react";
import videojs from "video.js";
import VideoJS from './Video' // point to where the functional component is stored
import "videojs-playlist";
import "videojs-seek-buttons";
import "videojs-seek-buttons/dist/videojs-seek-buttons";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";

var Button = videojs.getComponent('Button');

const VideoPlayer = () => {
  const playerRef = React.useRef(null);

  const videoJsOptions = { // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.playlist([{
        sources: [{
          src: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://media.w3.org/2010/05/sintel/poster.png'
      }, {
        sources: [{
          src: 'http://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://www.videojs.com/img/poster.jpg'
      }, {
        sources: [{
          src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://media.w3.org/2010/05/bunny/poster.png'
      }, {
        sources: [{
          src: 'http://media.w3.org/2010/05/video/movie_300.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://media.w3.org/2010/05/video/poster.png'
      }]);
      
      // Play through the playlist automatically.
      player.playlist.autoadvance(0);

      player.seekButtons({
        forward: 15,
        back: 15
      });

      const NextButton = videojs.extend(Button, {
        //constructor: function(player, options) {
        constructor: function() {
          Button.apply(this, arguments);
          //this.addClass('vjs-chapters-button');
        
          /* FONT AWESOME ICON PREVIOUS NEXT */
          // this.addClass("icon-angle-right");
          // this.controlText("Next");
          
          /* NEW VIDEOJS ICON PREV NEXT */
          this.addClass("vjs-icon-next-item");
        },
        
        handleClick: function(props) {
          player.playlist.next()
        }
        });
  
        const PrevButton = videojs.extend(Button, {
        //constructor: function(player, options) {
        constructor: function() {
          Button.apply(this, arguments);
          //this.addClass('vjs-chapters-button');
        
          /* FONT AWESOME ICON PREVIOUS NEXT */
          // this.addClass("icon-angle-right");
          // this.controlText("Next");
          
          /* NEW VIDEOJS ICON PREV NEXT */
          this.addClass("vjs-icon-previous-item");
        },
        
        handleClick: function(props) {
          player.playlist.previous()
        }
        });
      videojs.registerComponent("PrevButton", PrevButton);
      videojs.registerComponent("NextButton", NextButton);
      player.getChild("controlBar").addChild("PrevButton", {}, 1)
			player.getChild("controlBar").addChild("NextButton", {}, 2)

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  // const changePlayerOptions = () => {
  //   // you can update the player through the Video.js player instance
  //   if (!playerRef.current) {
  //     return;
  //   }
  //   // [update player through instance's api]
  //   playerRef.current.src([{src: 'http://ex.com/video.mp4', type: 'video/mp4'}]);
  //   playerRef.current.autoplay(false);
  // };

  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  );
}

export default VideoPlayer;