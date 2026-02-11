export const Agents = [
  {
    id: 1,
    name: "Writing Assistant",
    desc: "Write, rewrite, and fix texts quickly.",
    image: require("../assets/images/a1.png"),
    initialText: "Write an email requesting leave from my manager for two days.",
    prompt:
      "You are a writing assistant. Help users write, rewrite, summarize, and improve text clearly and professionally.",
    type: "chat",
    featured: true,
  },
  {
    id: 2,
    name: "Image Prompter",
    desc: "Get best prompts for enhancing images.",
    image: require("../assets/images/a2.png"),
    initialText: "A futuristic city skyline at sunset in cyberpunk style.",
    prompt:
      "You are an AI image generator. Convert text prompts into creative and detailed image descriptions.",
    type: "image",
    featured: true,
  },
  {
    id: 3,
    name: "Fitness Coach",
    desc: "Personal fitness and workout guidance.",
    image: require("../assets/images/a3.png"),
    initialText: "Create a 30-minute home workout for beginners.",
    prompt:
      "You are a fitness coach. Provide safe, practical workout and fitness advice.",
    type: "chat",
    featured: true,
  },
  {
    id: 4,
    name: "Productivity Coach",
    desc: "Work smarter, not harder.",
    image: require("../assets/images/a4.png"),
    initialText: "Help me plan my day to be more productive.",
    prompt:
      "You are a productivity expert. Help users manage time, focus, and tasks efficiently.",
    type: "chat",
    featured: true,
  },
  {
    id: 5,
    name: "Translator",
    desc: "Translate text accurately between languages.",
    image: require("../assets/images/aaa5.png"),
    initialText: 'Translate "Good morning, how are you?" into French.',
    prompt:
      "You are a translation expert. Translate text while keeping the original meaning and tone.",
    type: "translation",
    featured: false,
  },
  {
    id: 6,
    name: "Code Assistant",
    desc: "Fix bugs and write clean code.",
    image: require("../assets/images/aa6.png"),
    initialText: "Fix this React Native error and explain the solution.",
    prompt:
      "You are a senior software developer. Help users write, debug, and optimize code.",
    type: "code",
    featured: false,
    
  },
  {
  id: 7,
  name: "Math Solver",
  desc: "Solve math problems step by step.",
  image: require("../assets/images/a7.png"),
  initialText: "Solve this equation step by step: 2x + 5 = 15",
  prompt:
    "You are a math expert. Solve math problems clearly with step-by-step explanations.",
  type: "chat",
  featured: false,
},
{
  id: 8,
  name: "Caption Generator",
  desc: "Create catchy captions for social media.",
  image: require("../assets/images/a8.png"),
  initialText: "Generate a cool Instagram caption for a sunset photo.",
  prompt:
    "You are a creative caption writer. Generate short, catchy, and engaging captions based on user input.",
  type: "chat",
  featured: false,
},
{
  id: 9,
  name: "Grammar Fixer",
  desc: "Fix grammar and improve sentence clarity.",
  image: require("../assets/images/a9.png"),
  initialText: "Correct the grammar in this sentence: He don’t like coffee.",
  prompt:
    "You are a grammar expert. Fix grammatical mistakes and improve sentence clarity while keeping the original meaning.",
  type: "chat",
  featured: false,
},
{
  id: 10,
  name: "Research Assistant",
  desc: "Get quick and clear research insights.",
  image: require("../assets/images/a10.png"),
  initialText: "Give me a brief research summary on climate change.",
  prompt:
    "You are a research assistant. Help users with research by summarizing topics, explaining concepts, and providing structured insights.",
  type: "chat",
  featured: false,
},
{
  id: 11,
  name: "Resume Builder",
  desc: "Create professional resumes instantly.",
  image: require("../assets/images/a11.png"),
  initialText: "Create a professional resume for a software engineering student.",
  prompt:
    "You are a resume expert. Help users create, improve, and tailor resumes for jobs and internships.",
  type: "chat",
  featured: false,
},
{
  id: 12,
  name: "Email Reply Assistant",
  desc: "Write smart and polite email replies.",
  image: require("../assets/images/a12.png"),
  initialText: "Reply politely to this email asking for a project update.",
  prompt:
    "You are an email assistant. Help users write clear, polite, and professional email replies.",
  type: "chat",
  featured: false,
}
];
