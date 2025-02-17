import { useEffect, useState } from 'react';
import { getIndicatorToggle, storeIndicatorToggle } from '../helpers/indicatorStatus';
import './CustomNavigator.css';
import { Link, useLocation } from 'react-router-dom';
import { ColorIndicators } from './ColorIndicators';

export const CustomNavigator = () => {
    const descriptor = useLocation().pathname;

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchToggle = async () => {
            const storedToggle = await getIndicatorToggle();
            setVisible(storedToggle);
        };
        fetchToggle();
    }, []);

    const handleToggle = () => {
        setVisible(!visible);
        storeIndicatorToggle(!visible);
    };

    useEffect(() => {
        const handleNavigate = async () => {
            if ('/info' === descriptor) {
                setVisible(false);
            } else {
                const storedToggle = await getIndicatorToggle();
                setVisible(storedToggle);
            }
        };

        handleNavigate();
    }, [descriptor]);

    return (
        <>
            {visible && '/info' !== descriptor && <ColorIndicators />}
            <div className="nav-container">
                <Link className="nav-buttonWrap" to="/">
                    <div className="nav-button">
                        <img
                            className="nav-icon"
                            src={require('../assets/png/icons/IconMissionMarkerExtraction.webp')}
                            alt="Home"
                        />
                        <p className={`nav-buttonText ${descriptor === '/' && ' nav-isSelectedText'}`}>Home</p>
                    </div>
                </Link>
                <Link className="nav-buttonWrap" to="/endless">
                    <div className="nav-button">
                        <img className="nav-icon" src={require('../assets/png/icons/IconUtility.webp')} alt="Endless" />
                        <p className={`nav-buttonText ${descriptor === '/endless' && ' nav-isSelectedText'}`}>
                            Endless
                        </p>
                    </div>
                </Link>
                <Link className="nav-buttonWrap" to="/info">
                    <div className="nav-button">
                        <img className="nav-icon" src={require('../assets/png/icons/IconQuest.webp')} alt="Info" />
                        <p className={`nav-buttonText ${descriptor === '/info' && ' nav-isSelectedText'}`}>Info</p>
                    </div>
                </Link>
                <button
                    disabled={'/info' === descriptor && true}
                    className="nav-buttonWrap"
                    onClick={() => handleToggle()}
                >
                    <div className="nav-button">
                        <img
                            className="nav-icon"
                            src={
                                visible && '/info' !== descriptor
                                    ? require('../assets/png/icons/arcaneOn.webp')
                                    : require('../assets/png/icons/arcaneOff.webp')
                            }
                            alt="Toggle"
                        />
                        <p className="nav-buttonText">Indicators</p>
                    </div>
                </button>
            </div>
        </>
    );
};
