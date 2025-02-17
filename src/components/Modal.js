import './Modal.css';

import close from '../assets/svg/close-x.svg';
import share from '../assets/svg/share-solid.svg';

const emojiMapping = {
    different: '🟥',
    alike: '🟦',
    partial: '🟧',
    higher: '⬇️',
    lower: '⬆️',
};

const compareValues = (value, reference) => {
    if (Array.isArray(value) && Array.isArray(reference)) {
        const commonElements = value.filter(v => reference.includes(v));
        if (commonElements.length === reference.length && commonElements.length === value.length) {
            return emojiMapping.alike;
        } else if (commonElements.length > 0) {
            return emojiMapping.partial;
        }
        return emojiMapping.different;
    }

    if (value === reference) return emojiMapping.alike;
    if (typeof value === 'string' && typeof reference === 'string' && value[0] === reference[0])
        return emojiMapping.partial;

    return emojiMapping.different;
};

const compareFields = (obj, reference) => {
    let result = '';

    result += compareValues(obj.gender, reference.gender);
    result += compareValues(obj.primeUmbra, reference.primeUmbra);
    result += compareValues(obj.auraPolarity, reference.auraPolarity);
    result += compareValues(obj.progenitorElement, reference.progenitorElement);
    result += compareValues(obj.hasLeverian, reference.hasLeverian);

    if (obj.releaseYear === reference.releaseYear) {
        result += emojiMapping.alike;
    } else if (obj.releaseYear > reference.releaseYear) {
        result += emojiMapping.higher;
    } else {
        result += emojiMapping.lower;
    }

    return result;
};

export const Modal = ({ todaysWf, guesses, onClick }) => {
    const generateMessage = () => {
        const grid = [...guesses]
            .slice(0, 5)
            .map(guess => compareFields(guess, todaysWf))
            .join('\n');
        return `I guesses today's Warframe #FrameDle in ${guesses.length} tries\n${grid} \n ${
            guesses.length > 5 && `+ ${guesses.length - 5} more`
        }`;
    };

    return (
        <div className="overlay">
            <div className="modal">
                <button onClick={onClick} className="close-button">
                    <img src={close} alt="close button" />
                </button>
                <p>I guesses today's Warframe #FrameDle in {guesses.length} tries</p>
                <div className="modal-guesses">
                    {guesses.length > 0 &&
                        guesses.map((item, index) => {
                            return <>{index < 5 && <p className="guess">{compareFields(item, todaysWf)}</p>}</>;
                        })}
                </div>
                {guesses.length > 5 && <p>{`+ ${guesses.length - 5} more`}</p>}

                <button onClick={() => console.log(generateMessage())} className="share-button">
                    <img src={share} className="App-logo" alt="logo" />
                    <p>Share</p>
                </button>
            </div>
        </div>
    );
};
