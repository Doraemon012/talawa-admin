# Event Detail

## Event Attendance Management

- Basically the `Event Dashboard`

- Add event attendance in sideabar of : `http://localhost:4321/event/66050bacd8de1a9738deb683` `kaisa bhi`

- `display` - **Atendees List** `ye past ke liye` `kaisa bhi`
    - mem name
    - mem status `and / or` mem role in org [+]
    - mem num of events attended 
        - this month
        - this year

- `display` - **Ivitees List** `ye present ke liye` `kaisa bhi`
    - mem name
    - mem status `and / or` mem role in org
    - mem num of events attended 
        - this month
        - this year

- if sel event is `past / future`
    - `display` list of invitees [`reg hai`] / attendees

- if past (i think onging too)  `THEEK SE`
    - `flag` attendees that performed a role or were assigned a `Action item` [---]

- if recurring event `THEEK SE - but mostly suggrestions - kyuki its frntend`
    - event timeline `kab se kab tak & usme checkpoints kind of things ki pehele kab huw` `pref a graph or something` `koi lib`
    - event timeline as list `past events`
    - Edit all events in the series
    - Edit the current event and future occurrences of the event `manage`

- check in member `ye hum member profile mai bhi add kr sakte hai`  `THEEK SE` ***
    - `USER AND NON_USER` - agar koi aisa aaye jo db mai nahi **must be some way to check them in** **`ye sirf un events k liye jisme regestration required nahi`**
    - `if event is of type REG REQUIRED` - unko hi check in jo reg ho
    - `NEW FEAT` - agar humare venue mai space hai tab hi hum check in kara paaye
    

## Event Attendance Reporting

### reporting and data visualisation

- Measures / values / charts to be displayed

    - `mine` past events  `kaisa bhi`
        - total no of att of event
        - `mine` - total no of people reg in event
        - `mine` - total no of people who checked in

    - `mine` ongoing & upcoming events  `kaisa bhi`
        - `mine` - total no of people reg in event (till now)
        - `mine` - total no of people who checked in (till now)

    - **Recurring events**  `THEEK SE`
        - `HISTORICAL ATTENDANCE`
            - Att Trend - chart of attendance (6M, 12M, 24M)
            - Att Freq - no. of people attending event for:
                - 1st time
                - 2nd Time
                - 3rd Time
                - 4th Time
                - `>` 5 times
                - list of attendees in each freq bucket
    
    - Att Demography - no. of events grouped by  `THEEK SAI`
        - Gender
        - Member status
        - `mine` role
        - Age grp
    
    - `Think of novel ways of tabulating historical attendance for recurring events`
        <!-- - `mine` - **heatmap** *no* -->
        <!-- - `mine` - interactive calander *no* -->
        - `mine` - Comparative Analysis: bw occurances of same event - `band chala`
        - `mine` - peak attendance
        - `line graph`
        <!-- - `github like commit graph` -->
        - `yt studio like`

         `THEK SE - suggestion + explain` * *


# GOAL 

>    Making recurring meetings flawless

>    Adding improved attendance tracking

>    Improving user profile management


- `mine` `FEAT` recurrence ko break karo  `THEEK SE` * *
- `volunteers`
- past - archive

# TODO 

> flow diagram

> fig jam

> event data resolver

> freq in resolver ? but why more data

> figma

> app user Id

> venue space - null check

```md
- recurring event - kis date ko 
- heath status - pwd - agar offline hai - check in
```