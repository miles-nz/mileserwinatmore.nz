import ZoomableSection from "../components/ZoomableSection.jsx";
import { EXPERIENCE_ROLES } from "../data/cvData.jsx";

const ExperienceMobile = ({ expandedId, onExpand, onCollapse }) => (
    <section className="cvm-experience cvm-body">
        <h2>Professional Experience</h2>
        {EXPERIENCE_ROLES.map((role) => (
            <ZoomableSection
                key={role.id}
                id={role.id}
                expandedId={expandedId}
                onExpand={onExpand}
                onCollapse={onCollapse}
                className="cvm-role"
                variant="main"
                breadcrumb="Professional Experience"
                ariaLabel={`Zoom in on ${role.title}`}
            >
                <div className="cvm-role-header">
                    <strong>{role.title}</strong>
                    <div>{role.company}</div>
                    <div className="cvm-dates">{role.dates}</div>
                </div>
                {role.summary && (
                    <div className="cvm-role-summary">{role.summary}</div>
                )}
                <ul>
                    {role.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                    ))}
                </ul>
            </ZoomableSection>
        ))}
    </section>
);

export default ExperienceMobile;
