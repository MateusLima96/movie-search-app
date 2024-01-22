import React from "react";

interface SearchBoxProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({searchValue, setSearchValue}) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className="col col-sm-4">
            <input
                className="form-control"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Type to search...">
            </input>
        </div>
    )
}

export default SearchBox;