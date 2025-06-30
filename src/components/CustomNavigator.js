import { useEffect, useRef, useState } from 'react';
import { getIndicatorToggle, storeIndicatorToggle } from '../helpers/indicatorStatus';
import './CustomNavigator.css';
import { Link, useLocation } from 'react-router-dom';
import { ColorIndicators } from './ColorIndicators';
import logo from '../assets/svg/title-logo.svg';
import close from '../assets/svg/close-x.svg';
import menu from '../assets/svg/bars-solid-icon.svg';
import { getColorblindMode, storeColorblindMode } from '../helpers/colorblindStore';
import DropdownArrow from '../assets/svg/arrow-down-gold.svg';

export const CustomNavigator = () => {
    const descriptor = useLocation().pathname;

    const [visible, setVisible] = useState(false);
    const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
    const ref = useRef();
    const ref2 = useRef();
    const mobileRef = useRef();

    const [colorblindMenu, setColorblindMenu] = useState(false);
    const [colorblind, setColorblind] = useState(getColorblindMode());

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
            setColorblindMenu(false);
        }
    };

    const handleColorblind = cb => {
        setColorblind(cb);
        storeColorblindMode(cb);
        setColorblindMenu(false);
        window.location.reload();
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
                        <span className={`nav-buttonText ${descriptor === '/' && ' nav-isSelectedText'}`}>Home</span>
                    </div>
                </Link>
                <Link className="nav-buttonWrap" to="/endless">
                    <div className="nav-button">
                        <img className="nav-icon" src={require('../assets/png/icons/IconUtility.webp')} alt="Endless" />
                        <span className={`nav-buttonText ${descriptor === '/endless' && ' nav-isSelectedText'}`}>
                            Endless
                        </span>
                    </div>
                </Link>
                <Link className="nav-buttonWrap" to="/info">
                    <div className="nav-button">
                        <img className="nav-icon" src={require('../assets/png/icons/IconQuest.webp')} alt="Info" />
                        <span className={`nav-buttonText ${descriptor === '/info' && ' nav-isSelectedText'}`}>
                            Tutorial
                        </span>
                    </div>
                </Link>
                <Link
                    className="nav-buttonWrap"
                    to="https://docs.google.com/forms/d/e/1FAIpQLSdymNhRnpB4KHeGbSipdaSVTKss9KzrZHtxRope7uekQV8PMQ/viewform?usp=preview"
                    target="_blank"
                >
                    <div className="nav-button">
                        <img className="nav-icon" src={require('../assets/png/icons/Chem_w.webp')} alt="Feedback" />
                        <span className="nav-buttonText">Feedback</span>
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
                        <span className="nav-buttonText">Legend</span>
                    </div>
                </button>
            </div>
            {isMobileNavVisible ? (
                <div className="mobile-nav-wrap">
                    <div className="mobile-nav-wrap-2">
                        <div ref={mobileRef} className="mobile-nav">
                            <div className="mobile-container">
                                <img src={logo} className="mobile-logo" alt="logo" />
                                <button
                                    onClick={() => {
                                        setIsMobileNavVisible(false);
                                        setColorblindMenu(false);
                                    }}
                                    className="close-button mobile-close"
                                >
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
                                            <span
                                                className={`mobile-buttonText ${
                                                    descriptor === '/' && ' nav-isSelectedText'
                                                }`}
                                            >
                                                Home
                                            </span>
                                        </div>
                                    </Link>
                                    <Link className="mobile-buttonWrap" to="/endless">
                                        <div className="mobile-button">
                                            <img
                                                className="nav-icon"
                                                src={require('../assets/png/icons/IconUtility.webp')}
                                                alt="Endless"
                                            />
                                            <span
                                                className={`mobile-buttonText ${
                                                    descriptor === '/endless' && ' nav-isSelectedText'
                                                }`}
                                            >
                                                Endless
                                            </span>
                                        </div>
                                    </Link>
                                    <Link className="mobile-buttonWrap" to="/info">
                                        <div className="mobile-button">
                                            <img
                                                className="nav-icon"
                                                src={require('../assets/png/icons/IconQuest.webp')}
                                                alt="Info"
                                            />
                                            <span
                                                className={`mobile-buttonText ${
                                                    descriptor === '/info' && ' nav-isSelectedText'
                                                }`}
                                            >
                                                Tutorial
                                            </span>
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
                                            <span className="mobile-buttonText">Feedback</span>
                                        </div>
                                    </Link>
                                    <div className="mobile-buttonWrap">
                                        <div className="mobile-button">
                                            <img
                                                className="nav-icon"
                                                src={require('../assets/png/icons/Ionic_w.webp')}
                                                alt="Feedback"
                                            />
                                            <span className="mobile-buttonText">Colorblind Mode</span>
                                        </div>
                                        <div className="cb-dropdown-wrap">
                                            <div
                                                onClick={() => setColorblindMenu(!colorblindMenu)}
                                                className="cb-dropdown"
                                            >
                                                <span className="mobile-buttonText">{colorblind}</span>
                                            </div>
                                            <button
                                                className="cb-inputButton"
                                                onClick={() => setColorblindMenu(!colorblindMenu)}
                                            >
                                                <div className="cb-inputButtonContent">
                                                    <img
                                                        src={DropdownArrow}
                                                        className="cb-inputButtonSymbol"
                                                        alt="logo"
                                                    />
                                                </div>
                                            </button>
                                            {colorblindMenu && (
                                                <div className="cb-dropdown-menu">
                                                    <span
                                                        onClick={() => handleColorblind('Disabled')}
                                                        className={`mobile-buttonText cb-dropdown-menu-item ${
                                                            'Disabled' === colorblind ? 'nav-isSelectedText' : ''
                                                        }`}
                                                    >
                                                        Disabled
                                                    </span>
                                                    <span
                                                        onClick={() => handleColorblind('Protanopia')}
                                                        className={`mobile-buttonText cb-dropdown-menu-item ${
                                                            'Protanopia' === colorblind ? 'nav-isSelectedText' : ''
                                                        }`}
                                                    >
                                                        Protanopia
                                                    </span>
                                                    <span
                                                        onClick={() => handleColorblind('Deuteranopia')}
                                                        className={`mobile-buttonText cb-dropdown-menu-item ${
                                                            'Deuteranopia' === colorblind ? 'nav-isSelectedText' : ''
                                                        }`}
                                                    >
                                                        Deuteranopia
                                                    </span>
                                                    <span
                                                        onClick={() => handleColorblind('Tritanopia')}
                                                        className={`mobile-buttonText cb-dropdown-menu-item ${
                                                            'Tritanopia' === colorblind ? 'nav-isSelectedText' : ''
                                                        }`}
                                                    >
                                                        Tritanopia
                                                    </span>
                                                    <span
                                                        onClick={() => handleColorblind('Achromatopsia')}
                                                        className={`mobile-buttonText cb-dropdown-menu-item ${
                                                            'Achromatopsia' === colorblind ? 'nav-isSelectedText' : ''
                                                        }`}
                                                    >
                                                        Achromatopsia
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
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
                                <span className="nav-buttonText">Legend</span>
                            </div>
                        </button>
                    )}
                </>
            )}
        </>
    );
};
