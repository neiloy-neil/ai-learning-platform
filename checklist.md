# Execution Checklist

This checklist tracks implementation progress against `plan.md`, adapted to the current demo-first scope.

Status legend:
- `[x]` completed
- `[~]` in progress
- `[ ]` not started

## Foundation

- [x] Demo role-card login
- [x] Canonical role-prefixed routing
- [x] Shared demo auth/session state
- [x] Sidebar/profile wired to auth state
- [x] Generic legacy routes redirect to canonical role routes

## Student Core

- [x] Shared demo student state model
- [x] Practice modes: topic, recommended, assessment review, revision
- [x] Practice submission updates mastery/recommendation/progress
- [x] Assessment entities and results summary
- [x] Learning path progression from prerequisites and mastery thresholds
- [x] Goals backed by shared demo state
- [x] Progress trends and rationale copy

## Teacher Product

- [x] Teacher dashboard moved off fetch-driven mock APIs
- [x] Teacher assignments backed by shared mock source
- [x] Student detail workspace aligned with shared demo data
- [x] Teacher class/section management
- [x] Teacher intervention actions and nudges

## Parent Product

- [x] Parent dashboard aligned with shared demo data
- [x] Parent alerts backed by shared mock source
- [x] Parent child switching
- [x] Printable/shareable report flow

## Notifications and Messaging

- [x] Role-aware notifications from shared mock data
- [x] Mark-as-read / archive interactions
- [x] Messaging threads

## UX and Cleanup

- [~] Product identity and route consistency cleanup
- [x] Landing page rewritten for learning-product positioning
- [x] Remove or consolidate remaining legacy layout/components
- [x] Standardized loading/empty/error states across all major widgets
- [x] Accessibility hardening for menus, tables, overlays, and forms

## Quality

- [x] Unit tests for demo mastery/recommendation/revision logic
- [x] Component/smoke tests for auth and role dashboards
- [ ] CI-quality verification beyond local lint/build

## Next Up

1. Revisit product identity and route cleanup only if any legacy path still leaks into the demo flow.
2. Decide whether to add CI-quality verification for lint, test, and build or keep that deferred for the demo phase.
3. Continue expanding role-specific demo depth only where it materially improves the client walkthrough.
