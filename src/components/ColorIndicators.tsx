import DropdownX from '@/assets/svg/close-x.svg';
import { getColorblindMode } from '@/app/helpers/colorblindStore';

import GR from '@/styles/components/GuessRow.module.scss';
import Container from '@/styles/components/Container.module.scss';
import Icon from '@/styles/components/Icon.module.scss';

import Arrow from '@/assets/svg/indicator-arrow.svg';
import Correct from '@/assets/svg/indicator-correct.svg';
import Incorrect from '@/assets/svg/indicator-incorrect.svg';
import Partial from '@/assets/svg/indicator-partial.svg';
import clsx from 'clsx';

interface ColorInd {
    visible: boolean;
    setVisible: (context: boolean) => void;
}

export const ColorIndicators = ({ visible, setVisible }: ColorInd) => {
    const colorblind = getColorblindMode();

    const handleColorblind = (state: 'correct' | 'incorrect' | 'partial') => {
        switch (colorblind) {
            case 'Protanopia':
                return GR[`fd_gr_colors_pro_${state}`];
            case 'Deuteranopia':
                return GR[`fd_gr_colors_deu_${state}`];
            case 'Tritanopia':
                return GR[`fd_gr_colors_tri_${state}`];
            case 'Achromatopsia':
                return GR[`fd_gr_colors_acro_${state}`];
            default:
                return GR[`fd_gr_colors_std_${state}`];
        }
    };

    return (
        <div className={Container.fd_container_4}>
            <button className={Container.fd_container_button} onClick={() => setVisible(!visible)}>
                <div>
                    <DropdownX width={20} height={20} />
                </div>
            </button>
            <p className={Container.fd_container_4_title}>Color Indicators</p>
            <div className={Container.fd_container_4_indicators}>
                <div className={Container.fd_container_item}>
                    <div className={clsx(Container.fd_container_item_box, handleColorblind('correct'))}>
                        {'Disabled' !== colorblind && <Correct className={Icon.fd_icon_p_3} width={40} height={40} />}
                    </div>
                    <p className={Container.fd_container_item_text}>Right</p>
                </div>
                <div className={Container.fd_container_item}>
                    <div className={clsx(Container.fd_container_item_box, handleColorblind('partial'))}>
                        {'Disabled' !== colorblind && <Partial className={Icon.fd_icon_p_3} width={40} height={40} />}
                    </div>
                    <p className={Container.fd_container_item_text}>Partial</p>
                </div>
                <div className={Container.fd_container_item}>
                    <div className={clsx(Container.fd_container_item_box, handleColorblind('incorrect'))}>
                        {'Disabled' !== colorblind && <Incorrect className={Icon.fd_icon_p_5} width={40} height={40} />}
                    </div>
                    <p className={Container.fd_container_item_text}>Wrong</p>
                </div>
                <div className={Container.fd_container_item}>
                    <div className={clsx(Container.fd_container_item_box, handleColorblind('incorrect'))}>
                        <Arrow className={Icon.fd_icon_p_3} width={40} height={40} />
                    </div>
                    <p className={Container.fd_container_item_text}>Higher</p>
                </div>
                <div className={Container.fd_container_item}>
                    <div className={clsx(Container.fd_container_item_box, handleColorblind('incorrect'))}>
                        <Arrow className={clsx(Icon.fd_icon_p_3, Icon.fd_icon_reverse)} width={40} height={40} />
                    </div>
                    <p className={Container.fd_container_item_text}>Lower</p>
                </div>
            </div>
        </div>
    );
};
