# The Sherpa Seminar Coaching System

Coaching-based seminar follow-up module for financial advisors. This app helps advisors manage hot, warm, and cold seminar leads with a structured follow-up sequence designed to move from verbal agreement to signed commitment without pressure tactics.

## Rights And Licensing

Copyright (c) 2026 Sherpa Systems, LLC and Lawain McNeil. All rights reserved.

This repository and the materials within it are proprietary. No copying,
redistribution, derivative use, commercial use, or other exploitation is
permitted except under a separate written license from Sherpa Systems, LLC.

The coaching logic, workflow logic, templates, prompts, process structure,
decision trees, and implementation approach contained in this repository are
proprietary and confidential to Sherpa Systems, LLC and Lawain McNeil.

See [LICENSE](./LICENSE) for the governing proprietary terms.

## Important Disclosures

- This system is provided for internal business, coaching, workflow, and
  educational use only.
- It is not legal, tax, accounting, compliance, securities, insurance,
  underwriting, fiduciary, or investment advice.
- Users are responsible for ensuring that any communications, workflows, and
  client-facing use comply with all applicable laws, regulations, licenses,
  supervision requirements, and firm policies.
- No promise is made that the workflows, templates, or logic here are complete,
  error-free, or suitable for any specific compliance regime.

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
