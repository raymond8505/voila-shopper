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
My resume contains a long list of skills and qualities, below are examples of those things in this project