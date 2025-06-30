import './ColorIndicators.css';
import DropdownX from '../assets/svg/close-x.svg';
import { getColorblindMode } from '../helpers/colorblindStore';

import { ReactComponent as Arrow } from '../assets/svg/indicator-arrow.svg';
import { ReactComponent as Correct } from '../assets/svg/indicator-correct.svg';
import { ReactComponent as Incorrect } from '../assets/svg/indicator-incorrect.svg';
import { ReactComponent as Partial } from '../assets/svg/indicator-partial.svg';

export const ColorIndicators = ({ visible, setVisible }) => {
    const colorblind = getColorblindMode();

    const handleColorblind = state => {
        switch (colorblind) {
            case 'Protanopia':
                return `cb-pro-ci-${state}`;
            case 'Deuteranopia':
                return `cb-deu-ci-${state}`;
            case 'Tritanopia':
                return `cb-tri-ci-${state}`;
            case 'Achromatopsia':
                return `cb-acro-ci-${state}`;
            default:
                return `ci-${state}`;
        }
    };

    return (
        <div className="ci-container">
            <button className="ci-button" onClick={() => setVisible(!visible)}>
                <div className="inputButtonContent">
                    <img src={DropdownX} className="inputButtonSymbol" alt="logo" />
                </div>
            </button>
            <p className="ci-title">Color Indicators</p>
            <div className="ci-indicators">
                <div className="ci-indicator">
                    <div className={`ci-indicatorBox ${handleColorblind('correct')}`}>
                        {'Disabled' !== colorblind && <Correct className="icon-correct" width={40} height={40} />}
                    </div>
                    <p className="ci-indicatorText">Right</p>
                </div>
                <div className="ci-indicator">
                    <div className={`ci-indicatorBox ${handleColorblind('partial')}`}>
                        {'Disabled' !== colorblind && <Partial className="icon-partial" width={40} height={40} />}
                    </div>
                    <p className="ci-indicatorText">Partial</p>
                </div>
                <div className="ci-indicator">
                    <div className={`ci-indicatorBox ${handleColorblind('incorrect')}`}>
                        {'Disabled' !== colorblind && <Incorrect className="icon-incorrect" width={40} height={40} />}
                    </div>
                    <p className="ci-indicatorText">Wrong</p>
                </div>
                <div className="ci-indicator">
                    <div className={`ci-indicatorBox ${handleColorblind('incorrect')}`}>
                        <Arrow className="icon-arrow" width={40} height={40} />
                    </div>
                    <p className="ci-indicatorText">Higher</p>
                </div>
                <div className="ci-indicator">
                    <div className={`ci-indicatorBox ${handleColorblind('incorrect')} ci-lowerArrow`}>
                        <Arrow className="icon-arrow" width={40} height={40} />
                    </div>
                    <p className="ci-indicatorText">Lower</p>
                </div>
            </div>
        </div>
    );
};
