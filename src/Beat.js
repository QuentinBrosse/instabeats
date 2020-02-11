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
  audio.play()
}

export function pause(id) {
  const audio = document.getElementById(id + '-player')
  audio.pause()
}

function Beat(props) {
  return (
    <div id={props.id + '-beat'} onClick={() => trigger(props.id)} className="beat">
        <audio id={props.id + '-player'} controls>
          <source src={props.src} type="audio/mpeg"></source>
        </audio>
    </div>
  )
}

export default Beat;
