/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import logo from './assets/svg/title-logo.svg';
import lock from './assets/svg/lock-solid.svg';
import share from './assets/svg/share-solid.svg';
import DropdownArrow from './assets/svg/arrow-down-gold.svg';
import DropdownX from './assets/svg/close-x.svg';
import './App.css';
import { TableHeader } from './components/TableHeader.js';
import { GuessRow } from './components/GuessRow.js';
import { initialWarframes } from './resources/warframes.js';
import { useState, useEffect, useCallback } from 'react';
import { TimerComponent } from './components/TimeComponent.js';
import SEO from './components/SEO.js';
import { Modal } from './components/Modal.js';

import { getDailyStreak, storeDailyStreak, storeDailyStreakTime } from './helpers/storeReadStreak.js';
import { storeGuesses, getGuesses } from './helpers/storeReadGuesses.js';

import { OrbitProgress } from 'react-loading-indicators';
import ConfettiExplosion from 'react-confetti-explosion';
import { CustomNavigator } from './components/CustomNavigator.js';
import { checkResetNeeded } from './helpers/resetCheck.js';
import { fetchTodaysWarframe, fetchYesterdayWarframe } from './helpers/api.js';

function Main() {
    const [dailyStreak, setDailyStreak] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [visible, setVisible] = useState(false);
    const [guesses, setGuesses] = useState([]);
    const [isGuessed, setIsGuessed] = useState(false);
    const [filteredWarframes, setFilteredWarframes] = useState(initialWarframes);
    const [todaysWf, setTodaysWf] = useState(null);
    const [yesterdayWf, setYesterdayWf] = useState(null);
    const [netError, setNetError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const [modalToggle, setModalToggle] = useState(false);

    useEffect(() => {
        const updateDimensions = () => setWidth(window.innerWidth);
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Load game data on mount
    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        if (todaysWf && guesses.length > 0 && guesses[guesses.length - 1]?.name === todaysWf.name) {
            setIsGuessed(true);
        }
    }, [todaysWf, guesses]);

    // Fetch and initialize the game state
    const initializeGame = async () => {
        try {
            const resetTime = await checkResetNeeded();

            if (resetTime >= 48) {
                setDailyStreak(0);
                await storeDailyStreak(0);
                setGuesses([]);
                await storeGuesses([]);
            } else if (resetTime >= 24) {
                setGuesses([]);
                await storeGuesses([]);
                setDailyStreak(await getDailyStreak());
            } else {
                setGuesses(await getGuesses());
                setDailyStreak(await getDailyStreak());
            }

            setTodaysWf(await fetchTodaysWarframe());
            setYesterdayWf(await fetchYesterdayWarframe());
        } catch (error) {
            console.error('Initialization error:', error);
            setNetError(true);
        } finally {
            setLoading(false);
        }
    };

    // Handle user input search
    const handleChange = useCallback(e => {
        setSearchText(e.target.value);
        setVisible(true);
        setFilteredWarframes(
            initialWarframes.filter(wf => wf.name.toLowerCase().includes(e.target.value.toLowerCase()))
        );
    }, []);

    // Handle Warframe selection
    const warframeSelected = useCallback(
        async selectedWf => {
            setSearchText('');
            setFilteredWarframes(initialWarframes);
            setVisible(false);
            const newGuesses = [...guesses, selectedWf];
            setGuesses(newGuesses);
            await storeGuesses(newGuesses);
            await storeDailyStreakTime();

            if (selectedWf.name === todaysWf.name) {
                setIsGuessed(true);
                const newStreak = dailyStreak + 1;
                setDailyStreak(newStreak);
                await storeDailyStreak(newStreak);
                const timer = setTimeout(() => {
                    setModalToggle(true);
                }, 3000);
                return () => clearTimeout(timer);
            }
        },
        [guesses, todaysWf, dailyStreak]
    );

    return (
        <>
            <SEO
                title="FrameDle - The Warframe Guessing Game made for true Tenno"
                description="Test your Warframe knowledge! Use clues like gender, aura polarity, and more to guess the Warframe of the day. Good luck, Tenno!"
                url="https://framedle.org/"
            />
            <h1>Welcome to FrameDle!</h1>
            <h2 style={{ display: 'none' }}>Daily Mode</h2>
            <div className="App">
                <main className="App-main">
                    <header className="App-header">
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

                        <img src={logo} className="App-logo" alt="logo" />

                        <a
                            className="App-discord-button"
                            href="https://discord.gg/qqmr3Uz32f"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img
                                className="App-discord"
                                src={require('./assets/png/discord-icon.png')}
                                alt="google-play-button"
                            />
                        </a>
                    </header>
                    {!loading && todaysWf ? (
                        <>
                            {isGuessed && (
                                <ConfettiExplosion particleCount={200} duration={3000} zIndex={100} particleSize={10} />
                            )}
                            <div className="alignment">
                                <div className="group">
                                    <h3 className="groupLabel">Yesterday</h3>
                                    <div className="groupImageWrap">
                                        <img className="groupImage" src={yesterdayWf.image} alt={yesterdayWf.name} />
                                    </div>
                                </div>

                                <div className="warframeOfDay">
                                    {isGuessed ? (
                                        <img className="guessed" src={todaysWf.image} alt={todaysWf.name} />
                                    ) : (
                                        <img width={50} height={50} className="notGuessed" src={lock} alt="locked" />
                                    )}
                                </div>

                                <div className="group">
                                    <h3 className="groupLabel">Daily</h3>
                                    <div className="groupImageWrap2">
                                        <span className="accessoriesLabel4">{dailyStreak || '0'}</span>
                                    </div>
                                </div>
                            </div>
                            <span className="warframeName">
                                <TimerComponent />
                            </span>
                            {isGuessed && (
                                <button
                                    onClick={() => {
                                        setModalToggle(!modalToggle);
                                    }}
                                    className="share-button"
                                >
                                    <img src={share} className="App-logo" alt="logo" />
                                    <span>Share</span>
                                </button>
                            )}
                            <div className="mainContent">
                                <div className="inputWrapper">
                                    {!isGuessed && (
                                        <div className="inputWrap">
                                            <input
                                                disabled={isGuessed}
                                                placeholder="Lotus"
                                                value={searchText}
                                                onChange={handleChange}
                                                onFocus={() => {
                                                    setVisible(true);
                                                    768 >= width &&
                                                        document.getElementById('warframe-input')?.scrollIntoView();
                                                }}
                                                className="input"
                                                id="warframe-input"
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
                                                    <img src={item.image} className="dropdownImage" alt={item.name} />
                                                    <span className="dropdownText">{item.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <h4 className="attemptLabel">
                                    Attempts
                                    {445 >= width && (
                                        <span className="attemptLabelInfo">{`<- Scroll for more info ->`}</span>
                                    )}
                                </h4>
                                <div className="horizontalScroll">
                                    <TableHeader />
                                    {todaysWf && guesses && guesses.length > 0
                                        ? [...guesses].reverse().map((item, index) => {
                                              return (
                                                  <GuessRow key={index} warframeGuess={item} todayWarframe={todaysWf} />
                                              );
                                          })
                                        : guesses.length !== 0 && <OrbitProgress size="medium" color={'#FFFFFF'} />}
                                </div>
                            </div>
                        </>
                    ) : !netError ? (
                        <OrbitProgress size="medium" color={'#FFFFFF'} />
                    ) : (
                        <>
                            <img
                                className="netErrorImage"
                                src={require('./assets/png/netError.png')}
                                alt="internet-error"
                            />
                            <p className="networkError">There was a server error</p>
                            <p className="networkError">Try again later</p>
                        </>
                    )}
                    <CustomNavigator />
                    {guesses.length > 0 && todaysWf && modalToggle && (
                        <Modal
                            todaysWf={todaysWf}
                            guesses={[...guesses].reverse()}
                            onClick={() => setModalToggle(false)}
                        />
                    )}
                </main>
            </div>
        </>
    );
}

export default Main;
