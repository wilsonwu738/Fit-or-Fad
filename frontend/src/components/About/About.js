import React from "react";
import './About.css';
import githubLogo from '../../images/github-logo.png';
import linkedInLogo from '../../images/linkedin.png';

function About() {

    const bio = {
        tim: {
            name: "Timothy Chang",
            title: "Team Lead",
            image: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/TIMOTHYCHANGGGG.jpeg",
            github: "https://github.com/tchang135",
            linkedIn: "https://www.linkedin.com/in/timothy-s-chang/"
        },
        jiongqi: {
            name: "Jiong Qi Pan",
            title: "Frontend Lead",
            image: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img26.jpeg",
            github: "https://github.com/JQ-pan",
            linkedIn: "https://www.linkedin.com/in/jiongqi/"
        },
        chak: {
            name: "Chak Hoi Chan",
            title: "Design Lead / Frontend",
            image: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/daddy_chak.jpeg",
            github: "https://github.com/chakhoic",
            linkedIn: "https://www.linkedin.com/in/chak-hoi-chan-19672046/"
        },
        wilson: {
            name: "Wilson Wu",
            title: "Backend Lead",
            image: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/wilsonimg.png",
            github: "https://www.linkedin.com/in/wilsonwu738/",
            linkedIn: "https://github.com/wilsonwu738"
        },
        daniel: {
            name: "Daniel Lee",
            title: "Backend / Frontend Flex",
            image: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/danimg.jpg",
            github: "https://github.com/dlee131",
            linkedIn: "https://www.linkedin.com/in/daniel-lee-231a57262/"
        }
    }

    return (
        <div className="dev-box-container">
            {Object.entries(bio).map(([key, value]) => (
                <div key={key} className="dev-individual">
                    <h2 className="dev-name">{value.name}</h2>
                    <h3 className="dev-title">{value.title}</h3>
                    <img className="dev-image" src={value.image} alt={""} />
                    <div className="links-container">
                        <a href={value.github}><img className="link-logo" src={githubLogo} /></a>
                        <a href={value.linkedIn}><img className="link-logo" src={linkedInLogo} /></a>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default About;