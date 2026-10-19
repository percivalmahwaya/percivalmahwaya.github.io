/* certification.js — credential data + card rendering.
   Issuer logos were previously hotlinked from upload.wikimedia.org. Dropped:
   invariant 1 allows no remote asset origin but Google Fonts, and five external
   image requests bought nothing the issuer's name in type does not. */

const certifications = [
    {
        title: "IBM Data Science Professional Certificate",
        issuer: "IBM / Coursera",
        period: "2024",
        link: "https://www.credly.com/badges/d13ea8c0-b996-44ea-91b1-f96e9211bd11/linked_in_profile",
        link2: "https://www.coursera.org/account/accomplishments/specialization/XTCXB5L1NH1L",
        link2label: "Coursera"
    },
    {
        title: "AWS Certified Solutions Architect: Associate",
        issuer: "Amazon Web Services",
        period: "2025 – 2028",
        link: "https://www.credly.com/badges/30ffa6bf-264e-4a64-b65c-333e2964a075/linked_in_profile"
    },
    {
        title: "CompTIA Data+ CE",
        issuer: "CompTIA",
        period: "2025 – 2028",
        link: "https://www.credly.com/badges/665d0df8-5bba-433e-b169-fe70bf4382eb/linked_in_profile"
    },
    {
        title: "Microsoft Azure Data Fundamentals (DP-900)",
        issuer: "Microsoft",
        period: "No expiry",
        link: "https://learn.microsoft.com/api/credentials/share/en-gb/PercivalMahwaya-0859/E2655D6E765A9C5?sharingId"
    },
    {
        title: "Microsoft Azure Fundamentals (AZ-900)",
        issuer: "Microsoft",
        period: "No expiry",
        link: "https://learn.microsoft.com/api/credentials/share/en-gb/PercivalMahwaya-0859/B71362EE6708CFFB?sharingId"
    }
];

function createCertCards() {
    const container = document.getElementById('certifications-container');
    if (!container) return;

    certifications.forEach(cert => {
        const second = cert.link2
            ? `<a class="btn" href="${cert.link2}" target="_blank" rel="noopener">${cert.link2label || 'Alt'}</a>`
            : '';

        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <div class="card__top">
                <span>${cert.issuer}</span>
                <span>${cert.period}</span>
            </div>
            <h2 class="card__title">${cert.title}</h2>
            <div class="actions" style="margin-top:auto;">
                <a class="btn btn--solid" href="${cert.link}" target="_blank" rel="noopener">Verify</a>
                ${second}
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', createCertCards);
