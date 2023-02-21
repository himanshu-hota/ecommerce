import React from 'react'


// wrapper component
const Glass = ({ height, width, children,name ,className}) => {
    return (
        <div className={`${name} ${height} ${width} ${className} bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  border-[0.5px] border-gray-100`}>
        {children}
        </div>
    )
}

export default Glass