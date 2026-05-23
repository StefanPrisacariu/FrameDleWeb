import clsx from "clsx";

import { useColorblind } from "@/app/context/ColorblindContext";

import Container from "@/styles/components/Container.module.scss";
import GR from "@/styles/components/GuessRow.module.scss";
import Icon from "@/styles/components/Icon.module.scss";

import Arrow from "@/assets/svg/indicator-arrow.svg";
import Correct from "@/assets/svg/indicator-correct.svg";
import Incorrect from "@/assets/svg/indicator-incorrect.svg";
import Partial from "@/assets/svg/indicator-partial.svg";

export const ColorIndicators = () => {
    const { mode } = useColorblind();

    return (
        <div className={Container.fd_container_4}>
            <p className={Container.fd_container_4_title}>Color Indicators</p>
            <div className={Container.fd_container_4_indicators}>
                <div className={Container.fd_container_item}>
                    <div
                        className={clsx(
                            Container.fd_container_item_box,
                            GR.fd_gr_colors_correct,
                        )}
                    >
                        {"Disabled" !== mode && (
                            <Correct
                                className={Icon.fd_icon_p_3}
                                width={40}
                                height={40}
                            />
                        )}
                    </div>
                    <p className={Container.fd_container_item_text}>Right</p>
                </div>
                <div className={Container.fd_container_item}>
                    <div
                        className={clsx(
                            Container.fd_container_item_box,
                            GR.fd_gr_colors_partial,
                        )}
                    >
                        {"Disabled" !== mode && (
                            <Partial
                                className={Icon.fd_icon_p_3}
                                width={40}
                                height={40}
                            />
                        )}
                    </div>
                    <p className={Container.fd_container_item_text}>Partial</p>
                </div>
                <div className={Container.fd_container_item}>
                    <div
                        className={clsx(
                            Container.fd_container_item_box,
                            GR.fd_gr_colors_incorrect,
                        )}
                    >
                        {"Disabled" !== mode && (
                            <Incorrect
                                className={Icon.fd_icon_p_5}
                                width={40}
                                height={40}
                            />
                        )}
                    </div>
                    <p className={Container.fd_container_item_text}>Wrong</p>
                </div>
                <div className={Container.fd_container_item}>
                    <div
                        className={clsx(
                            Container.fd_container_item_box,
                            GR.fd_gr_colors_incorrect,
                        )}
                    >
                        <Arrow
                            className={Icon.fd_icon_p_3}
                            width={40}
                            height={40}
                        />
                    </div>
                    <p className={Container.fd_container_item_text}>Higher</p>
                </div>
                <div className={Container.fd_container_item}>
                    <div
                        className={clsx(
                            Container.fd_container_item_box,
                            GR.fd_gr_colors_incorrect,
                        )}
                    >
                        <Arrow
                            className={clsx(
                                Icon.fd_icon_p_3,
                                Icon.fd_icon_reverse,
                            )}
                            width={40}
                            height={40}
                        />
                    </div>
                    <p className={Container.fd_container_item_text}>Lower</p>
                </div>
            </div>
        </div>
    );
};
