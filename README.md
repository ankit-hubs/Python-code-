# SiteScope AI - AI-Powered Website Intelligence

SiteScope AI is a futuristic, 3D-immersive website auditor that provides deep technical and strategic insights into any URL. Using advanced web scraping and AI analysis, it generates comprehensive reports on Design, Performance, SEO, Accessibility, and Conversion potential.

![SiteScope AI Preview](https://via.placeholder.com/1200x600?text=SiteScope+AI+Dashboard+Preview)

## 🚀 Features

- **3D Immersive UI:** Built with React Three Fiber and Three.js for a cutting-edge visual experience.
- **Intelligent Web Scraping:** Comprehensive metadata, semantic structure, and technical asset extraction using Cheerio.
- **Multi-Model AI Audit:** Leverages OpenRouter to analyze websites using top-tier models like Gemini 2.0 Flash, Llama 3.1, and DeepSeek.
- **Deep Technical Analysis:** Evaluates architecture, modernity scores, and identifies potential bottlenecks.
- **Persona-Based Feedback:** Get specific critiques from the perspective of a VC, a Power User, and a First-time Visitor.
- **Actionable Roadmap:** Provides "Quick Wins" and a "Long-term Roadmap" for website growth.
- **Interactive Dashboard:** Dynamic data visualization including a Market Potential Radar Chart.

## 🛠️ Tech Stack

- **Frontend:** [Next.js 15+](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/)
- **3D Graphics:** [Three.js](https://threejs.org/), [@react-three/fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Backend:** Next.js API Routes
- **Scraping:** [Cheerio](https://cheerio.js.org/)
- **AI Integration:** [OpenAI SDK](https://github.com/openai/openai-node) (via [OpenRouter](https://openrouter.ai/))
- **Validation:** [Zod](https://zod.dev/)

## 📋 Project Structure

```text
src/
├── app/                  # Next.js App Router
│   ├── api/analyze/      # Backend API for scraping & AI analysis
│   ├── dashboard/        # Results display dashboard
│   └── page.tsx          # Landing page with 3D scene
├── components/           # React Components
│   ├── three/            # 3D Scene and objects (Scene, FloatingCube)
│   └── ui/               # Reusable UI components (Footer, RadarChart)
├── lib/                  # Utilities and Services
│   ├── openai.ts         # OpenRouter/OpenAI integration logic
│   ├── scraper.ts        # Cheerio-based web scraping logic
│   └── utils.ts          # Tailwind CSS class merging utility
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm
- An API Key from [OpenRouter](https://openrouter.ai/) or [OpenAI](https://openai.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sitescope-ai.git
   cd sitescope-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your API key:
   ```env
   OPENAI_API_KEY=your_openrouter_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧠 How it Works

1. **Input:** The user enters a URL on the home page.
2. **Scrape:** The system fetches the website's HTML and extracts metadata, headings, scripts, stylesheets, and accessibility markers.
3. **Analyze:** The extracted data is sent to a suite of AI models. The models evaluate the site across multiple dimensions and return a structured JSON report.
4. **Visualize:** The dashboard parses this report to generate interactive charts, scores, and detailed strategic advice.

## 📄 License

This project is licensed under the MIT License.
