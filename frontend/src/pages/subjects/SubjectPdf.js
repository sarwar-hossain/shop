import React from 'react';
import { Link } from 'react-router-dom';

import './../../pagescss/Subjects.css';

function SubjectPdf(props) {
    // Correctly assign props.icon to a capitalized variable
    const IconComponent = props.icon;

    return (



        <Link
            to={`/${props.name.toLowerCase().replace(' ', '-')}/${props.link}/${props.id}`}
            className="subject-card"
            style={{ borderLeft: `5px solid ${props.color}` }}
        >
            <div className="subject-card-header" >
                <div className="subject-icon" style={{ color: props.color }}>
                    {IconComponent && <IconComponent size={35} />}
                </div>
                <h2>{props.subject}</h2>
            </div>
        </Link>


    );
}

export default SubjectPdf;