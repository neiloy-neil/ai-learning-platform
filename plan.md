# AI Learning Platform Roadmap

This document is the working product and engineering plan for turning the current prototype into a complete AI learning platform. It covers the missing features, the build order, and the expected outcomes for each area.

## Scope Split

The project is now intentionally split into two tracks:
- `Demo track`: completed enough to support a strong client walkthrough using shared mock data and role-based demo login.
- `Production track`: deferred work required to make the platform persistent, secure, operationally sound, and backend-backed.

## Demo Track Status

The current demo build already includes:
- role-card login for student, teacher, and parent;
- canonical role-prefixed routes and cleaned-up navigation;
- shared demo state for student, teacher, and parent flows;
- demo practice, assessments, goals, progress, notifications, messaging, and printable parent summary;
- teacher class management, interventions, and student workspaces;
- parent child switching and parent messaging;
- landing-page, route, empty-state, and accessibility cleanup;
- local test coverage plus CI checks for lint, test, and build.

This means the app is ready to present as a frontend-driven product demo without connecting a real backend yet.

## Product Goal

Build a role-based learning platform that:
- helps students learn through adaptive practice, assessments, revision, and guided study;
- gives teachers actionable class intelligence and intervention tools;
- gives parents clear visibility into progress and risk;
- uses AI to personalize learning, explain mistakes, and recommend next actions;
- runs on a persistent, secure, testable, production-ready backend.

## Current State Summary

The current codebase already includes:
- Next.js App Router frontend and dashboard shell;
- student, teacher, and parent dashboard routes;
- reusable UI primitives;
- demo authentication;
- mock/in-memory API routes;
- rule-based mastery, recommendation, and revision logic;
- demo practice, assessments, notifications, messaging, and progress views;
- demo teacher and parent workflows;
- test and CI coverage for the demo branch.

The main gaps are:
- no real auth or authorization;
- no persistent database;
- no end-to-end learning evidence loop;
- no persistent teacher action workflows;
- no persistent parent action workflows;
- no true AI-powered tutoring or content generation;
- no admin/content management layer;
- no production-grade observability, security, or deployment hardening.

## Production Track

Everything below this section should be treated as the post-demo production roadmap.

## Phase 1: Platform Foundations

### 1. Real authentication and session management
Deliverables:
- Replace mock login/register with real auth.
- Hash and validate passwords.
- Add secure server-side sessions or JWT with refresh strategy.
- Add role-based access control for student, teacher, parent, and admin.
- Protect API routes on the server, not only the client.
- Add logout, session expiry, forgot password, and reset password.

Implementation notes:
- Introduce a real user table and auth schema.
- Remove role inference from URL/path.
- Redirect users based on role after login.
- Make navbar/sidebar/session state depend on server-validated identity.

### 2. Persistent database and data model migration
Deliverables:
- Replace in-memory data arrays with a real database.
- Add schema for users, students, parents, teachers, classes, enrollments, concepts, concept dependencies, questions, attempts, mastery, assessments, assignments, notifications, goals, alerts, and reports.
- Add seed data for local development.
- Add repository/service layer boundaries so UI does not depend on raw storage.

Implementation notes:
- Start with the current `pcdc-types` domain model and normalize it.
- Separate demo fixtures from production data access.
- Add migrations and seed scripts.

### 3. API and service hardening
Deliverables:
- Standardize API response shapes.
- Add input validation for every route.
- Add error handling, auth guards, and permission checks.
- Add pagination/filtering where needed.
- Add audit logging for important actions.

Implementation notes:
- Keep route files thin.
- Move business logic into feature services and domain modules.
- Add request validation and typed contracts.

## Phase 2: Student Learning Core

### 4. End-to-end practice workflow
Deliverables:
- Connect question answering to backend attempt submission.
- Persist each answer with correctness, timestamp, and confidence.
- Recalculate mastery after each practice session.
- Refresh dashboard recommendation and progress after submission.
- Add practice modes: topic practice, recommended practice, assessment review, and revision practice.

Implementation notes:
- Stop scoring only in local component state.
- Reuse one submission contract for both practice and assessments.
- Add session summaries and per-concept results.

### 5. Assessments system
Deliverables:
- Create real assessment entities with sections, due dates, availability windows, and question sets.
- Allow assessment start, resume, submit, review, and teacher grading where applicable.
- Track attempt history and completion status.
- Add assessment results page with concept breakdown.

Implementation notes:
- Separate formative practice from formal assessments.
- Add timer support only if required by product rules.
- Support completed, in-progress, assigned, overdue, and reviewed states.

### 6. Learning path and concept progression
Deliverables:
- Build a real concept/module progression model.
- Unlock concepts based on prerequisites and mastery thresholds.
- Show current stage, blocked concepts, next milestone, and completed modules.
- Allow students to enter practice or assessment directly from the path.

Implementation notes:
- Use concept dependency data already present in the domain model.
- Add route-safe actions from the dashboard and progress views.
- Track completion state persistently.

### 7. Goals, habits, and accountability
Deliverables:
- Persist user goals.
- Add create, edit, delete, archive, and completion flows.
- Add weekly targets for time spent, topics completed, or assessments finished.
- Show streaks and habit tracking.
- Allow teacher-assigned goals later in the roadmap.

Implementation notes:
- Separate personal goals from assigned goals.
- Add simple defaults first, then scheduling and reminders.

### 8. Progress and history analytics
Deliverables:
- Add mastery trends over time.
- Add learning time, streaks, assessment outcomes, and revision history.
- Add concept-level drill-down and recent improvement/decline indicators.
- Show why the mastery score changed.

Implementation notes:
- Keep current mastery bars, but add historical views and explanatory metrics.
- Build reusable analytics cards and charts.

## Phase 3: Adaptive and AI Learning Layer

### 9. Upgrade mastery and recommendation engines
Deliverables:
- Move from simple score calculation to a more complete evidence model.
- Include recency, consistency, difficulty, confidence, and concept dependency weight.
- Improve recommendation quality for weak concepts, prerequisite gaps, and next-best-topic sequencing.
- Expose recommendation explanation to the UI.

Implementation notes:
- Version the scoring logic.
- Keep recommendation output stable for UI consumption.
- Add tests for edge cases and concept graph behavior.

### 10. Spaced revision engine
Deliverables:
- Build a true revision queue per student.
- Track due dates by concept and evidence freshness.
- Distinguish between weak-topic remediation and spaced review.
- Surface revision tasks on dashboard and learning path.

Implementation notes:
- Replace the placeholder concept-attempt mapping in the current revision scheduler.
- Add completed revision history.

### 11. AI tutor and explanation system
Deliverables:
- Add AI-generated explanations for incorrect answers.
- Add step-by-step guided hints.
- Add concept summaries and personalized study tips.
- Add an AI study coach for next-session planning.

Implementation notes:
- Keep teacher-reviewed or controlled prompt structure where needed.
- Log prompts/responses for safety and debugging.
- Start with assistive explanation features before open-ended chat.

### 12. AI study plan generation
Deliverables:
- Generate daily or weekly study plans based on mastery, goals, deadlines, and recent performance.
- Include time estimates, topic sequence, and revision slots.
- Regenerate plans when new evidence arrives.

Implementation notes:
- Plans should be actionable, not generic.
- Add explainability: why this plan was suggested.

### 13. AI content assistance
Deliverables:
- Generate draft practice questions, explanations, and remediation sets for teachers/admins.
- Suggest targeted assignments for weak concepts.
- Support content review before publishing.

Implementation notes:
- Keep human approval in the loop.
- Store generated artifacts separately from published content.

## Phase 4: Teacher Product

### 14. Teacher class management
Deliverables:
- Create classes and sections.
- Enroll students.
- Group students by class, risk level, or custom cohorts.
- View roster details and quick actions.

Implementation notes:
- Connect teachers to classes through a real enrollment model.
- Support filtering and sorting at class scale.

### 15. Teacher analytics dashboard v2
Deliverables:
- Add class trend charts.
- Add concept heatmaps.
- Add assessment item analysis.
- Add mastery distribution and at-risk segmentation.
- Add drill-down from class to student to concept to question.

Implementation notes:
- Keep overview cards for high-level scanning.
- Add a dedicated analytics section rather than overloading one page.

### 16. Assignment and intervention workflows
Deliverables:
- Create assignments by concept, topic, or assessment.
- Assign to class, group, or individual students.
- Track completion, submission, late status, and scores.
- Recommend interventions for struggling students.
- Let teachers send targeted nudges.

Implementation notes:
- Link assignment creation to weak-concept analysis.
- Add saved assignment templates later.

### 17. Student detail workspace for teachers
Deliverables:
- Turn the current student detail page into an intervention workspace.
- Show mastery trends, recent activity, recent attempts, missed work, goals, and alerts.
- Add teacher notes and follow-up actions.
- Allow assigning remediation directly from the page.

Implementation notes:
- Reuse student analytics components with teacher-specific actions.
- Add chronological event history.

## Phase 5: Parent Product

### 18. Parent-child linking and account management
Deliverables:
- Link parent accounts to one or more students.
- Let parents switch between children if applicable.
- Add invite/link flow from school or teacher context.

Implementation notes:
- Enforce proper permissions.
- Keep child data visibility scoped to linked accounts only.

### 19. Parent dashboard v2
Deliverables:
- Show progress summary, recent activity, current goals, and alert status.
- Add trend summaries in plain language.
- Add upcoming assessments and missed work.
- Add recommended at-home support actions.

Implementation notes:
- Use non-technical wording.
- Prioritize clarity over dense analytics.

### 20. Parent alerts and communication
Deliverables:
- Add alerts for low activity, missed assessments, falling mastery, and overdue assignments.
- Add parent acknowledgement and read state.
- Add parent-teacher messaging or contact requests.
- Add alert preferences.

Implementation notes:
- Keep alert types actionable.
- Avoid notification spam with basic throttling rules.

### 21. Shareable and printable reports
Deliverables:
- Add printable progress summaries.
- Add weekly digest reports.
- Add export-ready report layouts for parent sharing.

Implementation notes:
- Make print layouts stable and readable.
- Reuse report data models from the analytics layer.

## Phase 6: Admin and Content Management

### 22. Admin role and control panel
Deliverables:
- Add an admin role.
- Add admin dashboard for users, classes, content, and system health.
- Add basic moderation and audit views.

Implementation notes:
- Restrict admin tools strictly by role.
- Keep admin routes isolated from standard dashboards.

### 23. Curriculum and concept management
Deliverables:
- Add CRUD for subjects, levels, concepts, and prerequisite maps.
- Add validation to prevent invalid dependency graphs.
- Add concept metadata for reporting and recommendations.

Implementation notes:
- Build graph-safe editing flows.
- Add import/export later if needed.

### 24. Question bank and assessment authoring
Deliverables:
- Add question CRUD with concept mapping, difficulty, options, and explanations.
- Add assessment builder with reusable question bank support.
- Add review/publish flow.

Implementation notes:
- Keep draft and published states separate.
- Add AI draft generation as an assistive tool, not the only authoring path.

## Phase 7: Notifications, Messaging, and Engagement

### 25. Notifications system v2
Deliverables:
- Add mark-as-read, archive, filtering, and deep links.
- Add event-driven notification creation.
- Add unread counts per user.
- Add preference management.

Implementation notes:
- Separate alerts from general notifications.
- Keep dropdown and dedicated notifications page aligned.

### 26. Messaging and collaboration
Deliverables:
- Add teacher-student and teacher-parent message channels where permitted.
- Add basic conversation threading and timestamps.
- Add role-aware communication rules.

Implementation notes:
- Start with simple internal messaging before external delivery integrations.

## Phase 8: UX, Accessibility, and Design Cleanup

### 27. Product identity and route consistency
Deliverables:
- Replace the current design-system-style landing experience with a learning-platform home/marketing flow.
- Align route structure and redirects by role.
- Remove duplicate/legacy layout paths and dead components.

Implementation notes:
- Keep one active shell and one active navigation model.
- Normalize route metadata and titles.

### 28. Accessibility and interaction hardening
Deliverables:
- Audit keyboard support, focus states, dropdowns, overlays, tables, and forms.
- Add proper labels, ARIA usage, and focus return.
- Improve mobile behavior for sidebar, menus, and tables.

Implementation notes:
- Treat accessibility as a release requirement, not polish.

### 29. UI state coverage
Deliverables:
- Add loading, empty, error, and success states for every major widget and page.
- Standardize skeletons and placeholders.
- Eliminate blank or misleading states.

Implementation notes:
- Build reusable state components where possible.

## Phase 9: Quality, Testing, and Production Readiness

### 30. Testing strategy
Deliverables:
- Add unit tests for domain logic.
- Add component tests for critical UI primitives and auth flows.
- Add integration tests for API routes.
- Add end-to-end tests for core student, teacher, and parent workflows.

Implementation notes:
- Start with mastery, recommendation, revision, auth, and practice submission.
- Add CI gating for lint, typecheck, tests, and build.

### 31. Observability and operations
Deliverables:
- Add structured logging.
- Add error monitoring.
- Add analytics/event tracking for user behavior and product metrics.
- Add admin-facing operational visibility where useful.

Implementation notes:
- Capture enough data to debug learning and recommendation issues.

### 32. Security and compliance baseline
Deliverables:
- Add secure auth/session handling.
- Validate and sanitize inputs.
- Add rate limiting for sensitive endpoints.
- Add audit trails for privileged actions.
- Review education/privacy requirements relevant to the target market.

Implementation notes:
- Build these alongside auth and API hardening, not after launch.

## Recommended Build Order

### Stage A: Make the prototype real
1. Real auth and RBAC.
2. Persistent database and migrations.
3. Harden API/service layer.
4. Connect practice and assessment submissions to persisted evidence.
5. Recalculate mastery and recommendations from real attempts.

### Stage B: Complete the student learning loop
1. Learning path progression.
2. Real assessments.
3. Goals and revision queue.
4. Trend-based progress analytics.

### Stage C: Complete teacher and parent workflows
1. Teacher class management.
2. Assignments and interventions.
3. Teacher student-detail workspace.
4. Parent linking, alerts, and digest/reporting.

### Stage D: Add AI product depth
1. AI explanations and hints.
2. AI study plans.
3. AI-assisted content authoring.

### Stage E: Production hardening
1. Notifications v2 and messaging.
2. Accessibility and UX cleanup.
3. Testing, observability, and security pass.
4. Admin/content tools.

## Success Criteria

The platform should be considered feature-complete for the next milestone when:
- all three roles use real authenticated accounts;
- learning evidence persists and updates mastery reliably;
- recommendations and revision suggestions reflect real student behavior;
- teachers can assign and track interventions;
- parents can monitor and respond to progress signals;
- AI features add measurable value beyond static rules;
- the app is tested, secure, and deployable.
