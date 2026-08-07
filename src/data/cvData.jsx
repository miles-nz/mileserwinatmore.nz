export const HEADER = {
    name: "Miles Erwin-Atmore",
    phone: "021 0240 8271",
    phoneHref: "tel:+642102408271",
    email: "mileserwinatmore@gmail.com",
    emailHref: "mailto:mileserwinatmore@gmail.com",
};

export const SKILLS_SECTIONS = [
    {
        id: "skills-languages",
        title: "Programming Languages",
        items: [
            "JavaScript | TypeScript | ES6+ | Node.js | React.js",
            "Java | Python | SQL",
            "C | C++",
        ],
    },
    {
        id: "skills-expertise",
        title: "Technical Expertise",
        items: [
            "Full-Stack Web Development",
            "API Architecture & Integration",
            "Legacy Code Refactoring",
            "Process Automation & AI",
        ],
    },
    {
        id: "skills-tools",
        title: "Tools & Platforms",
        items: [
            "Salesforce Commerce Cloud (SFCC)",
            "Jira | Confluence",
            "Git | GitHub | Bitbucket",
        ],
    },
    {
        id: "skills-processes",
        title: "Operational Processes",
        items: [
            "Agile | Scrum | SDLC",
            "Unit Testing | Regression Testing",
            "Incident Response",
        ],
    },
];

export const EDUCATION = {
    id: "education",
    degree: "Bachelor of Engineering (Honours)",
    specialisation: "Computer Systems Engineering",
    university: "The University of Auckland",
};

export const EXPERIENCE_ROLES = [
    {
        id: "role-platform-enablement",
        title: "Platform Enablement & Automation Manager",
        company: "The Warehouse Group",
        dates: "May 2026 - Current",
        summary: null,
        bullets: [
            <>
                <strong>Own the automation roadmap</strong> for Salesforce
                Commerce Cloud ecommerce platforms across The Warehouse and
                Warehouse Stationery, developing AI-assisted tooling and
                custom-built solutions to eliminate manual processes.
            </>,
            <>
                <strong>Manage vendor relationships</strong> and support
                platform users as the technical SFCC SME for the Omni
                Experience team.
            </>,
        ],
    },
    {
        id: "role-solution-engineer",
        title: "Solution Engineer",
        company: "The Warehouse Group",
        dates: "Aug 2021 - Mar 2023, Dec 2023 - Feb 2026",
        summary: (
            <>
                Served as a primary technical anchor for the major e-commerce
                brands The Warehouse, Noel Leeming, and Warehouse Stationery,
                balancing <strong>full-stack feature development</strong> with
                mission-critical <strong>application support</strong>.
            </>
        ),
        bullets: [
            <>
                <strong>Engineered full-stack features</strong> and
                maintained SFCC core functionalities across major retail
                brands, ensuring high-performance usability for high-traffic
                storefronts.
            </>,
            <>
                <strong>
                    Translated application support insights into full-stack
                    solutions
                </strong>
                , preemptively identifying and remediating customer usability
                issues during development.
            </>,
            <>
                <strong>Mastered complex legacy architecture</strong> as one
                of only two developers capable of maintaining the Warehouse
                Stationery platform, including critical bug fixes and feature
                enhancements without service interruption.
            </>,
            <>
                <strong>Resolved P1 critical incidents</strong> and other
                urgent technical failures as a designated on-call engineer,
                ensuring 24/7 system coverage and rapid restoration of core
                e-commerce services during key business periods.
            </>,
            <>
                <strong>Conducted technical investigations</strong> into
                script-blocking behaviours to replace third-party Afterpay
                components with custom-built alternatives, successfully
                resolving payment gateway accessibility issues.
            </>,
            <>
                <strong>
                    Enhanced site observability and reduced alert fatigue
                </strong>{" "}
                by implementing precise New Relic alerting thresholds for
                site response time and critical automated jobs.
            </>,
        ],
    },
];
