import { EDUCATION } from "../data/cvData.jsx";

const Education = () => (
    <section className="cv-education cv-body">
        <h2>Education</h2>
        <div className="cv-education-entry">
            <h3 className="cv-degree">{EDUCATION.degree}</h3>
            <div className="cv-specialisation">{EDUCATION.specialisation}</div>
            <div className="cv-university">{EDUCATION.university}</div>
        </div>
    </section>
);

export default Education;
