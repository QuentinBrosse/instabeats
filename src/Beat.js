import React from 'react';

function trigger(id) {
  const audio = document.getElementById(id + '-player')
  if(audio.paused) {
    play(id)
  } else {
    pause(id)
  }
}

export function play(id) {
  const audio = document.getElementById(id + '-player')
  try {
    audio.play()
  } catch (error) {
    
  }
}

export function pause(id) {
  const audio = document.getElementById(id + '-player')
  try {
    audio.pause()
  } catch (error) {
    
  }
}

function Beat(props) {
  const album_image = props.track.album.images.find(image => image.height === 300)
  let artist_image = props.track.artists.filter(artist => Boolean(artist.images))
  if(artist_image.length) {
    artist_image = artist_image.images[0].url
  } else {
    artist_image = 'favicon.ico'
  }
  return (
    <div id={props.track.id + '-beat'} onClick={() => trigger(props.track.id)} className="beat">
        <div className="beat-top">
          <img alt="Artists" className="artist_image" src={artist_image}></img>
          <div className="beat-top-labels">
            <span className="trackname">{props.track.name}</span>
            <span className="othernames">
              <span className="albumname">{props.track.album.name}</span>
              <span className="artistsnames">{props.track.artists.map(o => o.name).join(', ')}</span>
            </span>
          </div>
        </div>

        <div className="beat-middle">
          <img alt="Album pic" id={props.track.id + '-album'} className="album" src={album_image.url}></img>
        </div>

        <div className="beat-bottom">

        </div>

        <audio id={props.track.id + '-player'}>
          <source src={props.track.preview_url} type="audio/mpeg"></source>
        </audio>
    </div>
  )
}

export default Beat;
