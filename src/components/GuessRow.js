/* eslint-disable jsx-a11y/alt-text */
import './GuessRow.css';

import { polarity, elements } from '../helpers/imageExports';
import { compareArrays } from '../helpers/compareArrays';
import { getColorblindMode } from '../helpers/colorblindStore';

import { ReactComponent as Arrow } from '../assets/svg/indicator-arrow.svg';
import { ReactComponent as Correct } from '../assets/svg/indicator-correct.svg';
import { ReactComponent as Incorrect } from '../assets/svg/indicator-incorrect.svg';
import { ReactComponent as Partial } from '../assets/svg/indicator-partial.svg';

export const GuessRow = ({ warframeGuess, todayWarframe }) => {
    const colorblind = getColorblindMode();

    const handleColorblind = state => {
        switch (colorblind) {
            case 'Protanopia':
                return `cb-pro-gr-${state}`;
            case 'Deuteranopia':
                return `cb-deu-gr-${state}`;
            case 'Tritanopia':
                return `cb-tri-gr-${state}`;
            case 'Achromatopsia':
                return `cb-acro-gr-${state}`;
            default:
                return `gr-${state}`;
        }
    };

    const handleIcon = state => {
        if ('Disabled' !== colorblind) {
            switch (state) {
                case 'correct':
                    return <Correct className="icon-absolute icon-correct" width={55} height={55} />;
                case 'incorrect':
                    return <Incorrect className="icon-absolute icon-incorrect" width={50} height={50} />;
                case 'partial':
                    return <Partial className="icon-absolute icon-partial" width={60} height={60} />;
                default:
                    return null;
            }
        }
    };

    return (
        <>
            <div className="gr-container">
                <img className="gr-box" src={warframeGuess.image} alt={warframeGuess.name} />
                <div
                    className={`gr-box ${
                        warframeGuess.gender === todayWarframe.gender
                            ? ` ${handleColorblind('correct')}`
                            : ` ${handleColorblind('incorrect')}`
                    }`}
                >
                    {warframeGuess.gender === todayWarframe.gender ? handleIcon('correct') : handleIcon('incorrect')}
                    <p className="gr-text">{warframeGuess.gender}</p>
                </div>
                <div
                    className={`gr-box ${
                        warframeGuess.primeUmbra === todayWarframe.primeUmbra
                            ? ` ${handleColorblind('correct')}`
                            : ` ${handleColorblind('incorrect')}`
                    }`}
                >
                    {warframeGuess.primeUmbra === todayWarframe.primeUmbra
                        ? handleIcon('correct')
                        : handleIcon('incorrect')}
                    <p className="gr-text">{warframeGuess.primeUmbra}</p>
                </div>
                <div
                    className={`gr-box ${
                        false === compareArrays(warframeGuess.auraPolarity, todayWarframe.auraPolarity)
                            ? ` ${handleColorblind('incorrect')}`
                            : true === compareArrays(warframeGuess.auraPolarity, todayWarframe.auraPolarity)
                            ? ` ${handleColorblind('correct')}`
                            : 'partial' === compareArrays(warframeGuess.auraPolarity, todayWarframe.auraPolarity) &&
                              ` ${handleColorblind('partial')}`
                    }`}
                >
                    {false === compareArrays(warframeGuess.auraPolarity, todayWarframe.auraPolarity)
                        ? handleIcon('incorrect')
                        : true === compareArrays(warframeGuess.auraPolarity, todayWarframe.auraPolarity)
                        ? handleIcon('correct')
                        : handleIcon('partial')}
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
                            ? ` ${handleColorblind('correct')}`
                            : ` ${handleColorblind('incorrect')}`
                    }`}
                >
                    {warframeGuess.progenitorElement === todayWarframe.progenitorElement
                        ? handleIcon('correct')
                        : handleIcon('incorrect')}
                    {elements(warframeGuess.progenitorElement)}
                    <p className="gr-text">{warframeGuess.progenitorElement}</p>
                </div>
                <div
                    className={`gr-box ${
                        warframeGuess.releaseYear === todayWarframe.releaseYear
                            ? ` ${handleColorblind('correct')}`
                            : ` ${handleColorblind('incorrect')}`
                    }`}
                >
                    {warframeGuess.releaseYear !== todayWarframe.releaseYear &&
                    warframeGuess.releaseYear < todayWarframe.releaseYear ? (
                        <Arrow className="icon-absolute icon-arrow" width={50} height={50} />
                    ) : (
                        warframeGuess.releaseYear !== todayWarframe.releaseYear && (
                            <Arrow className="icon-absolute icon-arrow gr-lowerArrow" width={50} height={50} />
                        )
                    )}
                    {warframeGuess.releaseYear === todayWarframe.releaseYear && handleIcon('correct')}
                    <p className="gr-text">{warframeGuess.releaseYear}</p>
                </div>
            </div>
        </>
    );
};
