import clsx from "clsx";

import Icon from "@/styles/components/Icon.module.scss";

import Correct from "@/assets/svg/indicator-correct.svg";
import Incorrect from "@/assets/svg/indicator-incorrect.svg";
import Partial from "@/assets/svg/indicator-partial.svg";

export const handleIcon = (state: string, mode: string) => {
    if ("Disabled" !== mode) {
        switch (state) {
            case "correct":
                return (
                    <Correct
                        className={clsx(Icon.fd_icon_0, Icon.fd_icon_p_3)}
                        width={55}
                        height={55}
                    />
                );
            case "incorrect":
                return (
                    <Incorrect
                        className={clsx(Icon.fd_icon_0, Icon.fd_icon_p_5)}
                        width={50}
                        height={50}
                    />
                );
            case "partial":
                return (
                    <Partial
                        className={clsx(Icon.fd_icon_0, Icon.fd_icon_p_3)}
                        width={60}
                        height={60}
                    />
                );
            default:
                return null;
        }
    }
};
