# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

**Problem Statement: The requirement for the functionality is to map agent ids respective to a facility and use that in reports instead of internal database ids.
This requires us to store the relevant data is provided and use that.**

**Assumptions: The facility is not allowed to update the custom agent id once submitted. This is to avoid any discrepancy in future regarding an agent's report.**

**Ticket 1: Create many to many relationship between Agents and Facilities in DB.**
Task: Create a many to many relationship in DB between individual agent and facility. This provides us with the way to map agent ids to facility ids with a custom id for the agent corresponding to a single facility. In future, it can also be used to add more details about an agent's relationship with a facility.
It will also help us to maintain consistency in the data by defining a constraint on the composite key of **agent's internal DB id and facility's id.**

Acceptance Criteria: 
- Created table called `agent_facility_relation` with following columns:
    - `agent_id`: foreign key to `agents` table
    - `facility_id`: foreign key to `facilitys` table
    - `custom_id`: alphanumeric, custom id for the agent corresponding to a single facility
- Created composite key of `agent_id` and `facility_id`
- Created constraint on composite key with indexing (facility_id, agent_id).
- All the above mentioned columns are required to create a row.
- CRUD to search for an agent's custom id for a given facility.
- CRUD to search all relevant agent's with their custom IDs for a given facility.

Time/Effort Estimate:
- 4 hours. Includes creating crud functionality and creating DB table. 
- 1 hour. Writing unit tests for the above functionality.

Implementation Details:
- Use index with facility_id, agent_id so that DB is able to utilize the index with just a facility_id.
- Creation of constraint will ensure DB throwing error for duplicate rows.

**Ticket 2: CRUD for filling custom agent IDs by facilities.**
Task: A facility manager might want to add custom IDs using an excel/csv sheet to upload the data or they might want to do it through a web form.

Acceptance Criteria: 
- Create a web form to upload the data.
- Create a crud functionality to upload the data.
- Create option to load data of all agents who have worked at the facility in a tabluar format. Use should be able to delete any row/agent whose ID they do not want to fill.
- Any agent whose custom id has already been filled should be shown as not editable.
- Format of the downloadable excel sheet.
    - agent_id: internal DB id of the agent
    - agent_name: agent name for easy identification
    - custom_id: custom id of the agent for the facility (already present if already assigned.)
- Provide functionality to download the data in excel/csv format.
    - Download data of all agents who have worked at the facility in a tabluar format.
    - The data should have the proper format.
    - The data should contain custom ids of agents who have already been assigned custom id.
- The functionality to upload data should return error if the format is wrong or the agent_id and agent_name does not match.
- Agent's whose custom id is already assigned should not be updated. Show warning in this case on file upload.
- Provide info of no of agents whose custom id was added with an option to verify it by downloading the sheet with the latest data.

Time/Effort Estimate:
- 4 days. Includes the frontend and backend task. 
- 1 day. Writing unit tests for the above functionality.


**Ticket 3: Using custom agent ids when available.**
Task: In this ticket, we will use the custom agent ids when available. If the id is not available, we will fall back to internal agent ID.

Implementation Details:
- The function `getShiftsByFacility` will return the shifts of the agents who have been assigned custom ids.
- We will implement a function `fetchCustomAgentIds`. The function will be provided the list of shifts.
- We will fetch data from our table `agent_facility_relation`. The search will be done on the basis of facility_id and agent ids for that particular duration of the report. The implemented index will be helpful since we will be able to utilize the index to reduce the searchable data to only the facility specific rows.
- We will return a result with following information for each shift as a hash.
    - agent_id (internal DB id of the agent) : custom_agent_id (custom agent id by the facility, none if not assigned.)

Acceptance Criteria: 
- The function `fetchCustomAgentIds` will return a result with following information for each shift as a hash.
    - agent_id (internal DB id of the agent) : custom_agent_id (custom agent id by the facility, none if not assigned.)
- All agents of the shifts must be represented in the hash table regardless of presence of custom agent id.

Time/Effort Estimate:
- 2 hours.  
- 1 hour. Writing unit tests for the above functionality.


**Ticket 4: Modifying `generateReport` function.**
Task: In this ticket, we will modify the function to accept the hash table returned from `fetchCustomAgentIds` function.

Implementation Details:
- The function while creating the PDF entries will check if a custom agent id is present for the agent for the shift.
- On presence of a custom agent id, the custom id will be used with (custom id) mentioned after that so that the user is aware.
- If no custom agent id is present, the internal agent id will be used.

Acceptance Criteria: 
- The function `generateReport` expects a hash table as an argument.
- All shifts must have an agent id.
- In case of using a custom agent id, there must be a `(custom id)` string present.
- If no custom agent id is present, the internal agent id will be used.
- The report must have custom id if custom id is availale.
- The function `generateReport` will return a PDF file.


Time/Effort Estimate:
- 2 hours.  
- 2 hours. Writing unit tests for the above functionality.


