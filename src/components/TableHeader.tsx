import Table from '@/styles/components/Table.module.scss';

export const TableHeader = () => {
    return (
        <div className={Table.fd_table_0}>
            <div className={Table.fd_table_section}>
                <p className={Table.fd_table_text}>Image</p>
            </div>
            <div className={Table.fd_table_section}>
                <p className={Table.fd_table_text}>Gender</p>
            </div>
            <div className={Table.fd_table_section}>
                <p className={Table.fd_table_text}>Variant</p>
            </div>
            <div className={Table.fd_table_section}>
                <p className={Table.fd_table_text}>Aura Polarity</p>
            </div>
            <div className={Table.fd_table_section}>
                <p className={Table.fd_table_text}>Progenitor Element</p>
            </div>
            {/* <div className={Table.fd_table_section}>
                <p className={Table.fd_table_text}>Has Leverian</p>
            </div> */}
            <div className={Table.fd_table_section}>
                <p className={Table.fd_table_text}>Release Year</p>
            </div>
        </div>
    );
};
