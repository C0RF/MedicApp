import React from "react"
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import "./InfoPreviewer.css"
import { Link } from "react-router-dom";

const InfoPreviewer = (props) => {

  const { items } = props
  return (
    <>
        {
            items.map((item, idx) => (
                <Link style={{textDecoration: 'none'}} to="/diseases">
                <div key={idx} className="item-container">
                    <div className="information-preview">
                        <h3>
                            {item.title}
                        </h3>
                        <div className="hline"/>
                        <p>{item.description}</p>
                    </div>
                    <div className="speech-container">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => console.log("")}
                            edge="end"
                            className="primary"
                        >
                            <VolumeUpIcon />
                        </IconButton>
                    </div>
                </div>
                </Link>
            ))
        }
    </>
  )
}

export default InfoPreviewer
