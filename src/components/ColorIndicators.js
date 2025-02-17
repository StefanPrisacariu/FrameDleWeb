import './ColorIndicators.css';

export const ColorIndicators = () => {
    return (
        <div className="ci-container">
            <p className="ci-title">Color Indicators</p>
            <div className="ci-indicators">
                <div className="ci-indicator">
                    <div className="ci-indicatorBox ci-correct"></div>
                    <p className="ci-indicatorText">Right</p>
                </div>
                <div className="ci-indicator">
                    <div className="ci-indicatorBox ci-partial"></div>
                    <p className="ci-indicatorText">Partial</p>
                </div>
                <div className="ci-indicator">
                    <div className="ci-indicatorBox ci-incorrect"></div>
                    <p className="ci-indicatorText">Wrong</p>
                </div>
                <div className="ci-indicator">
                    <div className="ci-indicatorBox ci-incorrect">
                        <img
                            src={require('../assets/png/icons/chevron-up-solid.png')}
                            alt="ArrowIncorrect"
                            width="30"
                            height="20"
                        />
                    </div>
                    <p className="ci-indicatorText">Higher</p>
                </div>
                <div className="ci-indicator">
                    <div className="ci-indicatorBox ci-incorrect ci-lowerArrow">
                        <img
                            src={require('../assets/png/icons/chevron-up-solid.png')}
                            alt="ArrowIncorrect"
                            width="30"
                            height="20"
                        />
                    </div>
                    <p className="ci-indicatorText">Lower</p>
                </div>
            </div>
        </div>
    );
};
