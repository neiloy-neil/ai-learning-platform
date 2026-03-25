# Execution Checklist

This checklist now separates what is complete for the client demo from what is intentionally deferred for the production build.

Status legend:
- `[x]` completed for demo
- `[~]` partially complete / demo-ready but not production-ready
- `[ ]` deferred for post-demo production work

## Demo Scope Completed

### Foundation

- [x] Demo role-card login
- [x] Canonical role-prefixed routing
- [x] Shared demo auth/session state
- [x] Sidebar/profile wired to auth state
- [x] Generic legacy routes redirect to canonical role routes

### Student Core

- [x] Shared demo student state model
- [x] Practice modes: topic, recommended, assessment review, revision
- [x] Practice submission updates mastery/recommendation/progress
- [x] Assessment entities and results summary
- [x] Learning path progression from prerequisites and mastery thresholds
- [x] Goals backed by shared demo state
- [x] Progress trends and rationale copy

### Teacher Product

- [x] Teacher dashboard moved off fetch-driven mock APIs
- [x] Teacher assignments backed by shared mock source
- [x] Student detail workspace aligned with shared demo data
- [x] Teacher class/section management
- [x] Teacher intervention actions and nudges

### Parent Product

- [x] Parent dashboard aligned with shared demo data
- [x] Parent alerts backed by shared mock source
- [x] Parent child switching
- [x] Printable/shareable report flow

### Notifications and Messaging

- [x] Role-aware notifications from shared mock data
- [x] Mark-as-read / archive interactions
- [x] Messaging threads

### UX and Cleanup

- [x] Product identity and route consistency cleanup
- [x] Landing page rewritten for learning-product positioning
- [x] Remove or consolidate remaining legacy layout/components
- [x] Standardized loading/empty/error states across all major widgets
- [x] Accessibility hardening for menus, tables, overlays, and forms

### Quality

- [x] Unit tests for demo mastery/recommendation/revision logic
- [x] Component/smoke tests for auth and role dashboards
- [x] CI-quality verification beyond local lint/build

## Deferred for Production Phase

### Backend and Persistence

- [ ] Real authentication and secure session management
- [ ] Persistent database, migrations, and seed strategy
- [ ] Hardened API/service layer with validation and permissions

### Student Learning Loop

- [ ] Persisted attempt evidence and server-backed mastery recalculation
- [ ] Real assessment lifecycle with resume/history/grading rules
- [ ] Persisted learning-path completion and unlock state
- [ ] Server-backed goals, habits, and accountability flows
- [ ] Rich historical analytics beyond demo-state projections

### Adaptive and AI Layer

- [ ] Evidence-model mastery engine v2 on real data
- [ ] Spaced revision queue with durable due-state tracking
- [ ] AI tutor, hints, and explanation system
- [ ] AI study plan generation
- [ ] AI content assistance for teachers/admins

### Teacher, Parent, and Admin Expansion

- [ ] Real class enrollment model and teacher roster management
- [ ] Persisted assignment/intervention workflow with late/completion states
- [ ] Parent account linking/invite flows with permissions
- [ ] Admin role, control panel, and content management
- [ ] Question bank and assessment authoring tools

### Production Hardening

- [ ] Notification preferences and event-driven delivery architecture
- [ ] Observability, analytics, and operational visibility
- [ ] Security, privacy, and compliance baseline
- [ ] Broader integration/E2E coverage where production risk requires it

## Current Recommendation

1. Use the current build as the client demo branch.
2. Keep post-demo production work isolated from the demo UX unless it directly improves the presentation.
3. Start the production phase with auth, persistence, and the evidence loop before adding deeper AI or admin tooling.
