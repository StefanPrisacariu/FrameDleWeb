/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import logo from './assets/svg/title-logo.svg';
import { CustomNavigator } from './components/CustomNavigator.js';
import { GuessRow } from './components/GuessRow.js';
import './Info.css';
import { initialWarframes } from './resources/warframes.js';
import SEO from './components/SEO.js';
import { TimerComponent } from './components/TimeComponent.js';

function Info() {
    return (
        <>
            <SEO
                title="FrameDle - How to Play"
                description="Learn how to play FrameDle! Understand the clues and master the game to become a Warframe guessing expert."
                url="https://framedle.org/info"
            />
            <h1>How to Play</h1>

            <div className="Info">
                <main className="Info-main">
                    <header className="Info-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </header>
                    <div className="info-alignment">
                        <p className="info-textTitle">How to play?</p>
                        <p className="info-text">
                            In <span className="info-textLink">Daily</span> mode you have to guess today's warframe from
                            Digital Extreme's game "Warframe". It changes every 24h. For Daily mode you also need an
                            internet connection.
                        </p>
                        <p className="info-text">
                            Next warframe in: <TimerComponent />
                        </p>
                        <p className="info-text">
                            While in <span className="info-textLink">Endless</span> mode, you can play as much as you
                            want just by pressing the <span className="info-textLink">New Warframe</span> button to
                            reset the game, please note that the Endless mode doesn't add to the Daily mode's Streak.
                            Also, the Endless mode doesn't require an internet connection, it can be enjoyed whenever
                            you want.
                        </p>
                        <p className="info-text">
                            Simply type in the name of a warframe and it will reveal its properties. The color of the
                            tiles will change to show how close your guess was to the warframe to find.
                        </p>
                        <p className="info-text">
                            <span className="info-text blue-text">Green</span> indicates the property is an exact match.
                        </p>
                        <p className="info-text">
                            <span className="info-text red-text">Red</span> indicates there is no overlap between your
                            guess and the property.
                        </p>
                        <p className="info-text">
                            <span className="info-text orange-text">Orange</span> indicates there is a partial match
                            between your guess and the property.
                        </p>
                        <p className="info-text">
                            ⬇️ ⬆️ With arrows, it also indicates if the answer property is above or below your guess.
                        </p>

                        <p className="info-textTitle">Properties</p>
                        <p className="info-text">Here is the details of each of the properties columns:</p>

                        <p className="info-textLabel">Gender</p>
                        <p className="info-text">Possible Values: Male, Female, Non Binary</p>
                        <p className="info-textLabel">Variant</p>
                        <p className="info-text">Possible Values: Standard, Prime, Umbra</p>
                        <p className="info-textLabel">Aura Polarity</p>
                        <p className="info-text">Possible Values: Madurai, Vazarin, Naramon, etc...</p>
                        <p className="info-textLabel">Progenitor Element</p>
                        <p className="info-text">Possible Values: Impact, Radiation, Cold, etc...</p>
                        <p className="info-textLabel">Release Year</p>
                        <p className="info-text">When the champion was released to be played.</p>

                        <p className="info-textTitle">Example</p>
                        <p className="info-text">
                            Consider the correct answer is <span className="info-textLink">Excalibur Prime</span>. If
                            you enter <span className="info-textLink">Qorvex</span> these properties will appear:
                        </p>
                        <div className="info-scroller">
                            <GuessRow
                                warframeGuess={initialWarframes.find(item => 'Qorvex' === item.name)}
                                todayWarframe={initialWarframes.find(item => 'Excalibur Prime' === item.name)}
                            />
                        </div>

                        <p className="info-textLabel">
                            Gender: <span className="info-text blue-text">Green</span>
                        </p>
                        <p className="info-text">It is an exact match, they are both male.</p>
                        <p className="info-textLabel">
                            Prime / Umbra: <span className="info-text red-text">Red</span>
                        </p>
                        <p className="info-text">It is not a match since Excalibur Prime is a Prime variant.</p>
                        <p className="info-textLabel">
                            Aura Polarity: <span className="info-text red-text">Red</span>
                        </p>
                        <p className="info-text">It is not a match since Excalibur Prime's aura polarity is Madurai.</p>
                        <p className="info-textLabel">
                            Progenitor Element: <span className="info-text red-text">Red</span>
                        </p>
                        <p className="info-text">
                            It is not a match since Excalibur Prime's progenitor element is Electricity.
                        </p>
                        <p className="info-textLabel">
                            Release Year: <span className="info-text red-text">Red</span> and down arrow
                        </p>
                        <p className="info-text">Excalibur Prime's Release year is before 2023</p>
                        <p className="info-text">If you enter Excalibur Prime, here is what would come up:</p>

                        <div className="info-scroller">
                            <GuessRow
                                warframeGuess={initialWarframes.find(item => 'Excalibur Prime' === item.name)}
                                todayWarframe={initialWarframes.find(item => 'Excalibur Prime' === item.name)}
                            />
                        </div>

                        <p className="info-text">Good Luck, Tenno!</p>
                        <p className="info-text"> </p>
                        <p className="info-text"> </p>
                        <p className="info-text"> </p>

                        <p className="info-textTitle">Disclaimer</p>
                        <p className="info-text">
                            FrameDle is a passion project created with the sole purpose of providing entertainment to
                            Warframe enthusiasts. It's important to note that FrameDle and its developer have no
                            affiliation with{' '}
                            <span
                                className="info-textLink"
                                onClick={() => window.open('https://www.digitalextremes.com/')}
                            >
                                Digital Extremes
                            </span>
                            , the creators of{' '}
                            <span className="info-textLink" onClick={() => window.open('https://www.warframe.com/')}>
                                Warframe
                            </span>
                            . Rest assured, FrameDle respects your privacy and does not collect any user data.
                        </p>
                        <p className="info-text">
                            Our commitment to transparency extends to our{' '}
                            <span
                                className="info-textLink"
                                onClick={() =>
                                    window.open('https://sites.google.com/view/framedle/terms-of-service?authuser=0')
                                }
                            >
                                Terms & Conditions
                            </span>{' '}
                            and{' '}
                            <span
                                className="info-textLink"
                                onClick={() =>
                                    window.open('https://sites.google.com/view/framedle/privacy-policy?authuser=0')
                                }
                            >
                                Privacy Policy
                            </span>
                            , which are readily accessible through attached links. We value your trust and want you to
                            feel comfortable using our app.
                        </p>
                        <p className="info-text">
                            The icons and fonts used in FrameDle are sourced from Warframe, and the captivating
                            background image is courtesy of a talented creator on{' '}
                            <span
                                className="info-textLink"
                                onClick={() =>
                                    window.open(
                                        'https://www.reddit.com/r/Warframe/comments/8xsta2/warframe_fortuna_mobile_wallpaper_i_made_thought/'
                                    )
                                }
                            >
                                Reddit
                            </span>
                            , . We appreciate their contributions to making FrameDle visually appealing.
                        </p>
                        <p className="info-text">
                            If you have any questions, feedback, or simply want to reach out, you can contact us at{' '}
                            <span className="info-textLink">support@framedle.org</span>. Your input helps us improve and
                            enhance the FrameDle experience for everyone.
                        </p>
                        <p className="info-text">
                            Lastly, if you enjoy using FrameDle and would like to show your support, consider making a
                            donation on Ko-Fi. Your generosity helps us continue developing and maintaining FrameDle for
                            the Warframe community. Thank you for being a part of the FrameDle journey!
                        </p>
                        <button className="info-kofi" onClick={() => window.open('https://ko-fi.com/leokaiskarri')}>
                            <img
                                className="info-kofi"
                                src={require('./assets/png/logo_white_stroke_small.webp')}
                                alt="Ko-Fi Logo"
                            />
                        </button>
                    </div>
                    <CustomNavigator />
                </main>
            </div>
        </>
    );
}

export default Info;
