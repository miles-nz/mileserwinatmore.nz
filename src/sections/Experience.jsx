import { EXPERIENCE_ROLES } from "../data/cvData.jsx";

const Experience = () => (
    <section className="cv-experience cv-body">
        <h2>Professional Experience</h2>
        {EXPERIENCE_ROLES.map((role) => (
            <div className="cv-role" key={role.id}>
                <div className="cv-role-header">
                    <strong>{role.title}</strong>
                    <div>{role.company}</div>
                    <div className="cv-dates">{role.dates}</div>
                </div>
                {role.summary && (
                    <div className="cv-role-summary">{role.summary}</div>
                )}
                <ul>
                    {role.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                    ))}
                </ul>
            </div>
        ))}
    </section>
);

export default Experience;
