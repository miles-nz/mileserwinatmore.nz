const Experience = () => (
    <section className="cv-experience cv-body">
        <h2>Professional Experience</h2>
        <div className="cv-role">
            <div className="cv-role-header">
                <strong>Platform Enablement & Automation Manager</strong>
                <div>The Warehouse Group</div>
                <div className="cv-dates">May 2026 - Current</div>
            </div>
        </div>
        <div className="cv-role">
            <div className="cv-role-header">
                <strong>Solution Engineer</strong>
                <div>The Warehouse Group</div>
                <div className="cv-dates">
                    Aug 2021 - Mar 2023, Dec 2023 - Feb 2026
                </div>
            </div>
            <div className="cv-role-summary">
                Served as a primary technical anchor for the major e-commerce
                brands The Warehouse, Noel Leeming, and Warehouse Stationery,
                balancing <strong>full-stack feature development</strong> with
                mission-critical <strong>application support</strong>.
            </div>
            <ul>
                <li>
                    <strong>Engineered full-stack features</strong> and
                    maintained SFCC core functionalities across major retail
                    brands, ensuring high-performance usability for high-traffic
                    storefronts.
                </li>
                <li>
                    <strong>
                        Translated application support insights into full-stack
                        solutions
                    </strong>
                    , preemptively identifying and remediating customer
                    usability issues during development.
                </li>
                <li>
                    <strong>Mastered complex legacy architecture</strong> as one
                    of only two developers capable of maintaining the Warehouse
                    Stationery platform, including critical bug fixes and
                    feature enhancements without service interruption.
                </li>
                <li>
                    <strong>Resolved P1 critical incidents</strong> and other
                    urgent technical failures as a designated on-call engineer,
                    ensuring 24/7 system coverage and rapid restoration of core
                    e-commerce services during key business periods.
                </li>
                <li>
                    <strong>Conducted technical investigations</strong> into
                    script-blocking behaviours to replace third-party Afterpay
                    components with custom-built alternatives, successfully
                    resolving payment gateway accessibility issues.
                </li>
                <li>
                    <strong>
                        Enhanced site observability and reduced alert fatigue
                    </strong>{" "}
                    by implementing precise New Relic alerting thresholds for
                    site response time and critical automated jobs.
                </li>
                <li>
                    <strong>Strengthened Agile delivery</strong> through
                    technical ticket refinements and high quality documentation,
                    providing additional support by facilitating ceremonies to
                    maintain team momentum.
                </li>
            </ul>
        </div>
    </section>
);

export default Experience;
