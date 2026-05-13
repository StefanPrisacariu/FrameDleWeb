import Table from "@/styles/components/Table.module.scss";

const Heads = [
    "Image",
    "Gender",
    "Variant",
    "Aura Polarity",
    "Playstyle",
    "Progenitor Element",
    "Release Year",
];

export const TableHeader = () => {
    return (
        <div className={Table.fd_table_0}>
            {Heads.map((item) => (
                <div key={item} className={Table.fd_table_section}>
                    <p className={Table.fd_table_text}>{item}</p>
                </div>
            ))}
        </div>
    );
};
