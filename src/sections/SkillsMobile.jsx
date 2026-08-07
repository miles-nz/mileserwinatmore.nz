import ZoomableSection from "../components/ZoomableSection.jsx";
import { SKILLS_SECTIONS } from "../data/cvData.jsx";

const SkillsMobile = ({ expandedId, onExpand, onCollapse }) => (
    <section className="cvm-skills cvm-body">
        <h2>Skills</h2>
        <ZoomableSection
            id="skills"
            expandedId={expandedId}
            onExpand={onExpand}
            onCollapse={onCollapse}
            className="cvm-skills-sections"
            variant="sidebar"
            breadcrumb="Skills"
            ariaLabel="Zoom in on Skills"
        >
            {SKILLS_SECTIONS.map((section) => (
                <div className="cvm-skills-section" key={section.id}>
                    <h3>{section.title}</h3>
                    <ul>
                        {section.items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </ZoomableSection>
    </section>
);

export default SkillsMobile;
