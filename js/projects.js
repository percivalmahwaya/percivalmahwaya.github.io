const projects = [
    {
        id: "bcachesshub",
        name: "Bulawayo Chess Hub",
        description: "Multi-tenant digital administration platform for a national chess federation: Swiss tournament pairing with Buchholz tiebreaks, Elo rating engine, Lichess OAuth login, PGN game viewer, EcoCash/InnBucks payments via Paynow, required 2FA for admins. 260 automated tests.",
        gradient: "linear-gradient(135deg, #1a1a2e, #f5a623)",
        icon: "fas fa-chess-knight",
        tags: ["Python", "Django", "PostgreSQL", "Bootstrap", "OAuth", "Railway"],
        github: "https://github.com/percivalmahwaya/bcaChessHub",
        demo: "https://web-production-abe9b.up.railway.app",
        live: true
    },
    {
        id: "fpl-decision-engine",
        name: "Progeny — FPL Decision Engine",
        description: "Self-improving Fantasy Premier League prediction engine: two-stage ML model backtested across four seasons, automated via GitHub Actions twice daily, with a live-scored accuracy dashboard comparing the model against baselines every gameweek. Published as a 91KB static site — no framework, no build step.",
        gradient: "linear-gradient(135deg, #1f7a3d, #d8a222)",
        icon: "fas fa-chart-line",
        tags: ["Python", "Pandas", "Scikit-learn", "SQLite", "GitHub Actions"],
        github: "https://github.com/percivalmahwaya/fpl-decision-engine",
        demo: "https://percivalmahwaya.github.io/fpl-decision-engine",
        live: true
    },
    {
        id: "osp-scout",
        name: "OSP Scout",
        description: "Multi-user companion app built on the FPL engine above, for a friend group of Fantasy Premier League managers. Installable PWA (and signed Android app) with a formation-based pitch view and transfer suggestions per person — no FPL login ever required, just a public team ID.",
        gradient: "linear-gradient(135deg, #1D1A16, #AD7A2E)",
        icon: "fas fa-mobile-alt",
        tags: ["JavaScript", "PWA", "Android", "Cloudflare Pages"],
        demo: "https://progeny-app.pages.dev",
        live: true
    },
    {
        id: "chess-economics",
        name: "Chess Economics Research: Below 2700",
        description: "Data journalism report investigating how titled chess players below the elite level actually earn a living, prompted by a grandmaster's 2026 retirement statement. Designed a stratified-random sampling methodology across 150+ players on five continents, with AI-assisted research execution and interactive data visualization.",
        gradient: "linear-gradient(135deg, #211D18, #AD7A2E)",
        icon: "fas fa-chess-pawn",
        tags: ["Research Design", "Data Visualization", "Statistical Sampling"],
        demo: "https://claude.ai/code/artifact/e84e0453-effe-4de7-be22-605cacd501a9",
        live: true
    },
    {
        id: "crime-hotspot-dss",
        name: "Crime Hotspot Prediction DSS",
        description: "Command Decision Support System built on my MSc thesis. Random Forest model (AUC-ROC 0.9663) classifies 275 police beats into three patrol tiers. Interactive choropleth map, resource allocation tables, and full model explainability.",
        gradient: "linear-gradient(135deg, #1a365d, #2b6cb0)",
        icon: "fas fa-map-marked-alt",
        tags: ["Python", "Scikit-learn", "Streamlit", "Folium", "GeoPandas"],
        github: "https://github.com/percivalmahwaya/crime-hotspot-dss",
        demo: "https://crime-hotspot-dss-8d2jrkagpvgsegqp6y23d4.streamlit.app/",
        live: true
    },
    {
        id: "sipdids-dashboard",
        name: "SIPDiDS Multi-Source Data Dashboard",
        description: "University Semester 4 team project. Integrates Reddit sentiment analysis, stock market correlations, movie insights, and academic publication trends into a single Streamlit dashboard. WSB Charcoal & Rose theme.",
        gradient: "linear-gradient(135deg, #2d3748, #e53e3e)",
        icon: "fas fa-chart-bar",
        tags: ["Python", "PRAW", "VADER", "Plotly", "Streamlit", "Pandas"],
        github: "https://github.com/percivalmahwaya/team-project-semester4",
        demo: "https://team-project-semester4-fp66bvgfdcds39aymanwbp.streamlit.app/",
        live: true
    },
    {
        id: "ibm-capstone",
        name: "IBM Data Science Capstone — SpaceX Launch Analysis",
        description: "End-to-end data science project: SpaceX launch records scraped, cleaned, and visualised. Interactive Plotly Dash dashboard with launch site maps and outcome prediction model.",
        gradient: "linear-gradient(135deg, #744210, #d69e2e)",
        icon: "fas fa-rocket",
        tags: ["Python", "Pandas", "Plotly Dash", "Folium", "Machine Learning"],
        github: "https://github.com/percivalmahwaya/IBM-Applied-Data-Science-Capstone-Project",
        live: false
    },
    {
        id: "jrm-quiz",
        name: "JRM Youth Traditions Challenge Quiz",
        description: "Interactive web quiz app for cultural traditions. Client-side only — no backend, no install. 7 QA bugs identified and fixed; gold crown achievement badge added.",
        gradient: "linear-gradient(135deg, #276749, #48bb78)",
        icon: "fas fa-trophy",
        tags: ["HTML", "CSS", "JavaScript", "QA Testing"],
        github: "https://github.com/percivalmahwaya/jrm-traditions-challenge",
        live: false
    },
    {
        id: "design-patterns",
        name: "Python Design Patterns Showcase",
        description: "Implementations of classic Gang-of-Four design patterns in Python: Factory, Singleton, Observer, Strategy, and more. Includes real-world analogies and unit tests for each pattern.",
        gradient: "linear-gradient(135deg, #44337a, #9f7aea)",
        icon: "fas fa-code",
        tags: ["Python", "OOP", "Design Patterns", "Unit Testing"],
        github: "https://github.com/percivalmahwaya/design-patterns-python-projects",
        live: false
    }
];

function createProjectCards() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    projects.forEach(project => {
        const tagsHTML = project.tags.map(t => `<span class="tech-badge" style="margin:2px 2px;">${t}</span>`).join('');
        const liveBadge = project.live ? '<span class="badge-live">LIVE</span>' : '';
        const demoBtn = project.demo
            ? `<a href="${project.demo}" target="_blank" class="btn btn-project-demo">Live App</a>`
            : '';
        const githubBtn = project.github
            ? `<a href="${project.github}" target="_blank" class="btn btn-read"><i class="fab fa-github mr-1"></i> GitHub</a>`
            : '<span class="text-muted" style="font-size:0.85em;">Private repo</span>';

        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-img-placeholder" style="background: ${project.gradient};">
                    <i class="${project.icon} fa-3x" style="opacity:0.85;"></i>
                </div>
                <div class="card-body">
                    <h5 class="card-title" style="color:#1a365d;font-weight:700;">
                        ${project.name}${liveBadge}
                    </h5>
                    <p class="card-text text-muted" style="font-size:0.9em;">${project.description}</p>
                    <div style="margin-top:8px;">${tagsHTML}</div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center" style="background:transparent;border-top:1px solid #f0f0f0;">
                    ${githubBtn}
                    ${demoBtn}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function includeHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => { document.getElementById(elementId).innerHTML = data; })
        .catch(error => console.error('Error loading ' + file + ':', error));
}

document.addEventListener('DOMContentLoaded', () => {
    includeHTML('includes/header.html', 'header-placeholder');
    includeHTML('includes/footer.html', 'footer-placeholder');
    createProjectCards();
});
