import { useEffect, useRef, useState } from 'react';
import { getIndicatorToggle, storeIndicatorToggle } from '@/app/helpers/indicatorStatus';
import Link from 'next/link';
import { ColorIndicators } from '@/app/components/ColorIndicators';
import LogoBaban from '@/assets/svg/title-logo.svg';

import Close from '@/assets/svg/close-x.svg';
import Menu from '@/assets/svg/bars-solid-icon.svg';
import { getColorblindMode, storeColorblindMode } from '@/app/helpers/colorblindStore';
import DropdownArrow from '@/assets/svg/arrow-down-gold.svg';
import { useRouter } from 'next/router';
import Button from '@/styles/components/Button.module.scss';
import Nav from '@/styles/components/Navigation.module.scss';
import Logo from '@/styles/components/Logo.module.scss';
import Group from '@/styles/components/Group.module.scss';
import ImgStyle from '@/styles/components/ImgStyle.module.scss';
import Dropdown from '@/styles/components/Dropdown.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import ArcaneOn from '@/assets/png/icons/arcaneOn.webp';
import ArcaneOff from '@/assets/png/icons/arcaneOff.webp';
import Mission from '@/assets/png/icons/IconMissionMarkerExtraction.webp';
import Utility from '@/assets/png/icons/IconUtility.webp';
import Quest from '@/assets/png/icons/IconQuest.webp';
import Feedback from '@/assets/png/icons/Chem_w.webp';
import Colorblind from '@/assets/png/icons/Ionic_w.webp';
import Google from '@/assets/png/google-play.png';
import Discord from '@/assets/png/discord-icon.png';

type ColorblindMode = 'Disabled' | 'Protanopia' | 'Deuteranopia' | 'Tritanopia' | 'Achromatopsia';

export const CustomNavigator = () => {
    const descriptor: string = useRouter().pathname;

    const [visible, setVisible] = useState<boolean>(false);
    const [isMobileNavVisible, setIsMobileNavVisible] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const ref2 = useRef<HTMLDivElement | null>(null);
    const mobileRef = useRef<HTMLDivElement | null>(null);

    const [colorblindMenu, setColorblindMenu] = useState<boolean>(false);
    const [colorblind, setColorblind] = useState<ColorblindMode>(getColorblindMode() as ColorblindMode);

    useEffect(() => {
        const fetchToggle = async () => {
            const storedToggle: boolean = await getIndicatorToggle();
            setVisible(storedToggle);
        };
        fetchToggle();
    }, []);

    const handleToggle = (): void => {
        setVisible(!visible);
        storeIndicatorToggle(!visible);
    };

    useEffect(() => {
        const handleNavigate = async () => {
            if (descriptor === '/info') {
                setVisible(false);
            } else {
                const storedToggle: boolean = await getIndicatorToggle();
                setVisible(storedToggle);
            }
        };

        handleNavigate();
    }, [descriptor]);

    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
        if (
            ref.current &&
            !ref.current.contains(event.target as Node) &&
            ref2.current &&
            !ref2.current.contains(event.target as Node)
        ) {
            setVisible(false);
            storeIndicatorToggle(false);
        }
    };

    const handleClickOutsideMobile = (event: MouseEvent | TouchEvent): void => {
        if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
            setIsMobileNavVisible(false);
            setColorblindMenu(false);
        }
    };

    const handleColorblind = (cb: ColorblindMode): void => {
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
            {isMobileNavVisible ? (
                <div className={Nav.fd_nav_0}>
                    <div className={Nav.fd_nav_0_wrap}>
                        <div ref={mobileRef} className={Nav.fd_nav_content}>
                            <div className={Nav.fd_nav_container}>
                                <LogoBaban className={Logo.fd_logo_1} />
                                <button
                                    onClick={() => {
                                        setIsMobileNavVisible(false);
                                        setColorblindMenu(false);
                                    }}
                                    className={Nav.fd_nav_button}
                                >
                                    <Close width={20} height={20} />
                                </button>
                                <div className={Group.fd_group_1}>
                                    <Link className={Group.fd_group_1_button} href="/">
                                        <div className={Group.fd_group_1_button_content}>
                                            <Image width={30} height={30} src={Mission} alt="Home" />
                                            <span
                                                className={clsx(Group.fd_group_1_button_text, {
                                                    [Group.fd_group_1_button_selected]: descriptor === '/',
                                                })}
                                            >
                                                Home
                                            </span>
                                        </div>
                                    </Link>
                                    <Link className={Group.fd_group_1_button} href="/endless">
                                        <div className={Group.fd_group_1_button_content}>
                                            <Image width={30} height={30} src={Utility} alt="Endless" />
                                            <span
                                                className={clsx(Group.fd_group_1_button_text, {
                                                    [Group.fd_group_1_button_selected]: descriptor === '/endless',
                                                })}
                                            >
                                                Endless
                                            </span>
                                        </div>
                                    </Link>
                                    <Link className={Group.fd_group_1_button} href="/info">
                                        <div className={Group.fd_group_1_button_content}>
                                            <Image width={30} height={30} src={Quest} alt="Info" />
                                            <span
                                                className={clsx(Group.fd_group_1_button_text, {
                                                    [Group.fd_group_1_button_selected]: descriptor === '/info',
                                                })}
                                            >
                                                Tutorial
                                            </span>
                                        </div>
                                    </Link>
                                    <Link
                                        className={Group.fd_group_1_button}
                                        href="https://docs.google.com/forms/d/e/1FAIpQLSdymNhRnpB4KHeGbSipdaSVTKss9KzrZHtxRope7uekQV8PMQ/viewform?usp=preview"
                                        target="_blank"
                                    >
                                        <div className={Group.fd_group_1_button_content}>
                                            <Image width={30} height={30} src={Feedback} alt="Feedback" />
                                            <span className={Button.fd_button_3_text}>Feedback</span>
                                        </div>
                                    </Link>
                                    <div className={Group.fd_group_1_button}>
                                        <div className={Group.fd_group_1_button_content}>
                                            <Image width={30} height={30} src={Colorblind} alt="Colorblind" />
                                            <span className={Button.fd_button_3_text}>Colorblind Mode</span>
                                        </div>
                                        <div className={Dropdown.fd_dropdown_1}>
                                            <div
                                                onClick={() => setColorblindMenu(!colorblindMenu)}
                                                className={Dropdown.fd_dropdown_1_wrap}
                                            >
                                                <span className={Button.fd_button_3_text}>{colorblind}</span>
                                            </div>
                                            <button
                                                className={Dropdown.fd_dropdown_1_button}
                                                onClick={() => setColorblindMenu(!colorblindMenu)}
                                            >
                                                <div className={Dropdown.fd_dropdown_1_button_content}>
                                                    <DropdownArrow width={15} height={15} />
                                                </div>
                                            </button>
                                            {colorblindMenu && (
                                                <div className={Dropdown.fd_dropdown_1_menu}>
                                                    <span
                                                        onClick={() => handleColorblind('Disabled')}
                                                        className={clsx(Dropdown.fd_dropdown_1_menu_item, {
                                                            [Dropdown.fd_dropdown_1_menu_selected]:
                                                                'Disabled' === colorblind,
                                                        })}
                                                    >
                                                        Disabled
                                                    </span>
                                                    <span
                                                        onClick={() => handleColorblind('Protanopia')}
                                                        className={clsx(Dropdown.fd_dropdown_1_menu_item, {
                                                            [Dropdown.fd_dropdown_1_menu_selected]:
                                                                'Protanopia' === colorblind,
                                                        })}
                                                    >
                                                        Protanopia
                                                    </span>
                                                    <span
                                                        onClick={() => handleColorblind('Deuteranopia')}
                                                        className={clsx(Dropdown.fd_dropdown_1_menu_item, {
                                                            [Dropdown.fd_dropdown_1_menu_selected]:
                                                                'Deuteranopia' === colorblind,
                                                        })}
                                                    >
                                                        Deuteranopia
                                                    </span>
                                                    <span
                                                        onClick={() => handleColorblind('Tritanopia')}
                                                        className={clsx(Dropdown.fd_dropdown_1_menu_item, {
                                                            [Dropdown.fd_dropdown_1_menu_selected]:
                                                                'Tritanopia' === colorblind,
                                                        })}
                                                    >
                                                        Tritanopia
                                                    </span>
                                                    <span
                                                        onClick={() => handleColorblind('Achromatopsia')}
                                                        className={clsx(Dropdown.fd_dropdown_1_menu_item, {
                                                            [Dropdown.fd_dropdown_1_menu_selected]:
                                                                'Achromatopsia' === colorblind,
                                                        })}
                                                    >
                                                        Achromatopsia
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={Group.fd_group_2}>
                                        <Link
                                            href="https://play.google.com/store/apps/details?id=com.framedle"
                                            target="_blank"
                                        >
                                            <div>
                                                <Image
                                                    width={200}
                                                    className={ImgStyle.fd_imgstyle_google}
                                                    src={Google}
                                                    alt="Info"
                                                />
                                            </div>
                                        </Link>
                                        <Link href="https://discord.gg/qqmr3Uz32f" target="_blank">
                                            <div>
                                                <Image
                                                    height={70}
                                                    className={ImgStyle.fd_imgstyle_discord}
                                                    src={Discord}
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
                    <button
                        onClick={() => setIsMobileNavVisible(true)}
                        className={clsx(Button.fd_button_1, Button.fd_button_2)}
                    >
                        <Menu width={20} height={20} className={Button.fd_button_1_image} />
                    </button>
                    {'/info' !== descriptor && (
                        <button
                            disabled={'/info' === descriptor && true}
                            className={Button.fd_button_3}
                            onClick={() => handleToggle()}
                        >
                            <div className={Button.fd_button_3_indicator} ref={ref2}>
                                {visible && '/info' !== descriptor ? (
                                    <Image
                                        width={30}
                                        height={30}
                                        className={Button.fd_button_3_indicator_icon}
                                        src={ArcaneOn}
                                        alt="Toggle"
                                    />
                                ) : (
                                    <Image
                                        width={30}
                                        height={30}
                                        className={Button.fd_button_3_indicator_icon}
                                        src={ArcaneOff}
                                        alt="Toggle"
                                    />
                                )}
                                <span className={Button.fd_button_3_text}>Legend</span>
                            </div>
                        </button>
                    )}
                </>
            )}
        </>
    );
};
