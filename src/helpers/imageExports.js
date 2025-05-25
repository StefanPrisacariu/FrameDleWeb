/* eslint-disable jsx-a11y/alt-text */
import Universal from '../assets/png/polarities/Aura_Pol.png';
import Madurai from '../assets/png/polarities/Madurai_Pol.png';
import Naramon from '../assets/png/polarities/Naramon_Pol.png';
import Unairu from '../assets/png/polarities/Unairu_Pol.png';
import Vazarin from '../assets/png/polarities/Vazarin_Pol.png';
import Zenurik from '../assets/png/polarities/Zenurik_Pol.png';
export const polarity = (e, index) => {
    switch (e) {
        case 'madurai':
            return <img key={index} alt="madurai" className="imageExports" src={Madurai} width={20} height={20} />;
        case 'naramon':
            return <img key={index} alt="naramon" className="imageExports" src={Naramon} width={20} height={20} />;
        case 'unairu':
            return <img key={index} alt="unairu" className="imageExports" src={Unairu} width={20} height={20} />;
        case 'vazarin':
            return <img key={index} alt="vazarin" className="imageExports" src={Vazarin} width={20} height={20} />;
        case 'zenurik':
            return <img key={index} alt="zenurik" className="imageExports" src={Zenurik} width={20} height={20} />;
        case 'universal':
            return <img key={index} alt="universal" className="imageExports" src={Universal} width={20} height={20} />;
        default:
            return null;
    }
};

export const elements = e => {
    switch (e) {
        case 'cold':
            return (
                <img
                    className="imageExports"
                    src={require('../assets/png/damage_types/DmgColdSmall64.webp')}
                    width={30}
                    height={30}
                    alt="cold"
                />
            );
        case 'electricity':
            return (
                <img
                    className="imageExports"
                    src={require('../assets/png/damage_types/DmgElectricitySmall64.webp')}
                    width={30}
                    height={30}
                    alt="electricity"
                />
            );
        case 'heat':
            return (
                <img
                    className="imageExports"
                    src={require('../assets/png/damage_types/DmgHeatSmall64.webp')}
                    width={30}
                    height={30}
                    alt="heat"
                />
            );
        case 'impact':
            return (
                <img
                    className="imageExports"
                    src={require('../assets/png/damage_types/DmgImpactSmall64.webp')}
                    width={30}
                    height={30}
                    alt="impact"
                />
            );
        case 'magnetic':
            return (
                <img
                    className="imageExports"
                    src={require('../assets/png/damage_types/DmgMagneticSmall64.webp')}
                    width={30}
                    height={30}
                    alt="magnetic"
                />
            );
        case 'radiation':
            return (
                <img
                    className="imageExports"
                    src={require('../assets/png/damage_types/DmgRadiationSmall64.webp')}
                    width={30}
                    height={30}
                    alt="radiation"
                />
            );
        case 'toxin':
            return (
                <img
                    className="imageExports"
                    src={require('../assets/png/damage_types/DmgToxinSmall64.webp')}
                    width={30}
                    height={30}
                    alt="toxin"
                />
            );
        default:
            return 'None';
    }
};
