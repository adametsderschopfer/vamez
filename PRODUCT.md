# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

Personal portfolio of Vladislav Adamets / Vamez. The user describes the identity as
an author and engineer and the central idea as «Воплощение инженерной мысли».

## Capabilities and Constraints

- Nuxt 4 and Vue 3, with Russian and English content.
- Preserve language switching, light and dark themes, section navigation and contact links.
- Email can be copied, with success or failure feedback.
- IT Track project content is available in development; the public site shows a coming-soon notice.
- Keep page sections in separate components, scoped BEM-lite styles and shared CSS variables.
- Do not run builds or write tests without the user's command. Run the installed linters,
  formatter checks and typechecker after changes.

## Brand Commitments

The user requests a brutal, beautiful, simple and pragmatic style. Authorial character
and engineering clarity should coexist.

## Evidence on Hand

Current biography and capabilities are in `i18n/locales/ru.json` and `en.json`.
Project articles are in `content/projects`. Existing contact destinations are in
`app/components/home/HomeContactCard.vue`. Do not invent achievements, client claims
or portfolio results.

## Open Decisions

The exact visitor audience is not specified. The existing portfolio supports learning
about the author, exploring work when available, and choosing a contact channel.
