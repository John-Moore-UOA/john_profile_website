---
title: "UoA Volunteers Club: Event Management System"
summary: "As tech lead of a ten-person student team, I helped the Volunteers Club move event sign-ups and attendance tracking off spreadsheets and onto one platform."
year: 2024
role: "Technical Lead (team of 10)"
categories: ["Systems", "HCI"]
stack: ["React", "Node.js", "Express", "Firebase", "TypeScript"]
featured: false
order: 7.2
links:
  github: "https://github.com/UoaWDCC/volunteers"
  demo: "https://www.wdcc.co.nz/projects/volunteers/2024"
cover: "Illustration of an event sign-up list with signed-up and open events."
image: "/images/volunteers-club.svg"
imageCredit: "Illustration made for this site"
---

<!-- TODO (John): check the GitHub link and fill in anything I have guessed. -->

## Overview

The University of Auckland Volunteers Club runs a lot of events, and it was organising them through a mix of forms, spreadsheets and group chats. Members found it hard to see what was on, and the executives spent hours checking who had actually turned up.

In 2024 I was the technical lead for the WDCC (Web Development & Consulting Club) team that built them a proper system. Members can browse and sign up for events in one place, and executives can create events and take attendance on the day.

## Working with the club

Nobody on the club executive was a developer, and they didn't need to be. Early on we talked through how an event actually runs, from the first post to the last person signing out, and we found where things went wrong. Those conversations shaped the product more than any technical decision did.

- **Starting from their process.** We mapped the real steps (announce, sign up, remind, check in, record hours) before designing any screens.
- **Showing, not specifying.** We put clickable prototypes in front of the executives and changed course based on what confused them.
- **Plain-language check-ins.** Progress updates were about what they could now do, not which endpoints were finished.

## What we built

- A member-facing event list and sign-up flow, built in React.
- An executive dashboard for creating events and marking attendance.
- An Express and Node API on top of Firebase for authentication and data.

## My role as tech lead

- Set the architecture and coding standards, and broke the work into tasks a mixed-experience team could pick up.
- Reviewed pull requests and paired with newer developers, so everyone shipped something real.
- Worked alongside the project manager to turn the club's feedback into a realistic plan for the year.

![Diagram of the executive attendance view: an event with its list of signed-up members, each with a check-in toggle.](/images/diagrams/volunteers-attendance.svg "Executives take attendance on the day from the same system members sign up through (diagram)")

## Outcome

The club got a single place to run its events. I came away with my first real experience of leading a team, and of designing for people whose expertise is running a community rather than writing software.
