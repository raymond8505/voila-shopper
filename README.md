- [About Voila Shopper](#about-voila-shopper)
  - [The Tech Stack](#the-tech-stack)
    - [Browser Extension - "The Client"](#browser-extension---the-client)
    - [Database](#database)
    - [Workflows / AI](#workflows--ai)
  - [AI Use](#ai-use)
  - [Resume Examples](#resume-examples)
    - [Qualifications](#qualifications)
      - [Proficient troubleshooter](#proficient-troubleshooter)
      - [Exemplary problem-solving skills](#exemplary-problem-solving-skills)
      - [Passion for efficiency](#passion-for-efficiency)
      - [High aptitude for learning and research](#high-aptitude-for-learning-and-research)
      - [Strong abstract thinking](#strong-abstract-thinking)
      - [Curious and inquisitive](#curious-and-inquisitive)
      - [Self-sufficient and adaptable](#self-sufficient-and-adaptable)
      - [Logical and analytical](#logical-and-analytical)
    - [Languages](#languages)
      - [Javascript / Typescript, HTML, CSS/SASS](#javascript--typescript-html-csssass)
      - [SQL](#sql)
    - [Frameworks, Libraries, CMS, Other](#frameworks-libraries-cms-other)
      - [React](#react)
      - [Agentic AI / RAG](#agentic-ai--rag)
      - [Langchain](#langchain)
      - [n8n](#n8n)
      - [Storybook](#storybook)
      - [Jest](#jest)
      - [Highcharts](#highcharts)
      - [Node](#node)
      - [Docker](#docker)
  - [FAQs / Common Job requirement examples](#faqs--common-job-requirement-examples)
    - [](#)
# About Voila Shopper

_A grocery shopping and recipe ideation app_

First and foremost, I built this because I legitimately want to automate my grocery shopping and recipe ideation with a focus on promotional items. It's fun having an ingredient constraint for recipes, but manually sifting through 1500-2000 items per week is tedious. Also manually tracking sale prices both historically and across competing brands and retailers to understand whether a sale is actually "good" is not an easy undertaking.

Right now the app is designed to work with voila.ca, a new panel is added to all voila.ca pages. AI features are powered by a variety of custom n8n workflows, mostly leveraging Gemini Flash 2.5 and Gemini Flash Lite 2.5

## The Tech Stack

### Browser Extension - "The Client"

This is mostly what I use for personal projects
- Vite (React w/ Typescript)
  - easy setup
  - very customizable 
  - extremely fast build times
  - very well supported
- Zustand store
  - powerful
  - easy to use and test
  - lots of experience
- Ant UI components and icons
  - Branding is a low priority so Ant components are great for quick UI development balanced with robust customization options
    - all components are well decorated with classes for bespoke changes plus a robus theming API
- Emotion styled components
  - While Ant does have a robust suite of structure / layout components, I find they tend to be overkill for smaller projects / MVPs / PoCs. The cons of a full blown, opinionated layout / structure solution outweigh the pros at this stage / this use case
- Vitest / Storybook for tests
  - Vitest because there are complications trying to config Jest with Vite. Vitest has a lot of overlap with Jest, so it's easy enough to just adapt to the differences and migration tools exist should I want to switch in the future
  - Storybook is fantastic for developing components in isolation, significantly shortening the feedback loop when developing UI components deep within a user flow. Also for quickly mocking out complex states and an all around powerful suite of APIs
  - I have a lot of experience with Storybook, [having built my own Accessibility addon](https://github.com/raymond8505/storybook-addon-acrs)

### Database

> Provider: Supabase

**Reasons:**

- already familiar
- Postgres Vector features
- robust REST API
- out of the box n8n support
- edge functions and storage should I need them
  - (a soft goal for this project has been to attempt a serverless solution)

**Tables and Functions**

- TODO put .sql files for all required tables and functions in /db/
  `/db/` contains sql files for all required tables and functions for the workflows

### Workflows / AI

> Providers: n8n, Google Gemini (Flash 2.5 and Flash Lite 2.5)

**Reasons:**

- n8n seemed to have the shallowest learning curve to get up and running quickly for a PoC / MVP
- Research suggested Gemini is the ideal LLM for research and analysis tasks
- I'm already very comfortable with the Google API ecosystem
- I'm already comfortable with Gemini from previous AI projects

**Workflows**

- TODO download workflow jsons to /n8n/
- Talk through each workflow here, (maybe with screenshots of the whole workflow?)
  If you just want to use my n8n workflows `/n8n/` contains the workflows you can import to your own n8n instance, otherwise see `/extension/client/README.md` for how to configure your own endpoints

## AI Use

AI was used to write parts of the app- primarily used for 
- type definition - object conversion / generation
- boilerplate patterns / utility functions
- general debugging, especially for complex type collisions and tool config
- an in-IDE replacement for Stack Overflow that doesn't make me feel bad for asking questions

## Resume Examples

My resume contains a long list of skills and qualities, below are examples of how I leveraged those things in this project

### Qualifications

#### Proficient troubleshooter
  - Voila sends a `x-csrf-token` token with each API fetch request. Finding how and where the page made that value available for the front end code required walking their minified front end code to find that the initial render also put a variable on window containing various data for the front end. Data included various session related values and an array of "above the fold" products, this is likely a strategy to improve various Core Web Vitals that would suffer if initial page load had to wait for a fetch before displaying content
#### Exemplary problem-solving skills
  - RAG performance hinges on a lot of variables, investigating and addressing those in my workflows took a lot of this. Context stuffing vs Vector matching, Temperature, result size, vector dimensionality and indexing, batching, caching, and trimming data- all of these were required to dial in the AI workflows. And Solving these problems them required an ability to recognize an effect and accurately identify its cause.
  - building out my RAG strategies in my workflows has been a fun exercise in problem solving and patience. Lots of patience...
#### Passion for efficiency
  - I built an AI app to grocery shop for me... But also, I am a strong proponent for the idea that if a thing can be automated in a dependable way, it should. This philosophy is a large driver of my interest in AI.
#### High aptitude for learning and research
  - This project represents my first deep dive into developing AI powered features from scratch with n8n. A lot of experimentation and Youtube videos and I'm starting to get up to speed on best practices for working with LLMs. Previously I'd only worked with Langchain directly, implementing my own APIs from scrath with an express server.
#### Strong abstract thinking
  - Reverse engineering Voila's APIs was easier because of my experience with and understanding of REST common patterns and best practices, especially as they related to e-commerce.
  - Abstract thinking is crucial for both context and prompt engineering, especially when it comes to transforming user input into meaningful prompts and context for the LLM.
#### Curious and inquisitive
#### Self-sufficient and adaptable
  - Voila doesn't have public API docs so I reverse engineered their endpoints to integrate the client with the site
#### Logical and analytical

### Languages

#### Javascript / Typescript, HTML, CSS/SASS
  - The client is React with Typescript
#### SQL
  - Being able to read and write raw SQL, while mostly unecessary with Supabase's UI tools was often helpful for more complex problems. Specifically working with the product and recipe vector tables.

### Frameworks, Libraries, CMS, Other

#### React
#### Agentic AI / RAG 
  - Product and recipe matching both run on a RAG workflow. Part of the product workflow involves generating a keyword rich description based on given data to improve the retrieval accuracy against the user's criteria
#### Langchain
  - I started my AI workflow journey with Langchain. Understanding the concepts of nodes and edges was invaluable to hit the ground running with n8n
#### n8n
#### Storybook
#### Jest
  - While this project uses vitest, it has significant overlap with Jest, so learning vitest on the go has been a non-issue.
  - I'm still angry I can't spy infra module function calls. Like, how is that not a thing here?
#### Highcharts
#### Node
#### Docker

## FAQs / Common Job requirement examples

### 