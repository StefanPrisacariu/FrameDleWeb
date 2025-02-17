/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import logo from './assets/svg/title-logo.svg';
import DropdownArrow from './assets/svg/arrow-down-gold.svg';
import DropdownX from './assets/svg/close-x.svg';
import Focus from './assets/png/focus.png';
import './App.css';
import { TableHeader } from './components/TableHeader.js';
import { GuessRow } from './components/GuessRow.js';
import { initialWarframes } from './resources/warframes.js';
import { useState, useEffect, useCallback } from 'react';

import { OrbitProgress } from 'react-loading-indicators';
import ConfettiExplosion from 'react-confetti-explosion';
import { CustomNavigator } from './components/CustomNavigator.js';
import SEO from './components/SEO.js';

function Endless() {
    const [visible, setVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [filteredWarframes, setFilteredWarframes] = useState(initialWarframes);
    const [todaysWf, setTodaysWf] = useState(
        initialWarframes[Math.floor(Math.random() * (initialWarframes.length + 1))]
    );
    const [isGuessed, setIsGuessed] = useState(false);
    const [wasSelected, setWasSelected] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        if (todaysWf && guesses.length > 0 && guesses[guesses.length - 1]?.name === todaysWf.name) {
            setIsGuessed(true);
        }
    }, [todaysWf, guesses]);

    const handleCloseThings = useCallback(() => {
        setVisible(false);
    }, []);

    const handleChange = useCallback(e => {
        setSearchText(e.target.value);
        setVisible(true);
        const filtered = initialWarframes.filter(warframe =>
            warframe.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredWarframes(filtered);
    }, []);

    const warframeSelected = useCallback(
        async e => {
            setWasSelected(false);
            if (todaysWf !== null) {
                setSearchText('');
                handleCloseThings();
                setFilteredWarframes(initialWarframes);
                setGuesses([...guesses, e]);
                if (e.name === todaysWf.name) {
                    setIsGuessed(true);
                }
            }
            setWasSelected(true);
        },
        [guesses, todaysWf]
    );

    const newWarframe = useCallback(() => {
        setIsGuessed(false);
        setGuesses([]);
        setTodaysWf(initialWarframes[Math.floor(Math.random() * (initialWarframes.length + 1))]);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [window]);

    return (
        <>
            <SEO
                title="FrameDle - Endless Mode"
                description="Love FrameDle? Play Endless Mode and guess as many Warframes as you want without affecting your daily streak!"
                url="https://framedle.org/endless"
            />
            <h1>Endless Mode</h1>
            <div className="App">
                <main className="App-main">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <a
                            className="App-google-button"
                            href="https://play.google.com/store/apps/details?id=com.framedle"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img
                                className="App-google"
                                src={
                                    width > 600
                                        ? require('./assets/png/google-play.png')
                                        : require('./assets/png/google-play-icon.png')
                                }
                                alt="google-play-button"
                            />
                        </a>
                    </header>
                    {todaysWf && (
                        <>
                            {isGuessed && (
                                <ConfettiExplosion particleCount={200} duration={3000} zIndex={100} particleSize={10} />
                            )}
                            <div className="alignment">
                                <div className="accessories">
                                    <button onClick={() => newWarframe()} className="newWarframeButton">
                                        New Warframe
                                    </button>
                                </div>
                                <div className="warframeOfDay">
                                    {isGuessed ? (
                                        <img className="guessed" src={todaysWf.image} />
                                    ) : (
                                        <img className="notGuessed" src={Focus} />
                                    )}
                                </div>
                                <div className="accessories2">
                                    <p className="accessoriesLabel2">Endless Mode</p>
                                </div>
                            </div>
                            <p className="warframeName">{isGuessed ? todaysWf.name : '???'}</p>
                            <div className="mainContent">
                                <div className="inputWrapper">
                                    {!isGuessed && (
                                        <div className="inputWrap">
                                            <input
                                                disabled={isGuessed}
                                                placeholder="Lotus"
                                                value={searchText}
                                                onChange={handleChange}
                                                onFocus={() => setVisible(true)}
                                                className="input"
                                            />
                                            <button
                                                disabled={isGuessed}
                                                className="inputButton"
                                                onClick={() => setVisible(!visible)}
                                            >
                                                <div className="inputButtonContent">
                                                    <img
                                                        src={visible ? DropdownX : DropdownArrow}
                                                        className="inputButtonSymbol"
                                                        alt="logo"
                                                    />
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                    {visible && (
                                        <div className="customDropdown">
                                            {filteredWarframes.map(item => (
                                                <button
                                                    key={item.name}
                                                    onClick={() => warframeSelected(item)}
                                                    className="dropdownElement"
                                                >
                                                    <img src={item.image} className="dropdownImage" />
                                                    <p className="dropdownText">{item.name}</p>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className="attemptLabel">Attempts</p>
                                <div className="horizontalScroll">
                                    <TableHeader />
                                    {todaysWf && guesses && wasSelected && guesses.length > 0
                                        ? [...guesses].reverse().map((item, index) => {
                                              return (
                                                  <GuessRow key={index} warframeGuess={item} todayWarframe={todaysWf} />
                                              );
                                          })
                                        : guesses.length !== 0 && <OrbitProgress size="medium" color={'#FFFFFF'} />}
                                </div>
                            </div>
                        </>
                    )}
                </main>
                <CustomNavigator />
            </div>
        </>
    );
}

export default Endless;
