import Image from "next/image";

import Group from "@/styles/components/Group.module.scss";

interface Yesterday {
    image: string;
    name: string;
}

export const YesterdayPortrait = ({ image, name }: Yesterday) => {
    return (
        <div className={Group.fd_group_0}>
            <h3 className={Group.fd_group_0_label}>Yesterday</h3>
            <div className={Group.fd_group_0_wrap}>
                <Image
                    width={50}
                    height={50}
                    className={Group.fd_group_0_wrap_image}
                    src={image}
                    alt={name}
                />
            </div>
        </div>
    );
};
