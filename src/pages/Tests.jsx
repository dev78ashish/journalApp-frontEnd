import React, { useEffect } from 'react'

const Tests = () => {

    useEffect(() => {
        fetch("http://localhost:5000/public/health-check")
            .then(response => response.text()) // since the response is a string
            .then(data => console.log(data)) // should print "Ok"
            .catch(error => console.error("Error:", error));

    })

    return (
        <div></div>
    )
}

export default Tests