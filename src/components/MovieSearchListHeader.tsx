import React from "react";

interface MovieSearchListHeaderProps {
    heading: string;
}

const MovieSearchListHeader: React.FC<MovieSearchListHeaderProps> = ({heading}) => {
    return (
        <div className="col">
            <h1>{heading}</h1>
        </div>
    )
}

export default MovieSearchListHeader;