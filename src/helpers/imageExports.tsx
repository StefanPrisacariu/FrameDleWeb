import Image from "next/image";
import Universal from "@/assets/png/polarities/Aura_Pol.png";
import Madurai from "@/assets/png/polarities/Madurai_Pol.png";
import Naramon from "@/assets/png/polarities/Naramon_Pol.png";
import Unairu from "@/assets/png/polarities/Unairu_Pol.png";
import Vazarin from "@/assets/png/polarities/Vazarin_Pol.png";
import Zenurik from "@/assets/png/polarities/Zenurik_Pol.png";

import Damage from "@/assets/png/playstyle_icons/damage.webp";
import Survival from "@/assets/png/playstyle_icons/survival.webp";
import CrowdControl from "@/assets/png/playstyle_icons/crowd_control.webp";
import Support from "@/assets/png/playstyle_icons/support.webp";
import Stealth from "@/assets/png/playstyle_icons/stealth.webp";

import Radiation from "@/assets/png/damage_types/DmgRadiationSmall64.webp";
import Cold from "@/assets/png/damage_types/DmgColdSmall64.webp";
import Heat from "@/assets/png/damage_types/DmgHeatSmall64.webp";
import Impact from "@/assets/png/damage_types/DmgImpactSmall64.webp";
import Magnetic from "@/assets/png/damage_types/DmgMagneticSmall64.webp";
import Toxin from "@/assets/png/damage_types/DmgToxinSmall64.webp";
import Electricity from "@/assets/png/damage_types/DmgElectricitySmall64.webp";

import Icon from "@/styles/components/Icon.module.scss";

export const polarity = (e: string, index: number) => {
    switch (e) {
        case "madurai":
            return (
                <Image
                    key={index}
                    alt="madurai"
                    className={Icon.fd_icon_1}
                    src={Madurai}
                    width={20}
                    height={20}
                />
            );
        case "naramon":
            return (
                <Image
                    key={index}
                    alt="naramon"
                    className={Icon.fd_icon_1}
                    src={Naramon}
                    width={20}
                    height={20}
                />
            );
        case "unairu":
            return (
                <Image
                    key={index}
                    alt="unairu"
                    className={Icon.fd_icon_1}
                    src={Unairu}
                    width={20}
                    height={20}
                />
            );
        case "vazarin":
            return (
                <Image
                    key={index}
                    alt="vazarin"
                    className={Icon.fd_icon_1}
                    src={Vazarin}
                    width={20}
                    height={20}
                />
            );
        case "zenurik":
            return (
                <Image
                    key={index}
                    alt="zenurik"
                    className={Icon.fd_icon_1}
                    src={Zenurik}
                    width={20}
                    height={20}
                />
            );
        case "universal":
            return (
                <Image
                    key={index}
                    alt="universal"
                    className={Icon.fd_icon_1}
                    src={Universal}
                    width={20}
                    height={20}
                />
            );
        default:
            return null;
    }
};

export const elements = (e: string) => {
    switch (e) {
        case "cold":
            return (
                <Image
                    className={Icon.fd_icon_1}
                    src={Cold}
                    width={30}
                    height={30}
                    alt="cold"
                />
            );
        case "electricity":
            return (
                <Image
                    className={Icon.fd_icon_1}
                    src={Electricity}
                    width={30}
                    height={30}
                    alt="electricity"
                />
            );
        case "heat":
            return (
                <Image
                    className={Icon.fd_icon_1}
                    src={Heat}
                    width={30}
                    height={30}
                    alt="heat"
                />
            );
        case "impact":
            return (
                <Image
                    className={Icon.fd_icon_1}
                    src={Impact}
                    width={30}
                    height={30}
                    alt="impact"
                />
            );
        case "magnetic":
            return (
                <Image
                    className={Icon.fd_icon_1}
                    src={Magnetic}
                    width={30}
                    height={30}
                    alt="magnetic"
                />
            );
        case "radiation":
            return (
                <Image
                    className={Icon.fd_icon_1}
                    src={Radiation}
                    width={30}
                    height={30}
                    alt="radiation"
                />
            );
        case "toxin":
            return (
                <Image
                    className={Icon.fd_icon_1}
                    src={Toxin}
                    width={30}
                    height={30}
                    alt="toxin"
                />
            );
        default:
            return "None";
    }
};

export const PlaystyleIcon = (e: Playstyle, length: number, key: number) => {
    switch (e) {
        case "damage":
            return (
                <Image
                    alt={"damage"}
                    key={key}
                    className={length < 3 ? Icon.fd_icon_3 : Icon.fd_icon_4}
                    src={Damage}
                />
            );
        case "stealth":
            return (
                <Image
                    alt={"stealth"}
                    key={key}
                    className={length < 3 ? Icon.fd_icon_3 : Icon.fd_icon_4}
                    src={Stealth}
                />
            );
        case "crowd-control":
            return (
                <Image
                    alt={"crowd-control"}
                    key={key}
                    className={length < 3 ? Icon.fd_icon_3 : Icon.fd_icon_4}
                    src={CrowdControl}
                />
            );
        case "support":
            return (
                <Image
                    alt={"support"}
                    key={key}
                    className={length < 3 ? Icon.fd_icon_3 : Icon.fd_icon_4}
                    src={Support}
                />
            );
        case "survival":
            return (
                <Image
                    alt={"survival"}
                    key={key}
                    className={length < 3 ? Icon.fd_icon_3 : Icon.fd_icon_4}
                    src={Survival}
                />
            );
        default:
            return "???";
    }
};
