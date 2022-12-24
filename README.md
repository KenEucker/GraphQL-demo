# Point Of Vue

This started out as a project to learn graphql following a Udemy course. Halfway through that 
course I discovered it was a couple years out of date and so I had to pivot the project I was 
working on. This is still a project but I would be happy to evolve it into something more. I'

# Stack

Vite + TypeScript + Vue3 + GraphQl + Prisma + Pinia + WindiCss

# Contributing

This project is still in it's first week of development and I don't have anything set up for 
contributors. If someone is feeling adventurous you're welcomed to try and follow the steps 
below to get up and running yourself.

Right now it's in demo mode. You can login with an email for an existing author (which requires creating an author with Prisma Studio) and create posts. The post interactions aren't fully wired up. You can edit the author settings but you cannot edit or upload images.

I expect that next week, before 2023, that all features will be implemented and the demo will be fully functional.

# Setup

This is a rough draft giude to setting up Point-Of-Vue on your machine for local development.

Note: I was using an external postgres database to connect to with the graphql server. If you 
have a postgres database available on your local machine you can just use that instead.

1. Install Node Modules

```
npm install
```

2. Configure your environment variables by creating a .env file with the following variable:
- `GRAPH_URL="YOUR_POSTGRES_URL"`

2a. Optionally, these are other environment variables that can be configured:
- `ORIGIN="http://localhost"`
- `ORIGIN_PORT=8000`
- `GRAPH_URL="http://localhost"`
- `GRAPH_PATH="graphql"`
- `GRAPH_PORT=8080`
- `STUDIO_URL="http://localhost:5555"`

2b. The ORIGIN is the vite server or static webserver for the client app. If port 80 is used for any 
of the PORT variables, it will be omitted from the constructred url. The STUDIO_URL is for Prisma Studio 
and I don't know of a way to change this value or port.

3. Run the application(s). There are three programs that run this application for local development. There 
is the server (apollo/graphql-yoga + playground), client (vite powered frontend), studio (prisma studio for editing data tables). `npm run dev` will run all three applications simultaneously with live reload. Any changes made to the files in schema will trigger a reload of the server and client applications. 

4. If you run the defaults, the following urls are reachable:
- http://localhost:8000  -- [client]
- http://localhost:8080  -- [server]
- http://localhost:8080/graphql  -- [playground]
- http://localhost:5555  -- [studio]

# Thanks for reading!

Demo: 