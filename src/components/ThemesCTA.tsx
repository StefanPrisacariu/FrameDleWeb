import Cta from "@/styles/components/CTA.module.scss";

interface CTA {
    text: string;
}

export const ThemesCTA = ({ text }: CTA) => {
    return <div className={Cta.fd_cta}>{text}</div>;
};
