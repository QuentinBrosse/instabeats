import React, { useState } from 'react';
import { useSpotify } from './Spotify';

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

  return (
    <ul>
      {tracks.map(t => (
        // Some tracks don't have preview_url, I don't knwon why.
        t.preview_url && <li key={t.id}>
          <audio controls>
            <source src={t.preview_url} type="audio/mpeg"></source>
          </audio>
        </li>
      ))}
    </ul>
  )
}

export default Feed;
