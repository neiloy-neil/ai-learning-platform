
# Testing Report

This document contains a list of bugs and inconsistencies found during the manual testing of the application.

---

## Bug Reports

| ID | Feature | Description | Steps to Reproduce | Expected Behavior | Actual Behavior | Priority |
| 1 | Enquiry Form | The enquiry form does not create a new lead in the system. It only logs the data to the console. | 1. Go to the homepage.<br>2. Fill out the enquiry form.<br>3. Submit the form.<br>4. Check the `leads` data in `lib/db/crm-data.ts`. | A new lead should be created in the `leads` data. | No new lead is created. The data is only logged to the console. | High |
| 2 | Lead Management | There is no UI to manage leads in the admin dashboard. Admins can see the number of new leads, but they cannot view the list of leads, change their status, or perform any other actions. | 1. Go to the admin dashboard. | The admin dashboard should have a section to manage leads, including a list of leads and options to view, edit, and change the status of each lead. | There is no UI to manage leads. | High |
| 3 | Diagnostic Booking | The "New Booking" modal in the diagnostic booking calendar does not create a new booking or send a notification to the parent. | 1. Go to the admin dashboard and navigate to the "Bookings" section.<br>2. Click on the "New Booking" button.<br>3. Fill out the form and click on "Confirm Booking".<br>4. Check the `diagnosticBookings` data in `lib/db/crm-data.ts`.<br>5. Check for any notification sent to the parent. | A new diagnostic booking should be created in the `diagnosticBookings` data, and a notification should be sent to the parent. | No new booking is created, and no notification is sent. An alert is shown instead. | High |
| 4 | Class and Enrolment Management | There is no UI to manage classes and enrol students in the admin dashboard. The "Class Management" view shows some stats but the main interface is missing. | 1. Go to the admin dashboard.<br>2. Navigate to the "Classes" tab. | The "Classes" tab should display a UI to manage classes, including creating new classes, editing existing classes, and enrolling students in classes. | The "Classes" tab displays a "Class management interface coming soon..." message. | High |
| 5 | Class Management | The "Classes" view in the teacher dashboard does not have options to take attendance or assign homework. | 1. Go to the teacher dashboard.<br>2. Navigate to the "Classes" tab. | The "Classes" view should provide options to take attendance and assign homework for each class. | The "Classes" view only displays the class roster and links to assignments and analytics. | High |
| 6 | Authentication and Authorization | The `ProtectedRoute` component does not check for user roles. Any authenticated user can access any page in the dashboard, regardless of their role. | 1. Log in as a student.<br>2. Try to access an admin page, for example `/admin/dashboard`. | The student should be redirected to an "Unauthorized" page or to their own dashboard. | The student can access the admin page. | Critical |

