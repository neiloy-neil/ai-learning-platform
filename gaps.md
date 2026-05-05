
# Gap Analysis

This document contains a detailed analysis of the gaps between the current implementation and the new requirements from the Pioneer Developer Handover Pack.

---

## Gaps

| Feature | Gap Description | Priority |
|---|---|---|
| Lead Management | The "Add Lead" button in the lead pipeline view does not work. | High |
| Lead Management | The "Call Parent", "Send Email", and "Book Diagnostic" buttons in the lead detail modal do not have any functionality. | High |
| Lead Management | There is no way to change the status of a lead. | High |
| Class and Enrolment Management | The "Create Class" button in the class management view does not work. | High |
| Class and Enrolment Management | The "Edit" and "Cancel Class" buttons in the class management view do not work. | High |
| Class and Enrolment Management | The "Enrol Student" button in the class management view does not work. | High |
| Class and Enrolment Management | The "Confirm Enrolment" button in the enrolment workflow only shows an alert. It does not create a new enrolment, update the class capacity, or send a notification to the parent. | High |
| Class and Enrolment Management | The "Change Class" and "Withdraw Student" workflows in the enrolment workflow are not implemented. | High |
| Class Management | The "Classes" view in the teacher dashboard does not have options to take attendance or assign homework. | High |
| Authentication and Authorization | The `ProtectedRoute` component does not check for user roles. Any authenticated user can access any page in the dashboard, regardless of their role. | Critical |

