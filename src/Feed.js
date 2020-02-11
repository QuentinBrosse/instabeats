import React, { useState } from 'react';
import { useSpotify } from './Spotify';
import Beat, { play, pause } from './Beat';

function onTouchMove(beats) {
  beats.filter(beat => beat !== null)
    .map(beat => beat.props.id)
    .forEach(id => {
      const beat = document.getElementById(id + '-beat')
      
      const rect = beat.getBoundingClientRect();
      if(rect.top > 0 && rect.bottom < window.innerHeight) {
        play(id)
      } else {
        pause(id)
      }
    })
}

function Feed() {
  const { getRecommendations } = useSpotify();

  const [tracks, setTracks] = useState([])

  if (tracks.length === 0) {
    getRecommendations({
      'seed_tracks': '1T4gCNnApeyGgbuFTQSAJd,7KJkIzbCIaPcYLwkgo7eeA',
      'seed_artists': '4JhjlqgMbd4RlrT81VoTIF,4EePV5BljRSXJnYww4d5Qa'
    })
      .then(d => setTracks(d.tracks))
  }

  const beats = tracks.map(t => t.preview_url && <Beat key={t.id} id={t.id} src={t.preview_url}/>)

  return (
    <div className="feed" onTouchMove={() => onTouchMove(beats)}>
      {beats}
    </div>
  )
}

export default Feed;
