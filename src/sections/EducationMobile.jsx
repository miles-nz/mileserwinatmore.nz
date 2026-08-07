import ZoomableSection from "../components/ZoomableSection.jsx";
import { EDUCATION } from "../data/cvData.jsx";

const EducationMobile = ({ expandedId, onExpand, onCollapse }) => (
    <section className="cvm-education cvm-body">
        <h2>Education</h2>
        <ZoomableSection
            id={EDUCATION.id}
            expandedId={expandedId}
            onExpand={onExpand}
            onCollapse={onCollapse}
            className="cvm-education-entry"
            variant="sidebar"
            breadcrumb="Education"
            ariaLabel="Zoom in on Education"
        >
            <h3 className="cvm-degree">{EDUCATION.degree}</h3>
            <div className="cvm-specialisation">{EDUCATION.specialisation}</div>
            <div className="cvm-university">{EDUCATION.university}</div>
        </ZoomableSection>
    </section>
);

export default EducationMobile;
