import ReactAudioPlayer from 'react-audio-player';
import './AudioPlayer.css';
function AudioPlayer(props) {
    return(
        <div>
            <ReactAudioPlayer
            id='audio-player'
            src={props.file}
            autoPlay
            controls
            loop
            />
        </div>
    );
}
export default AudioPlayer