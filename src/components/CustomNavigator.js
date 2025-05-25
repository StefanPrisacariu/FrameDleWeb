import { useEffect, useRef, useState } from 'react';
import { getIndicatorToggle, storeIndicatorToggle } from '../helpers/indicatorStatus';
import './CustomNavigator.css';
import { Link, useLocation } from 'react-router-dom';
import { ColorIndicators } from './ColorIndicators';
import logo from '../assets/svg/title-logo.svg';
import close from '../assets/svg/close-x.svg';
import menu from '../assets/svg/bars-solid-icon.svg';

export const CustomNavigator = () => {
    const descriptor = useLocation().pathname;

    const [visible, setVisible] = useState(false);
    const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
    const ref = useRef();
    const ref2 = useRef();
    const mobileRef = useRef();

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

    const handleClickOutside = event => {
        if (
            ref.current &&
            !ref.current.contains(event.target) &&
            ref2.current &&
            !ref2.current.contains(event.target)
        ) {
            setVisible(false);
            storeIndicatorToggle(false);
        }
    };
    const handleClickOutsideMobile = event => {
        if (mobileRef.current && !mobileRef.current.contains(event.target)) {
            setIsMobileNavVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('touchend', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('touchend', handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideMobile, true);
        document.addEventListener('touchend', handleClickOutsideMobile, true);
        return () => {
            document.removeEventListener('click', handleClickOutsideMobile, true);
            document.removeEventListener('touchend', handleClickOutsideMobile, true);
        };
    }, []);

    return (
        <>
            {visible && '/info' !== descriptor && <ColorIndicators visible={visible} setVisible={setVisible} />}

            <div ref={ref} className="nav-container" id="nav">
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
                        <p className={`nav-buttonText ${descriptor === '/info' && ' nav-isSelectedText'}`}>Tutorial</p>
                    </div>
                </Link>
                <Link
                    className="nav-buttonWrap"
                    to="https://docs.google.com/forms/d/e/1FAIpQLSdymNhRnpB4KHeGbSipdaSVTKss9KzrZHtxRope7uekQV8PMQ/viewform?usp=preview"
                    target="_blank"
                >
                    <div className="nav-button">
                        <img className="nav-icon" src={require('../assets/png/icons/Chem_w.webp')} alt="Feedback" />
                        <p className="nav-buttonText">Feedback</p>
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
                        <p className="nav-buttonText">Legend</p>
                    </div>
                </button>
            </div>
            {isMobileNavVisible ? (
                <div className="mobile-nav-wrap">
                    <div ref={mobileRef} className="mobile-nav">
                        <div className="mobile-container">
                            <img src={logo} className="mobile-logo" alt="logo" />
                            <button onClick={() => setIsMobileNavVisible(false)} className="close-button mobile-close">
                                <img src={close} alt="close button" />
                            </button>
                            <div className="mobile-buttons-container">
                                <Link className="mobile-buttonWrap" to="/">
                                    <div className="mobile-button">
                                        <img
                                            className="nav-icon"
                                            src={require('../assets/png/icons/IconMissionMarkerExtraction.webp')}
                                            alt="Home"
                                        />
                                        <p
                                            className={`mobile-buttonText ${
                                                descriptor === '/' && ' nav-isSelectedText'
                                            }`}
                                        >
                                            Home
                                        </p>
                                    </div>
                                </Link>
                                <Link className="mobile-buttonWrap" to="/endless">
                                    <div className="mobile-button">
                                        <img
                                            className="nav-icon"
                                            src={require('../assets/png/icons/IconUtility.webp')}
                                            alt="Endless"
                                        />
                                        <p
                                            className={`mobile-buttonText ${
                                                descriptor === '/endless' && ' nav-isSelectedText'
                                            }`}
                                        >
                                            Endless
                                        </p>
                                    </div>
                                </Link>
                                <Link className="mobile-buttonWrap" to="/info">
                                    <div className="mobile-button">
                                        <img
                                            className="nav-icon"
                                            src={require('../assets/png/icons/IconQuest.webp')}
                                            alt="Info"
                                        />
                                        <p
                                            className={`mobile-buttonText ${
                                                descriptor === '/info' && ' nav-isSelectedText'
                                            }`}
                                        >
                                            Tutorial
                                        </p>
                                    </div>
                                </Link>
                                <Link
                                    className="mobile-buttonWrap"
                                    to="https://docs.google.com/forms/d/e/1FAIpQLSdymNhRnpB4KHeGbSipdaSVTKss9KzrZHtxRope7uekQV8PMQ/viewform?usp=preview"
                                    target="_blank"
                                >
                                    <div className="mobile-button">
                                        <img
                                            className="nav-icon"
                                            src={require('../assets/png/icons/Chem_w.webp')}
                                            alt="Feedback"
                                        />
                                        <p className="mobile-buttonText">Feedback</p>
                                    </div>
                                </Link>
                                <div className="mobile-social-container">
                                    <Link
                                        to="https://play.google.com/store/apps/details?id=com.framedle"
                                        target="_blank"
                                    >
                                        <div>
                                            <img
                                                className="mobile-google-icon"
                                                src={require('../assets/png/google-play.png')}
                                                alt="Info"
                                            />
                                        </div>
                                    </Link>
                                    <Link to="https://discord.gg/qqmr3Uz32f" target="_blank">
                                        <div>
                                            <img
                                                className="mobile-discord-icon"
                                                src={require('../assets/png/discord-icon.png')}
                                                alt="Info"
                                            />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <button onClick={() => setIsMobileNavVisible(true)} className="close-button mobile-menu-button">
                        <img src={menu} alt="close button" />
                    </button>
                    {'/info' !== descriptor && (
                        <button
                            disabled={'/info' === descriptor && true}
                            className="mobile-button-indicator"
                            onClick={() => handleToggle()}
                        >
                            <div className="mobile-indicator" ref={ref2}>
                                <img
                                    className="nav-icon mobile-indicator-icon"
                                    src={
                                        visible && '/info' !== descriptor
                                            ? require('../assets/png/icons/arcaneOn.webp')
                                            : require('../assets/png/icons/arcaneOff.webp')
                                    }
                                    alt="Toggle"
                                />
                                <p className="nav-buttonText">Legend</p>
                            </div>
                        </button>
                    )}
                </>
            )}
        </>
    );
};
