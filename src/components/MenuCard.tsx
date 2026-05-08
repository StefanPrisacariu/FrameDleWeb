import Card from "@/styles/components/Card.module.scss";
import Image from "next/image";
import Link from "next/link";

interface MenuCard {
    href: string;
    wallpaperSrc?: string;
    iconSrc: string;
    name: string;
    targetBlank?: boolean;
}

export const MenuCard = ({
    href,
    name,
    wallpaperSrc = "/",
    iconSrc,
}: MenuCard) => {
    return (
        <div className={Card.fd_card_0}>
            <Link href={href} className={Card.fd_card_0_wrap}>
                <div className={Card.fd_card_0_wrap_container}>
                    <Image
                        width={700}
                        height={394}
                        src={wallpaperSrc}
                        alt={`Artwork ${name}`}
                        className={Card.fd_card_0_wrap_container_img}
                    />
                    <div className={Card.fd_card_0_wrap_container_overlay}>
                        <span>
                            <Image
                                width={200}
                                height={200}
                                src={iconSrc}
                                alt={`Icon ${name}`}
                                className={
                                    Card.fd_card_0_wrap_container_overlay_infinite
                                }
                            />
                            {name}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export const MenuSmallCard = ({
    href,
    name,
    iconSrc,
    targetBlank = false,
}: MenuCard) => {
    return (
        <div className={Card.fd_card_1}>
            <Link
                href={href}
                target={targetBlank ? "_blank" : "_self"}
                className={Card.fd_card_1_card}
            >
                <div className={Card.fd_card_1_card_wrap}>
                    <Image
                        width={500}
                        height={500}
                        src={iconSrc}
                        alt={`${name} Icon`}
                        className={
                            name === "Discord"
                                ? Card.fd_card_1_card_wrap_icon_discord
                                : name === "Ko-Fi"
                                  ? Card.fd_card_1_card_wrap_icon_discord
                                  : Card.fd_card_1_card_wrap_icon
                        }
                    />
                </div>
                <span>{name}</span>
            </Link>
        </div>
    );
};
