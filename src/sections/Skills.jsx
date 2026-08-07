import { SKILLS_SECTIONS } from "../data/cvData.jsx";

const Skills = () => (
    <section className="cv-skills cv-body">
        <h2>Skills</h2>
        <div className="cv-skills-sections">
            {SKILLS_SECTIONS.map((section) => (
                <div className="cv-skills-section" key={section.id}>
                    <h3>{section.title}</h3>
                    <ul>
                        {section.items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </section>
);

export default Skills;
