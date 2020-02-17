import React, { useState } from 'react';
import { useSpotify } from './Spotify';
import Beat, { play, pause } from './Beat';

function onTouchMove(beats) {
  beats.forEach(id => {
      const beat = document.getElementById(id + '-beat')
      
      if(beat) {
        const rect = beat.getBoundingClientRect();
        if(Math.abs(rect.top) < beat.offsetHeight / 2) {
          document.getElementById(id + '-album').classList.add('playing')
          play(id)
        } else {
          document.getElementById(id + '-album').classList.remove('playing')
          pause(id)
        }
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

  const ids = tracks.map(track => track.id)

  return (
    <div className="feed" onTouchMove={() => onTouchMove(ids)} onWheel={() => onTouchMove(ids)}>
      {tracks.map(t => t.preview_url && <Beat key={t.id} track={t}/>)}
    </div>
  )
}

export default Feed;
