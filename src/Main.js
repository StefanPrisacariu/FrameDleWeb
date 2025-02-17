/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import logo from "./assets/svg/title-logo.svg";
// import share from "./assets/svg/share-solid.svg";
import DropdownArrow from "./assets/svg/arrow-down-gold.svg";
import DropdownX from "./assets/svg/close-x.svg";
import Focus from "./assets/png/focus.png";
import "./App.css";
import { TableHeader } from "./components/TableHeader.js";
import { GuessRow } from "./components/GuessRow.js";
import { initialWarframes } from "./resources/warframes.js";
import { useState, useEffect, useCallback } from "react";
import { TimerComponent } from "./components/TimeComponent.js";
import SEO from "./components/SEO.js";
// import { Modal } from "./components/Modal.js";

import {
  getDailyStreak,
  getDailyStreakTime,
} from "./helpers/storeReadStreak.js";
import { storeGuesses, getGuesses } from "./helpers/storeReadGuesses.js";

import {
  isLowerThanToday320AM,
  isLowerThanToday320AMForGuesses,
} from "./helpers/isLowerThan320.js";

import { OrbitProgress } from "react-loading-indicators";
import ConfettiExplosion from "react-confetti-explosion";
import { CustomNavigator } from "./components/CustomNavigator.js";

function Main() {
  const [dailyStreak, setDailyStreak] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [filteredWarframes, setFilteredWarframes] = useState(initialWarframes);
  const [todaysWf, setTodaysWf] = useState(null);
  const [yesterdayWf, setYesterdayWf] = useState(null);
  const [netError, setNetError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isGuessed, setIsGuessed] = useState(false);
  const [wasSelected, setWasSelected] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  // const [modalToggle, setModalToggle] = useState(true);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    loadAndCheckTimeDifference();
    fetchTodaysWarframe();
    fetchYesterdayWarframe();
    fetchGuesses();
  }, []);

  useEffect(() => {
    if (
      todaysWf &&
      guesses.length > 0 &&
      guesses[guesses.length - 1]?.name === todaysWf.name
    ) {
      setIsGuessed(true);
    }
  }, [todaysWf, guesses]);

  const loadAndCheckTimeDifference = async () => {
    try {
      const lastCorrectGuessTime = await getDailyStreakTime();
      const lastStreak = await getDailyStreak();
      if (lastCorrectGuessTime === undefined || lastStreak === undefined) {
        return;
      }
      const time = isLowerThanToday320AM(lastCorrectGuessTime);
      if (lastCorrectGuessTime) {
        if (time === true) {
          setDailyStreak(0);
          storeGuesses([]);
        } else {
          setDailyStreak(lastStreak);
        }
      }
    } catch (error) {
      const temp = new Date();
      console.error("Error loading and checking time difference:", error);
      setDailyStreak(0);
      await localStorage.setItem("FD_DAILY_STREAK", JSON.stringify(0));
      await localStorage.setItem("FD_DAILY_STREAK_TIME", JSON.stringify(temp));
    }
  };

  const fetchTodaysWarframe = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_TODAY_ENDPOINT);
      const data = await response.json();
      const temp = initialWarframes[data.number];
      setTodaysWf(temp);
    } catch (error) {
      setNetError(true);
      setLoading(false);
      console.error("Error fetching today's data:", error);
    }
  };

  const fetchYesterdayWarframe = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_YESTERDAY_ENDPOINT);
      const data = await response.json();
      const temp = initialWarframes[data.number];
      setYesterdayWf(temp);
    } catch (error) {
      console.error("Error fetching yesterday's data:", error);
    }
  };

  const fetchGuesses = async () => {
    const lastTime = await getDailyStreakTime();
    const storedGuesses = await getGuesses();
    if (isLowerThanToday320AMForGuesses(lastTime)) {
      setGuesses([]);
      storeGuesses([]);
      setLoading(false);
    } else {
      setGuesses(storedGuesses);
      setWasSelected(true);
    }

    if (
      todaysWf &&
      storedGuesses.length > 0 &&
      storedGuesses[storedGuesses.length - 1]?.name === todaysWf.name
    ) {
      setIsGuessed(true);
    } else {
      setIsGuessed(false);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchGuesses();
  }, [todaysWf, yesterdayWf]);

  const handleCloseThings = useCallback((e) => {
    setVisible(false);
  }, []);

  const handleChange = useCallback((e) => {
    setSearchText(e.target.value);
    setVisible(true);
    const filtered = initialWarframes.filter((warframe) =>
      warframe.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredWarframes(filtered);
  }, []);

  const warframeSelected = useCallback(
    async (e) => {
      if (e.target) {
        e.target.blur();
      }
      setWasSelected(false);
      if (todaysWf !== null) {
        setSearchText("");
        handleCloseThings();
        setFilteredWarframes(initialWarframes);
        setGuesses([...guesses, e]);
        await localStorage.setItem(
          "FD_DAILY_STREAK_TIME",
          new Date().toISOString()
        );
        await storeGuesses([...guesses, e]).catch((error) =>
          console.error(error)
        );
        if (e.name === todaysWf.name) {
          setIsGuessed(true);
          updateDailyStreak();
        }
      }
      setWasSelected(true);
    },
    [guesses, todaysWf]
  );

  const updateDailyStreak = async () => {
    try {
      await localStorage.setItem(
        "FD_DAILY_STREAK",
        JSON.stringify(dailyStreak + 1)
      );
      setDailyStreak((prevStreak) => prevStreak + 1);
    } catch (error) {
      console.error("Error updating daily streak:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [window]);

  return (
    <>
      <SEO
        title="FrameDle - Warframe Guessing Game"
        description="Test your Warframe knowledge! Use clues like gender, aura polarity, and more to guess the Warframe of the day."
        url="https://framedle.org/"
      />
      <h1>Welcome to FrameDle!</h1>
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
                    ? require("./assets/png/google-play.png")
                    : require("./assets/png/google-play-icon.png")
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
                src={require("./assets/png/discord-icon.png")}
                alt="google-play-button"
              />
            </a>
          </header>
          {!loading && todaysWf ? (
            <>
              {isGuessed && (
                <ConfettiExplosion
                  particleCount={200}
                  duration={3000}
                  zIndex={100}
                  particleSize={10}
                />
              )}
              <div className="alignment">
                <div className="accessories">
                  <p className="accessoriesLabel">Time Until Reset</p>
                  <p className="accessoriesLabel">
                    <TimerComponent />
                  </p>
                </div>
                <div className="warframeOfDay">
                  {isGuessed ? (
                    <img className="guessed" src={todaysWf.image} />
                  ) : (
                    <img className="notGuessed" src={Focus} />
                  )}
                </div>
                <div className="accessories2">
                  <p className="accessoriesLabel2">Yesterday's Warframe</p>
                  <div className="streakContainer">
                    <p className="accessoriesLabel3">
                      {yesterdayWf?.name || "Lotus"}
                    </p>
                  </div>
                  <p className="accessoriesLabel2">Daily Streak</p>
                  <div className="streakContainer">
                    <p className="accessoriesLabel4">{dailyStreak || "0"}</p>
                  </div>
                </div>
              </div>
              <p className="warframeName">
                {isGuessed ? todaysWf.name : "???"}
              </p>
              {/* <button
                onClick={() => setModalToggle(!modalToggle)}
                className="share-button"
              >
                <img src={share} className="App-logo" alt="logo" />
                <p>Share</p>
              </button> */}
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
                      {filteredWarframes.map((item) => (
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
                          <GuessRow
                            key={index}
                            warframeGuess={item}
                            todayWarframe={todaysWf}
                          />
                        );
                      })
                    : guesses.length !== 0 && (
                        <OrbitProgress size="medium" color={"#FFFFFF"} />
                      )}
                </div>
              </div>
            </>
          ) : !netError ? (
            <OrbitProgress size="medium" color={"#FFFFFF"} />
          ) : (
            <>
              <img
                className="netErrorImage"
                src={require("./assets/png/netError.png")}
              />
              <p className="networkError">There was a server error</p>
              <p className="networkError">Try again later</p>
            </>
          )}
        </main>
        <CustomNavigator />
        {/* {guesses.length > 0 && todaysWf && modalToggle && (
          <Modal
            todaysWf={todaysWf}
            guesses={[...guesses].reverse()}
            onClick={() => setModalToggle(false)}
          />
        )} */}
      </div>
    </>
  );
}

export default Main;
