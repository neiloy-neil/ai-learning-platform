
# AI Learning Platform - Future Roadmap

This document outlines the future roadmap for the AI Learning Platform, based on the `PRODUCT_FEATURES_AND_ROADMAP.md` document.

---

## Phase 1: Platform Foundations

### Real authentication and access control
- Replace demo auth with real login and registration.
- Add secure sessions or token-based auth.
- Support password hashing, logout, forgot password, and reset flows.
- Enforce role-based access control on the server.

### Persistent database
- Replace in-memory/mock state with a real database.
- Add schemas for users, students, parents, teachers, classes, concepts, assessments, attempts, mastery, goals, alerts, and reports.
- Add migrations and seed scripts.

### Hardened APIs
- Validate input on every route.
- Standardize API responses.
- Add permission checks, error handling, pagination, and audit logging.

---

## Phase 2: Student Learning Core

### Real practice workflow
- Persist all answers and confidence ratings.
- Recalculate mastery after each session from real evidence.
- Support topic practice, recommended practice, revision practice, and assessment review from backend data.

### Full assessments system
- Add start, resume, submit, review, and history flows.
- Support due windows, sections, statuses, and formal result pages.

### Learning path progression
- Unlock topics based on prerequisites and mastery thresholds.
- Track persistent concept and module completion.

### Goals and habit systems
- Add full goal CRUD.
- Add weekly targets, streak logic, and stronger accountability features.

### Progress analytics v2
- Add trends over time.
- Add concept drill-down, improvement/decline signals, and explanations for mastery changes.

---

## Phase 3: Adaptive and AI Layer

### Better mastery and recommendation engine
- Incorporate recency, consistency, confidence, difficulty, and dependency weighting.
- Improve recommendation quality and explanation.

### Spaced revision engine
- Build a true revision queue with due dates and evidence freshness.
- Separate weak-topic remediation from spaced repetition.

### AI tutor and explanation system
- Add live AI-generated explanations.
- Add guided hints and personalized study coaching.
- Add safer prompt logging and reviewability.

### AI study planning
- Generate dynamic daily and weekly study plans from mastery, goals, deadlines, and recent performance.

### AI content assistance
- Help teachers/admins generate draft questions, interventions, explanations, and practice sets.

---

## Phase 4: Teacher Product Expansion

### Class management
- Create and manage classes and sections at scale.
- Enroll students and organize cohorts.

### Analytics dashboard v2
- Add trend charts, concept heatmaps, item analysis, and risk segmentation.

### Assignment and intervention workflows
- Assign work to classes, groups, or individuals.
- Track completion, lateness, and outcomes.
- Recommend and trigger interventions directly.

### Teacher student workspace
- Expand the student detail view into a full intervention workspace with notes, trends, alerts, and follow-up actions.

---

## Phase 5: Parent Product Expansion

### Parent-child linking
- Add real account linking for one or more children.
- Secure visibility to only linked students.

### Parent dashboard v2
- Add clearer trend summaries, upcoming tasks, and missed work visibility.

### Alerts and communication
- Add alert acknowledgement, preference management, and stronger parent-teacher communication workflows.

### Reports and digests
- Add weekly digest generation and export-ready reports.

---

## Phase 6: Admin and Content Management

### Admin role
- Add admin dashboards for users, classes, content, and system health.

### Curriculum management
- Add CRUD for subjects, levels, concepts, and prerequisite maps.

### Question bank and assessment authoring
- Add question authoring, concept mapping, review flows, and publish flows.

---

## Phase 7: Notifications, Messaging, and Engagement

### Notifications v2
- Add filtering, archive management, unread counts, event-driven creation, and preferences.

### Messaging system expansion
- Add richer conversation threading and stronger role-aware communication rules.

---

## Phase 8: UX, Accessibility, and Design Hardening

### Product identity and route cleanup
- Replace the current demo-oriented entry with a fuller product/marketing flow.
- Remove duplicate or legacy paths.

### Accessibility improvements
- Improve keyboard support, focus management, overlays, forms, tables, and mobile behavior.

### Complete UI state coverage
- Add polished loading, empty, error, and success states across all major views.

---

## Phase 9: Quality, Security, and Operations

### Testing expansion
- Add deeper unit, integration, and end-to-end coverage.

### Observability
- Add structured logging, monitoring, and analytics/event tracking.

### Security baseline
- Add rate limiting, sanitized inputs, stronger session security, audit trails, and privacy/compliance review.
