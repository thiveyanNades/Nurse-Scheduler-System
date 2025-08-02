Use Case Name: Remove shift

Scope: NurSchedule

Level: summary

Intention in Context: The nurse wants to remove a shift

Multiplicity: One time

Primary Actor: Healthcare professional

Secondary Actors: Administrator, other healthcare professionals

Main Success Scenario:

1. Nurse logs in
2. Nurse sees schedule
3. Nurse selects 'drop shift'
4. Nurse selects shift to drop
5. Nurse selects reason for dropping shift
6. Shift is dropped
7. Database updated
8. Other nurses notified of open shift

Success guarantee:

1. Shift is removed from nurse's portal
2. Shift is removed from database
3. Other nurses are notified of dropped shift

<br/>

---

<br/>

Use Case Name: See summary

Scope: NurSchedule

Level: summary

Intention in Context: The admin wants to see the summary of nurse shift adds and drops

Multiplicity: One time, once each pay period

Primary Actor: Admin

Secondary Actors:

Main Success Scenario:

1. Admin logs in
2. View summary

Success guarantee:

1. There is a summary
