/* eslint-disable jsx-a11y/alt-text */
import './GuessRow.css';

import { polarity, elements } from '../helpers/imageExports';
import { compareArrays } from '../helpers/compareArrays';

export const GuessRow = ({ warframeGuess, todayWarframe }) => {
    return (
        <>
            <div className="gr-container">
                <img className="gr-box" src={warframeGuess.image} />
                <div
                    className={`gr-box ${
                        warframeGuess.gender === todayWarframe.gender ? ' gr-correct' : ' gr-incorrect'
                    }`}
                >
                    <p className="gr-text">{warframeGuess.gender}</p>
                </div>
                <div
                    className={`gr-box ${
                        warframeGuess.primeUmbra === todayWarframe.primeUmbra ? ' gr-correct' : ' gr-incorrect'
                    }`}
                >
                    <p className="gr-text">{warframeGuess.primeUmbra}</p>
                </div>
                <div
                    className={`gr-box ${
                        false === compareArrays(warframeGuess.auraPolarity, todayWarframe.auraPolarity)
                            ? ' gr-incorrect'
                            : true === compareArrays(warframeGuess.auraPolarity, todayWarframe.auraPolarity)
                            ? ' gr-correct'
                            : 'partial' === compareArrays(warframeGuess.auraPolarity, todayWarframe.auraPolarity) &&
                              ' gr-partial'
                    }`}
                >
                    {warframeGuess.auraPolarity && (
                        <>
                            {warframeGuess.auraPolarity[0] !== 'none' && (
                                <div className="gr-multiplePolarities">
                                    {warframeGuess.auraPolarity.map((item, index) => polarity(item, index))}
                                </div>
                            )}
                            {warframeGuess.auraPolarity.map((item, index) => (
                                <p key={index} className="gr-text">
                                    {item}
                                </p>
                            ))}
                        </>
                    )}
                </div>
                <div
                    className={`gr-box ${
                        warframeGuess.progenitorElement === todayWarframe.progenitorElement
                            ? ' gr-correct'
                            : ' gr-incorrect'
                    }`}
                >
                    {elements(warframeGuess.progenitorElement)}
                    <p className="gr-text">{warframeGuess.progenitorElement}</p>
                </div>
                <div
                    className={`gr-box ${
                        warframeGuess.releaseYear === todayWarframe.releaseYear ? ' gr-correct' : ' gr-incorrect'
                    }`}
                >
                    {warframeGuess.releaseYear !== todayWarframe.releaseYear &&
                    warframeGuess.releaseYear < todayWarframe.releaseYear ? (
                        <img
                            src={require('../assets/png/icons/chevron-up-solid.png')}
                            className="gr-arrow"
                            width={50}
                            height={40}
                        />
                    ) : (
                        warframeGuess.releaseYear !== todayWarframe.releaseYear && (
                            <img
                                src={require('../assets/png/icons/chevron-up-solid.png')}
                                className="gr-arrow gr-lowerArrow"
                                width={50}
                                height={40}
                            />
                        )
                    )}
                    <p className="gr-text">{warframeGuess.releaseYear}</p>
                </div>
            </div>
        </>
    );
};
