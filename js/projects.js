/* projects.js — project data + card rendering.
   `live` means VERIFIED responding, not "was deployed once" (invariant 4).
   Verified 2026-10-11 by fetching each URL. */

const projects = [
    {
        id: "bcachesshub",
        name: "Bulawayo Chess Hub",
        description: "Tournament administration for a chess federation: Swiss pairing with Buchholz tiebreaks, an Elo rating engine, Lichess sign-in, PGN replay, and EcoCash/InnBucks payments via Paynow. Two-factor authentication is mandatory for administrators.",
        tags: ["Python", "Django", "PostgreSQL", "OAuth", "Railway"],
        stats: [["260", "Tests"], ["7", "Apps"]],
        kicker: "Django · PostgreSQL",
        github: "https://github.com/percivalmahwaya/bcaChessHub",
        demo: "https://web-production-abe9b.up.railway.app",
        demoLabel: "Open the site",
        live: true
    },
    {
        id: "fpl-decision-engine",
        name: "Progeny — FPL Decision Engine",
        description: "A prediction engine that runs itself: collects data, retrains, predicts, scores its own past accuracy against two baselines, and republishes — twice a day on a schedule, with no manual step. Two-stage model backtested across four seasons.",
        tags: ["Python", "Scikit-learn", "Pandas", "SQLite", "GitHub Actions"],
        stats: [["4", "Seasons backtested"], ["91 KB", "Page weight"]],
        kicker: "Machine learning · CI/CD",
        github: "https://github.com/percivalmahwaya/fpl-decision-engine",
        demo: "https://percivalmahwaya.github.io/fpl-decision-engine",
        demoLabel: "Open the engine",
        live: true
    },
    {
        id: "osp-scout",
        name: "OSP Scout",
        description: "The FPL engine above turned into something a friend group can use: each person sees their own squad, transfer suggestions and captain pick. Installable as a PWA and signed for Android — and it never asks anyone to log into their real account.",
        tags: ["JavaScript", "PWA", "Android", "Cloudflare Pages"],
        stats: [["0", "Passwords stored"], ["$0", "Running cost"]],
        kicker: "PWA · Android",
        demo: "https://progeny-app.pages.dev",
        demoLabel: "Open the app",
        live: true
    },
    {
        id: "chess-economics",
        name: "Chess Economics: Below 2700",
        description: "A data journalism report on how titled chess players below the elite level actually earn a living, prompted by a grandmaster's 2026 retirement statement. I designed the stratified sampling methodology and the research brief; execution was AI-assisted across 150 players on five continents.",
        tags: ["Research Design", "Data Visualisation", "Statistical Sampling"],
        stats: [["150", "Players sampled"], ["5", "Continents"]],
        kicker: "Research · Data journalism",
        demo: "https://claude.ai/code/artifact/e84e0453-effe-4de7-be22-605cacd501a9",
        demoLabel: "Read the report",
        // Not "private repo" — there is no repo. The output is the report itself.
        repoNote: "Research output, no repo",
        live: false
    },
    {
        id: "crime-hotspot-dss",
        name: "Crime Hotspot Prediction DSS",
        description: "My MSc thesis built into a decision support system. A Random Forest model (AUC-ROC 0.9663) sorts 275 police beats into three patrol tiers, with an interactive choropleth, resource allocation tables and full model explainability.",
        tags: ["Python", "Scikit-learn", "Streamlit", "Folium", "GeoPandas"],
        stats: [["0.9663", "AUC-ROC"], ["275", "Beats classified"]],
        kicker: "Machine learning · MSc thesis",
        github: "https://github.com/percivalmahwaya/crime-hotspot-dss",
        // Deliberately NOT marked live: the hosted app redirects to a login wall
        // (HTTP 303, verified 2026-10-11), so it is not publicly reachable.
        // Invariant 4 — nothing is claimed live that is not verified live.
        live: false
    },
    {
        id: "sipdids-dashboard",
        name: "SIPDiDS Multi-Source Dashboard",
        description: "University team project integrating Reddit sentiment analysis, stock market correlations, movie insights and academic publication trends into one dashboard. I coordinated the team and built the social media trend analysis.",
        tags: ["Python", "PRAW", "VADER", "Plotly", "Streamlit"],
        stats: [["5", "Data sources"], ["5", "Team members"]],
        kicker: "Team project · Data mining",
        github: "https://github.com/percivalmahwaya/team-project-semester4",
        live: false
    },
    {
        id: "ibm-capstone",
        name: "IBM Capstone — SpaceX Launch Analysis",
        description: "End-to-end data science project: SpaceX launch records scraped, cleaned and visualised, with an interactive Plotly Dash dashboard, launch site maps and an outcome prediction model.",
        tags: ["Python", "Pandas", "Plotly Dash", "Folium"],
        stats: [["4", "Notebooks"], ["1", "Dash app"]],
        kicker: "Data science · Capstone",
        github: "https://github.com/percivalmahwaya/IBM-Applied-Data-Science-Capstone-Project",
        live: false
    },
    {
        id: "jrm-quiz",
        name: "JRM Youth Traditions Challenge",
        description: "An interactive cultural traditions quiz. Client-side only, no backend, no install. Seven QA bugs found and fixed during testing, plus an achievement badge system.",
        tags: ["HTML", "CSS", "JavaScript", "QA"],
        stats: [["7", "Bugs fixed"], ["0", "Dependencies"]],
        kicker: "Web · QA",
        github: "https://github.com/percivalmahwaya/jrm-traditions-challenge",
        live: false
    },
    {
        id: "design-patterns",
        name: "Python Design Patterns",
        description: "Implementations of the classic Gang-of-Four design patterns in Python — Factory, Singleton, Observer, Strategy and more — each with a real-world analogy and unit tests.",
        tags: ["Python", "OOP", "Unit Testing"],
        stats: [["10+", "Patterns"], ["100%", "Tested"]],
        kicker: "Python · Fundamentals",
        github: "https://github.com/percivalmahwaya/design-patterns-python-projects",
        live: false
    }
];

function createProjectCards() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    projects.forEach(project => {
        const tags = project.tags
            .map(t => `<span class="tag">${t}</span>`).join('');

        const stats = (project.stats || [])
            .map(([fig, cap]) => `<span class="card__stat"><b>${fig}</b><span>${cap}</span></span>`)
            .join('');

        // A project may have no public repo (private) and/or no live URL.
        // Neither may ever render as a dead or undefined link.
        const demoBtn = project.demo
            ? `<a class="btn btn--solid" href="${project.demo}" target="_blank" rel="noopener">${project.demoLabel || 'Open'}</a>`
            : '';
        const codeBtn = project.github
            ? `<a class="btn" href="${project.github}" target="_blank" rel="noopener">Code</a>`
            : `<span class="note">${project.repoNote || 'Private repo'}</span>`;

        const liveFlag = project.live ? '<span class="dot">Live</span>' : '<span></span>';

        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <div class="card__top">
                <span>${project.kicker || ''}</span>
                ${liveFlag}
            </div>
            <h2 class="card__title">${project.name}</h2>
            <p class="card__desc">${project.description}</p>
            <div class="tags">${tags}</div>
            <div class="card__stats">${stats}</div>
            <div class="actions">${demoBtn}${codeBtn}</div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', createProjectCards);
