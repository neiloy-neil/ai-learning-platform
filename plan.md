# Project Plan

This document tracks the next buildable features for the current codebase and the intended workflow for each task group. The goal is to keep implementation ordered, typed, and easy to swap from mock data to real services later.

## Working Principles

- Start with typed mock data before wiring real APIs.
- Keep route files thin and push logic into `features/*` and `lib/*`.
- Prefer reusable UI primitives over page-local markup.
- Use one shared dashboard shell and remove duplicate layout paths over time.
- Treat every task as a vertical slice: data shape, UI state, integration, then verification.

## Phase 1: Highest ROI

### 1. Centralize all mock data into typed modules
Workflow:
- Audit every component still using inline arrays, placeholder objects, or fake fetches.
- Create shared typed mock modules in `lib/mocks` or feature `model` folders.
- Replace hardcoded values inside components with imported typed data.
- Keep mock shapes compatible with future API responses.
- Verify all affected routes with lint and build.

### 2. Refactor student, teacher, parent, practice, and assessment pages to consume shared mock data
Workflow:
- Identify each page's current local state and fake data source.
- Convert fake fetch flows to deterministic mock selectors/helpers where backend APIs do not exist yet.
- Keep props small and predictable so these views can later switch to services.
- Re-run lint/build after each page family is updated.

### 3. Build a real notifications panel in the top navbar
Workflow:
- Add typed notification models.
- Create a reusable dropdown or panel primitive if needed.
- Support unread count, empty state, and action links.
- Make the panel keyboard-accessible and mobile-safe.
- Verify sticky header interaction and z-index behavior.

### 4. Expand the profile dropdown with account/settings/logout actions
Workflow:
- Define clear navigation destinations and temporary mock profile data.
- Add menu actions with typed configuration.
- Prepare hooks for future auth/session wiring.
- Add accessible menu semantics and close behavior.

### 5. Create a dashboard overview page with KPI cards, progress bars, recent activity, and recommendations
Workflow:
- Define the dashboard summary data model first.
- Compose from existing primitives (`Card`, `ProgressBar`, `Button`).
- Reuse mock data from the shared source of truth.
- Ensure mobile-first layout and empty/loading states.

### 6. Add loading, empty, and error UI states for every dashboard section
Workflow:
- Enumerate each widget and current state coverage.
- Add skeletons, empty-state copy, and error placeholders consistently.
- Keep state visuals aligned with the design system.
- Verify no page shows raw blank sections.

### 7. Unify the older duplicate layout/components with the new shell and remove dead paths
Workflow:
- Compare current live shell files against older layout/navigation files.
- Migrate any remaining useful logic into the active shell.
- Delete or deprecate unused components once routes are stable.
- Verify no imports point at legacy layout modules.

## Student Experience

### 1. Build a mastery overview widget using the current `ProgressBar`
Workflow:
- Use a typed mastery model.
- Map concepts to percentages and labels.
- Add summary insights like strongest and weakest concepts.
- Support empty and partial data.

### 2. Create a learning path page with module cards, completion states, and next-step actions
Workflow:
- Define a module progression model.
- Render ordered cards with status badges and CTA buttons.
- Support locked, in-progress, and completed states.
- Reuse route-safe links to practice or assessment pages.

### 3. Add a practice page with question cards, answer selection, and result feedback
Workflow:
- Use typed question/answer models.
- Keep question state local and deterministic for mock mode.
- Add result feedback and explanation states.
- Prepare submission shape for future API posting.

### 4. Add an assessments page with status cards, due dates, and completion progress
Workflow:
- Add an assessment list model with metadata.
- Render cards with status, question count, and CTA.
- Support upcoming, in-progress, and completed states.
- Keep links compatible with practice/assessment flows.

### 5. Create a recent activity timeline
Workflow:
- Define an activity event model.
- Render event rows with timestamps and categories.
- Add empty state and truncation rules.
- Reuse this data in both student and parent experiences if useful.

### 6. Add a recommended actions panel based on weak topics
Workflow:
- Define recommendation criteria in mock mode.
- Create a stable recommendation model and CTA destination.
- Surface reason, target concept, and next action.
- Keep copy concise and actionable.

### 7. Add a daily goals widget
Workflow:
- Define goal status and progress models.
- Render simple progress states and completion markers.
- Add defaults that can later be driven by real user settings.

## Teacher Experience

### 1. Build a teacher dashboard with class summary cards
Workflow:
- Define class KPI models.
- Use reusable stat cards and shared spacing rules.
- Keep summary blocks composable for later real analytics.

### 2. Add student performance tables with filters
Workflow:
- Define row models and filter state.
- Use a reusable table primitive once added.
- Support empty/filter/no-result states.

### 3. Create a weak-concept analysis panel
Workflow:
- Use typed concept performance data.
- Highlight low-performing concepts with clear thresholds.
- Reuse chart or progress visual patterns.

### 4. Add assignment overview cards
Workflow:
- Define assignment summary models.
- Render due status, completion rate, and CTA links.
- Keep the card system reusable across roles.

### 5. Build a student detail page with mastery breakdown and activity history
Workflow:
- Reuse the mastery and activity models.
- Create a route-friendly page scaffold for future real data.
- Use role-appropriate actions and navigation.

## Parent Experience

### 1. Build a parent dashboard with student progress summary
Workflow:
- Model parent-to-student summary data.
- Show headline status, current progress, and recent movement.
- Keep fallback states when linked students are missing.

### 2. Add weekly activity and consistency widgets
Workflow:
- Define weekly streak and activity-count models.
- Surface trend language, not just raw counts.
- Reuse shared cards and progress visuals.

### 3. Add strengths/weaknesses cards
Workflow:
- Reuse mastery thresholds from student/teacher views.
- Present strongest and weakest concepts clearly.
- Keep copy understandable for non-teacher users.

### 4. Add alert cards for low activity or missed assessments
Workflow:
- Model alerts separately from notifications.
- Prioritize actionable, parent-friendly language.
- Link alerts to the relevant child view or report.

### 5. Create a printable/shareable progress summary section
Workflow:
- Build a report-friendly layout block.
- Keep spacing and typography print-safe.
- Defer export integration until the summary UI stabilizes.

## Authentication and Access

### 1. Wire login and register forms to client-side validation
Workflow:
- Define form schemas and typed form state.
- Add validation feedback and submission states.
- Keep service calls abstracted for future auth backend integration.

### 2. Add auth state handling in a shared provider/store
Workflow:
- Define user/session shape first.
- Add provider or store with mock/default session support.
- Replace page-local assumptions with shared auth access.

### 3. Protect dashboard routes
Workflow:
- Gate route groups or dashboard pages via layout logic.
- Add redirect behavior for unauthenticated users.
- Ensure auth pages remain outside dashboard chrome.

### 4. Add role-based redirects for student/teacher/parent dashboards
Workflow:
- Define role-to-route mapping in one place.
- Reuse auth session information.
- Keep route decisions deterministic and testable.

### 5. Add logout flow from the profile dropdown
Workflow:
- Add a logout action hook to the navbar profile menu.
- Clear mock auth state cleanly.
- Redirect users to the right public route.

## Navigation and Layout

### 1. Add breadcrumb support in the navbar
Workflow:
- Define route metadata map.
- Derive breadcrumb labels from current path.
- Keep mobile layouts compact.

### 2. Add section titles and route metadata per page
Workflow:
- Create a route metadata helper.
- Use it in the sticky navbar and page headers.
- Reduce duplicated heading strings over time.

### 3. Improve sidebar collapse persistence with local storage
Workflow:
- Persist collapse preference client-side.
- Restore state on hydration without layout jumps.
- Keep mobile drawer state separate from desktop preference.

### 4. Add mobile close-on-route-change behavior if needed
Workflow:
- Watch pathname changes in the sidebar.
- Close transient mobile UI on navigation.
- Verify transition timing does not feel abrupt.

### 5. Add keyboard and focus handling for sidebar and dropdown interactions
Workflow:
- Define escape, tab, and focus-return behavior.
- Prevent focus leaks behind overlays.
- Verify interaction using keyboard-only navigation.

## Design System / UI

### 1. Create reusable `Badge`, `Avatar`, `DropdownMenu`, `Tabs`, `Table`, and `Modal` components
Workflow:
- Build one primitive at a time with typed props.
- Keep variants small and semantic.
- Use className-friendly composition.

### 2. Add chart-ready card components for analytics sections
Workflow:
- Create wrapper components for charts and KPI summaries.
- Keep them mock-data friendly first.
- Preserve responsive layout behavior.

### 3. Standardize page headers and section wrappers
Workflow:
- Replace one-off heading layouts with reusable wrappers.
- Accept title, subtitle, actions, and className.
- Apply across dashboard routes gradually.

### 4. Document token usage and component patterns
Workflow:
- Create a lightweight reference inside the repo.
- Focus on how tokens map to components and states.
- Keep examples short and practical.

### 5. Add skeleton loaders for dashboard widgets
Workflow:
- Create reusable skeleton patterns per widget type.
- Use them consistently during mock async states.
- Avoid page jitter from mismatched heights.

## Data Layer Prep

### 1. Create `lib/mocks` or feature-level `model` files for all current hardcoded data
Workflow:
- Define central domain mock files by concern.
- Export typed selectors/helpers, not only raw arrays.
- Keep naming aligned with future service contracts.

### 2. Define TypeScript types for users, notifications, mastery, assessments, and practice sessions
Workflow:
- Extend current shared domain types where needed.
- Keep types close to actual UI requirements.
- Avoid `any` and page-local ad hoc types.

### 3. Add service-layer wrappers for future API integration
Workflow:
- Create stable interfaces for data access.
- Back them with mock data initially.
- Swap implementations later without rewriting views.

### 4. Normalize dashboard data shapes so mock and real data can swap cleanly
Workflow:
- Pick one canonical view model per page.
- Convert raw domain objects in one place.
- Keep UI components dumb and presentational where possible.

## Quality / Cleanup

### 1. Add component tests for `Button`, `Card`, `ProgressBar`, sidebar, and navbar
Workflow:
- Start with render and interaction smoke tests.
- Focus first on critical UI states and accessibility props.
- Expand after core flows stabilize.

### 2. Add page smoke tests for dashboard routes
Workflow:
- Validate route rendering and shell composition.
- Include auth and dashboard route groups.
- Catch regressions from layout moves early.

### 3. Remove or merge older duplicate layout files like legacy `navbar.tsx` and `sidebar.tsx` if unused
Workflow:
- Confirm current import graph first.
- Delete only after verifying no route depends on them.
- Keep commits narrowly scoped.

### 4. Run a final pass on accessibility labels, keyboard navigation, and focus states
Workflow:
- Audit interactive components systematically.
- Add ARIA and focus fixes where required.
- Re-test mobile and desktop interactions.

### 5. Upgrade dependency versions after UI stabilization
Workflow:
- Upgrade one stack area at a time.
- Re-run lint, build, and smoke checks after each change.
- Avoid mixing dependency upgrades with feature work.

## Current Implementation Order

1. Centralize typed mock data.
2. Refactor student, teacher, parent, practice, assessment, and progress views to consume it.
3. Stabilize dashboard widgets and remove fake fetch flows where APIs do not exist.
4. Then move on to notifications and profile actions.
