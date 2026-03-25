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
- [x] Student AI Tutor page with deterministic chat prompts
- [x] Student revision queue page and dashboard surfacing
- [x] Student AI study-plan generator and dashboard surfacing
- [x] Study-plan page now shows planning inputs and block-by-block translation panels
- [x] AI quiz generation and assessment placeholder flow
- [x] AI quiz and study-plan signals surfaced in progress, assessments, and dashboard scheduling
- [x] Study-plan page upgraded with calendar-style schedule snapshot
- [x] Assessment review cards expanded with richer concept breakdown and AI support actions
- [x] Assessment page now includes a review desk and post-assessment coaching rail
- [x] Learning-path and practice flows connected more directly into AI support
- [x] Student dashboard upgraded with denser agenda/checkpoint and AI review blocks
- [x] Student dashboard now includes stronger coaching timeline and planning signal panels
- [x] Post-assessment coaching tied into AI Tutor and study-plan follow-up
- [x] AI Tutor upgraded with guided workflow actions and coaching outputs
- [x] Teacher review queue now supports direct intervention actions
- [x] Progress page now includes coaching history and recent coaching signals
- [x] Teacher-parent follow-up actions now sync across alerts, review, and messaging
- [x] AI Tutor now surfaces stronger artifact/coaching output panels
- [x] Student progress now includes a coaching timeline and priority focus rail

### Teacher Product

- [x] Teacher dashboard moved off fetch-driven mock APIs
- [x] Teacher assignments backed by shared mock source
- [x] Student detail workspace aligned with shared demo data
- [x] Teacher class/section management
- [x] Teacher intervention actions and nudges
- [x] Expanded teacher navigation: classes, assignments, review, analytics, AI tools
- [x] Teacher dashboard densified with watchlist, templates, heatmap, submissions, deadlines, and contact requests
- [x] Teacher AI tools placeholder page and generated artifacts
- [x] Teacher AI tools now expose clearer artifact workflow and signal panels
- [x] Teacher student-detail workspace upgraded into a denser intervention console
- [x] Teacher analytics page upgraded into a fuller operational analytics view
- [x] Teacher assignments page upgraded into a workflow board with AI support context

### Parent Product

- [x] Parent dashboard aligned with shared demo data
- [x] Parent alerts backed by shared mock source
- [x] Parent child switching
- [x] Printable/shareable report flow
- [x] Expanded parent navigation: children, reports, alerts, support tips
- [x] Parent dashboard densified with digest, changes, upcoming work, messages preview, and AI helper
- [x] Parent support tips and AI at-home guidance placeholder

### Notifications and Messaging

- [x] Role-aware notifications from shared mock data
- [x] Mark-as-read / archive interactions
- [x] Messaging threads
- [x] Messaging surfaces upgraded with role-aware follow-up context and cross-links
- [x] Parent alert flow can create teacher follow-up requests in shared demo state
- [x] Teacher review workflow now exposes parent follow-up requests and direct cross-links
- [x] Parent follow-up requests now seed/update parent message threads
- [x] Teacher nudges now flow into linked teacher-parent or teacher-student threads

### UX and Cleanup

- [x] Product identity and route consistency cleanup
- [x] Landing page rewritten for learning-product positioning
- [x] Remove or consolidate remaining legacy layout/components
- [x] Standardized loading/empty/error states across all major widgets
- [x] Accessibility hardening for menus, tables, overlays, and forms
- [x] Sidebar expanded with deeper role-specific navigation and route metadata

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
- [~] Demo-only AI tutor, hints, quiz generation, study plans, and teacher content tools
- [ ] AI tutor, hints, and explanation system on real model-backed data
- [ ] AI study plan generation on real evidence
- [ ] AI content assistance for teachers/admins with approval workflow

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
