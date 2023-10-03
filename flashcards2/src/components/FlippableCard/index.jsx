import "./FlippableCard.css";
import Flashcard from "../Flashcard";
import { useState } from "react";
import {CSSTransition} from 'react-transition-group';
// how to 
function FlippableCard(props) {
    const [isFront, setIsFront] = useState(true);
    const flipCard = () => {
        setIsFront((front) => !front);
    }
     return(
        <div className="flashcard-container">
            <CSSTransition
                in={isFront}
                timeout={300}
                classNames='flip'
            >
                <Flashcard onClick={flipCard} index={props.index}/>
            </CSSTransition>
        </div>
    );
}
export default FlippableCard