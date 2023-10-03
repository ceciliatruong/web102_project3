import './Flashcard.css';
import AudioPlayer from '../AudioPlayer';
import songs from '../../songs';
function Flashcard(props) {
    const i = props.index
    return(
        <div className='card' onClick={props.onClick}>
            <div className='card-back'>
                <AudioPlayer file={songs[i].file}/>
            </div>
            <div className='card-front'>
                <h2>Song: {songs[i].title} <br/> Album: {songs[i].album}</h2>
                <img id='album-cover' src={songs[i].img} />
            </div>
        </div>
    );
}
export default Flashcard;