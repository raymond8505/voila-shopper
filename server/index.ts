import express, { Request, Response } from "express";
import { scrapeRecipe } from "./recipeScraper";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("API Server is up and running!");
});

// Webhook endpoint
app.post("/api/webhook", (req: Request, res: Response) => {
  console.log("Webhook received!");
  console.log("Payload:", req.body);

  // You can now process the data from the webhook.
  // For example, if it's a GitHub webhook for a new push:
  if (req.headers["x-github-event"] === "push") {
    console.log(`New push to the ${req.body.repository.name} repository.`);
  }

  res.status(200).json({ message: "Webhook received successfully!" });
});

app.listen(PORT, () => {
  console.log(`[nodemon] Server is listening on port ${PORT}`);
});

scrapeRecipe(
  //"https://www.instagram.com/reel/DRBuEJ2kTuK/?igsh=aTZicW1ucHViZDhs"
  "https://www.google.com/search?q=Butadon+Myriad+Recipes&sca_esv=e5cbd14f40937cac&ucbcb=1&ie=UTF-8&=SG_REL&sei=ULBOad_FN_Lyi-gP9sGDoAk"
).then((result) => {
  console.log("Scrape result:", result);
});
