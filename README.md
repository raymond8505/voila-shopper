# Voila Shopper

## About The Project
### A browser plugin and AI workflows to automate grocery sale shopping and recipe ideation

First and foremost, I built this because I legitimately want to automate my grocery shopping and recipe ideation with a focus on promotional items. It's fun having an ingredient constraint for recipes, but manually sifting through 1500-2000 items per week is tedious. Also manually tracking sale prices both historically and across competing brands to understand whether a sale is actually "good" is not an easy undertaking.

The plugin is designed to work with voila.ca, a new panel is added to all voila.ca page. AI features are powered by a variety of custom N8N workflows, mostly leveraging Gemini Flash 2.5 and Gemini Flash Lite 2.5

### The Tech Stack

#### Browser Extension - "The Client"

#### Database

Provider: Supabase

Reasons:
- Already familiar
- Postgres Vector features
- robust REST API
- out of the box N8N support

#### Backend / AI
Providers: N8N, Google Gemini

Reasons:
- N8N seemed to have the shallowest learning curve to get up and running quickly for a PoC / MVP
- Research suggested Gemini is the ideal LLM for research and analysis tasks, also I'm already very familiar with the Google ecosystem and APIs

### Resume Examples
My resume contains a long list of skills and qualities, below are examples of how I leveraged those things in this project

**Qualifications**
- Proficient troubleshooter
    - Voila sends a `x-csrf-token` token, finding how and where the page made that value available for the front end code required walking their minified front end code to find that the initial render also put a variable on window containing various data for the front end. Data included various session related values and an array of "above the fold" products, this is likely a strategy to improve various Core Web Vitals that would suffer if initial page load had to wait for an initial fetch before displaying content
- Exemplary problem-solving skills
    - LLM Retrieval performance hinges on a lot of variables, investigating and addressing those in my workflows took a lot of this. Temperature, result size, ideal vector dimensionality, batching, caching, trimming data- all of these were required to dial in the AI workflows for the promotion parsing.
- Passion for efficiency
    - I built an AI app to grocery shop for me...
- High aptitude for learning and research
    - This project represented my first deep dive into developing AI powered features from scratch. A lot of experimentation and Youtube videos and I'm starting to get up to speed on best practices for working with LLMs
- Strong abstract thinking
    - Reverse engineering Voila's APIs was easier because of my experience with and understanding of REST common patterns and best practices.
    - Abstract thinking is crucial for both context and prompt engineering, especially when it comes to transforming user input into meaningful prompts and context for the LLM 
- Curious and inquisitive
- Self-sufficient and adaptable
    - Voila doesn't have public API docs so I reverse engineered their endpoints to integrate the client with the site
- Logical and analytical

**Languages**
- Javascript / Typescript
    - The client is written in Typescript with a full suite of types, interfaces and namespaces
- HTML
- CSS/SASS
- SQL

**Frameworks, Libraries, CMS, Other**
- React
- Agentic AI / RAG
- Langchain
- n8n
- Storybook
- Jest
- Highcharts
- Node
- Docker
