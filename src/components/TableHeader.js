import './TableHeader.css';

export const TableHeader = () => {
    return (
        <div className="tableHeaders">
            <div className="tableSection">
                <p className="tableHeadersText">Image</p>
            </div>
            <div className="tableSection">
                <p className="tableHeadersText">Gender</p>
            </div>
            <div className="tableSection">
                <p className="tableHeadersText">Variant</p>
            </div>
            <div className="tableSection">
                <p className="tableHeadersText">Aura Polarity</p>
            </div>
            <div className="tableSection">
                <p className="tableHeadersText">Progenitor Element</p>
            </div>
            {/* <div className="tableSection">
                <p className="tableHeadersText">Has Leverian</p>
            </div> */}
            <div className="tableSection">
                <p className="tableHeadersText">Release Year</p>
            </div>
        </div>
    );
};
