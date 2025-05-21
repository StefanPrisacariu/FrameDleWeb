/* eslint-disable react-hooks/exhaustive-deps */
import './Modal.css';

import close from '../assets/svg/close-x.svg';
import share from '../assets/svg/share-solid.svg';
import useClipboard from 'react-use-clipboard';
import { useRef, useEffect } from 'react';

const emojiMapping = {
    different: '🟥',
    alike: '🟩',
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
    const ref = useRef();
    const generateMessage = () => {
        const grid = [...guesses]
            .slice(0, 5)
            .map(guess => compareFields(guess, todaysWf))
            .join('\n');
        return `I guessed today's Warframe #FrameDle in ${guesses.length} ${
            guesses.length === 1 ? 'try' : 'tries'
        }\n${grid} \n ${guesses.length > 5 ? `+ ${guesses.length - 5} more` : ''}`;
    };

    const [copied, setCopied] = useClipboard(generateMessage(), { successDuration: 3000 });

    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClick();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div className="overlay">
            <div className="modal" ref={ref}>
                <div className="modalWrap">
                    <button onClick={onClick} className="close-button">
                        <img src={close} alt="close button" />
                    </button>
                    <p>
                        I guessed today's Warframe #FrameDle in {guesses.length}{' '}
                        {guesses.length === 1 ? 'try' : 'tries'}
                    </p>
                    <div className="modal-guesses">
                        {guesses.length > 0 &&
                            guesses.map((item, index) => {
                                return <>{index < 5 && <p className="guess">{compareFields(item, todaysWf)}</p>}</>;
                            })}
                    </div>
                    {guesses.length > 5 && <p>{`+ ${guesses.length - 5} more`}</p>}

                    <button
                        onClick={() => {
                            setCopied();
                        }}
                        className="share-button"
                    >
                        <img src={share} className="App-logo" alt="logo" />
                        <span id="share-button-text">{copied ? 'Copied' : 'Share'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
