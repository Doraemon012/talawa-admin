# 1. Members Profile

- Attendance button  (only for admins) -> attendance view 
- `ye har ek people ke card mai hoga`
- eg. `http://localhost:4321/orgpeople/6637904485008f171cf29924` (i took this from superadmin)

## Attendance view

- list of attended `and` reg. events

- `if` not attended `and` not reg -> admin has options:
    - invite member to upcoming event

- `if` attended `or` reg -> display:
    - Event Name
    - Date of Event
    - Recurring Flag
    - Task Flag

- *admin can* -> toggle bw users attended `and` upcoming events

- *admin can* -> interact with list of events
    - search - by name
    - sort - by name or date
    - filter - by a date range based on event date or by one or multiple event tags

- *admin can* -> click on an item in the event list and navigate to event detail view

### Pages used




| Pages Used          | Modifications Required                                                   |
|----------------------|-------------------------------------------------------------------------|
| Admin / Superadmin   | Add attendance button (pass uid / auid as prop) to attendance page.     |
| Attendance View      | Preference: Page (modal optional).                                      |
| Event Detail View    | Already implemented. Accessed via `<Route path="/event/:eventId" element={<EventDashboard />} />`. |

### SEE SCHEMA

### EVENTS 

- see files in api
    - api / models (3 files)
    - api / resolvers / Event **yaha use gql query**
    - api / services / Event Cache
- see files in admin
    - admin / components
    - admin / graphql / mutations
    - admin / graphql / queries
    - admin / screens
    - user portal mai bhi events



