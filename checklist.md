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
- [ ] Teacher class/section management
- [ ] Teacher intervention actions and nudges

## Parent Product

- [x] Parent dashboard aligned with shared demo data
- [x] Parent alerts backed by shared mock source
- [ ] Parent child switching
- [ ] Printable/shareable report flow

## Notifications and Messaging

- [x] Role-aware notifications from shared mock data
- [ ] Mark-as-read / archive interactions
- [ ] Messaging threads

## UX and Cleanup

- [~] Product identity and route consistency cleanup
- [ ] Landing page rewritten for learning-product positioning
- [ ] Remove or consolidate remaining legacy layout/components
- [ ] Standardized loading/empty/error states across all major widgets
- [ ] Accessibility hardening for menus, tables, overlays, and forms

## Quality

- [ ] Unit tests for demo mastery/recommendation/revision logic
- [ ] Component/smoke tests for auth and role dashboards
- [ ] CI-quality verification beyond local lint/build

## Next Up

1. Rewrite the public landing/home flow so it matches the learning platform demo instead of the design-system showcase.
2. Finish route/UI consistency cleanup around headers, empty states, and remaining legacy shell pieces.
3. Add interaction completion for notifications and parent printable/report surfaces.
