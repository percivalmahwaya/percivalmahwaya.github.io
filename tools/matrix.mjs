// Browser matrix: every page x engine x theme x width.
// Fails on console errors, page errors, failed requests to our own origin,
// horizontal overflow, or a theme that did not apply.
import { chromium, firefox, webkit } from "playwright";

const BASE = process.env.BASE || "http://localhost:8080";
const PAGES = ["index","about","projects","certifications","contact",
  "case-fpl-decision-engine","case-bulawayo-chess-hub","case-osp-scout"];
const ENGINES = process.env.ENGINES ? process.env.ENGINES.split(",") : ["chromium","firefox","webkit"];
const LAUNCH = { chromium, firefox, webkit };
const WIDTHS = [1440, 390];
const THEMES = ["light", "dark"];
const exe = process.env.CHROMIUM_PATH;

let bad = 0, runs = 0;
for (const name of ENGINES) {
  const browser = await LAUNCH[name].launch(name === "chromium" && exe ? { executablePath: exe } : {});
  for (const scheme of THEMES) for (const w of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, colorScheme: scheme });
    for (const p of PAGES) {
      const page = await ctx.newPage();
      const errs = [];
      // Fonts are the one permitted external origin. Stub them so the matrix tests
      // our code, not the network. Typography itself is verified separately.
      await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ status: 200, contentType: r.request().url().includes("css") ? "text/css" : "font/woff2", body: "" }));
      page.on("console", m => { if (m.type() === "error" && !/fonts\.(googleapis|gstatic)/.test(m.text())) errs.push("console: " + m.text()); });
      page.on("pageerror", e => errs.push("pageerror: " + e.message));
      page.on("requestfailed", r => { if (r.url().startsWith(BASE)) errs.push("failed: " + r.url()); });
      page.on("response", r => { if (r.url().startsWith(BASE) && r.status() >= 400) errs.push(r.status() + ": " + r.url()); });
      await page.goto(`${BASE}/${p}.html`, { waitUntil: "load" });
      const o = await page.evaluate(() => ({
        over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        bg: getComputedStyle(document.body).backgroundColor,
      }));
      const dark = o.bg === "rgb(13, 13, 11)";
      if (o.over > 0) errs.push(`horizontal overflow ${o.over}px`);
      if ((scheme === "dark") !== dark) errs.push(`theme not applied (bg ${o.bg})`);
      runs++;
      if (errs.length) { bad++; console.log(`FAIL ${name} ${scheme} ${w} ${p}\n  ` + errs.join("\n  ")); }
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
}
console.log(`${runs} runs, ${bad} failing`);
process.exit(bad ? 1 : 0);
