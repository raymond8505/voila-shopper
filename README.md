# Voila Shopper

## About The Project
### A browser plugin and AI workflows to automate grocery sale shopping and recipe ideation

First and foremost, I built this because I legitimately want to automate my grocery shopping and recipe ideation with a focus on promotional items. It's fun having an ingredient constraint for recipes, but manually sifting through 1500-2000 items per week is tedious. Also manually tracking sale prices both historically and across competing brands to understand whether a sale is actually "good" is not an easy undertaking.

The plugin is designed to work with voila.ca, a new panel is added to all voila.ca page. AI features are powered by a variety of custom N8N workflows, mostly leveraging Gemini Flash 2.5 and Gemini Flash Lite 2.5

### The Tech Stack

#### Browser Extension - "The Client"

- Vite
- React
- Typescript
- Emotion styled components
- Zustand store
- Ant UI components and icons
- Jest / Storybook for tests

Reasons:
- This is my preferred stack for personal projects
- Branding is a low priority, so Ant components are great for quick UI development balanced with robust customization options- all components are well decorated with classes so minor CSS adjustments could be achieved quickly in the styled components' CSS
- While Ant has a variety of structural and layout components, I find they tend to be overkill for the majority of my needs. I find styled components are better suited for these things to be able to quickly write the basic CSS for structure and layout needs

#### Database

Provider: Supabase

Reasons:
- Already familiar
- Postgres Vector features
- robust REST API
- out of the box N8N support

**Tables and Functions**
- TODO put .sql files for all required tables and functions in /db/
`/db/` contains sql files for all required tables and functions for the workflows

#### Backend / AI
Providers: N8N, Google Gemini

Reasons:
- N8N seemed to have the shallowest learning curve to get up and running quickly for a PoC / MVP
- Research suggested Gemini is the ideal LLM for research and analysis tasks, also I'm already very familiar with the Google ecosystem and APIs

**Workflows**
- TODO download workflow jsons to /n8n/
If you just want to use my n8n workflows `/n8n/` contains the workflows you can import to your own n8n instance, otherwise see `/extension/client/README.md` for how to configure your own endpoints

### Resume Examples
My resume contains a long list of skills and qualities, below are examples of how I leveraged those things in this project

**Qualifications**
- Proficient troubleshooter
    - Voila sends a `x-csrf-token` token with each API fetch request. Finding how and where the page made that value available for the front end code required walking their minified front end code to find that the initial render also put a variable on window containing various data for the front end. Data included various session related values and an array of "above the fold" products, this is likely a strategy to improve various Core Web Vitals that would suffer if initial page load had to wait for a fetch before displaying content
- Exemplary problem-solving skills
    - RAG performance hinges on a lot of variables, investigating and addressing those in my workflows took a lot of this. Context stuffing vs Vector matching, Temperature, result size,  vector dimensionality and indexing, batching, caching, and trimming data- all of these were required to dial in the AI workflows. Solving these problems them required an ability to recognize an effect and accurately identify its cause.
- Passion for efficiency
    - I built an AI app to grocery shop for me... But also, I am a strong proponent for the idea that if a thing can be automated in a dependable way, it should. This philosophy is a large driver of my interest in AI.
- High aptitude for learning and research
    - This project represents my first deep dive into developing AI powered features from scratch with n8n. A lot of experimentation and Youtube videos and I'm starting to get up to speed on best practices for working with LLMs. Previously I'd only worked with Langchain directly, implementing my own APIs from scrath with an express server.
- Strong abstract thinking
    - Reverse engineering Voila's APIs was easier because of my experience with and understanding of REST common patterns and best practices, especially as they related to e-commerce.
    - Abstract thinking is crucial for both context and prompt engineering, especially when it comes to transforming user input into meaningful prompts and context for the LLM.
- Curious and inquisitive
- Self-sufficient and adaptable
    - Voila doesn't have public API docs so I reverse engineered their endpoints to integrate the client with the site
- Logical and analytical

**Languages**
- Javascript / Typescript, HTML, CSS/SASS
    - The client is React with Typescript
- SQL
    - Being able to read and write raw SQL, while mostly unecessary with Supabase's UI tools was often helpful for more complex problems. Specifically working with the product and recipe vector tables.

**Frameworks, Libraries, CMS, Other**
- React
- Agentic AI / RAG
    - Product and recipe matching both run on a RAG workflow. Part of the product workflow involves generating a keyword rich description based on given data to improve the retrieval accuracy against the user's criteria
- Langchain
    - I started my AI workflow journey with Langchain. Understanding the concepts of nodes and edges was invaluable to hit the ground running with n8n
- n8n
- Storybook
- Jest
- Highcharts
- Node
- Docker
