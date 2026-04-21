# Seminar Follow-Up System

Coaching-based seminar follow-up module for financial advisors. This app helps advisors manage hot, warm, and cold seminar leads with a structured follow-up sequence designed to move from verbal agreement to signed commitment without pressure tactics.

## What It Includes

- Lead temperature routing for `hot`, `warm`, and `cold` seminar leads
- A six-phase coaching sequence from `re-anchor` through `nurture`
- Advisor prompts tied to likely friction signals
- Copy-ready email, text, and call templates
- CRM workflow board and KPI guidance
- Static site structure ready for Cloudflare Pages

## Files

- `index.html`
- `data.js`
- `app.js`
- `wrangler.toml`

## Local Use

Open `index.html` in a browser.

## Cloudflare

This repo is structured as a static site. For Cloudflare Pages:

1. Connect the GitHub repo to Cloudflare Pages.
2. Use the repo root as the project root.
3. Use no build command.
4. Set the output directory to `.`.

## Source Basis

The app structure is based on the seminar follow-up SOP / PRD covering:

- Re-anchor
- Surface friction
- Reframe risk
- Reduce commitment friction
- Decision clarity
- Nurture
