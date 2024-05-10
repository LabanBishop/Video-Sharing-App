import React from "react"
import {Col, Container, Row} from "react-bootstrap"
import Video from "../../Components/VideoComp/Video"
import CommunitiesBar from "../../Components/CommunitiesBarComp/CommunitiesBar"

const Homescreen = () => {
    return (
        <div>
        <CommunitiesBar />
        < Video />
        </div>
    )
}

export default Homescreen