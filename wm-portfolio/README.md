# Muhammad Waleed Madni — Systems & AI Engineer

[![Live Site](https://img.shields.io/badge/Live-waleed--editor.vercel.app-7c3aed?style=for-the-badge&logo=vercel)](https://waleed-editor.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-MwaleedMADNI-24292e?style=for-the-badge&logo=github)](https://github.com/MwaleedMADNI)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Waleed_Madni-0077b5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/waleedmadni)

An obsidian-grade interactive portfolio built for **Muhammad Waleed Madni**, Senior Systems & AI Engineer with 2+ years of production experience across full-stack systems engineering, autonomous AI agents, computer vision forensics, and streaming data architectures.

Features a full-width **Interactive Systems Architecture Dashboard** dedicated to the undergraduate thesis: **Image & Video Forgery Detection Lab (IFDL)**, alongside 9 production-grade engineering deployments.

---

## 🌟 Key Highlights

### 1. 🔬 Undergraduate Thesis: IFDL (Image & Video Forgery Detection Lab)
- **Problem Statement**: Passive forensic analysis to detect copy-move, splicing, deepfake synthesis, and metadata manipulation in digital media.
- **Dual-Stream Forensic Engine**:
  - **Spatial Stream**: Fine-tuned ResNet-50 backbone extracting multi-scale hierarchical feature maps (224x224x2048).
  - **Frequency Domain Stream**: 2D Fast Fourier Transform (FFT) capturing periodic sensor noise patterns, discrete cosine transform (DCT) anomalies, and compression ghosting artifacts.
  - **Feature Fusion**: Bilinear attention pooling fusing spatial and frequency embeddings into a unified localization heatmap.
- **100% Vector Animated Diagrams**:
  - **DFD Level 1 Pipeline**: Media Ingestion -> Dual-Stream Decomposition -> Tensor Concat -> Forensic Report.
  - **Sequence Lifelines**: End-to-end async communication sequence between User, API Gateway, Tensor Worker, and PostgreSQL Audit Vault.
  - **Activity State Machine**: Deterministic verification flow with validation, branch decomposition, and alert triggers.
  - **Interactive Forensic Scanner**: Live canvas laser-sweep simulator visualizing noise residual extraction and boundary heatmaps.
- **FYP Artifacts & Drive Hub**: Complete documentation, IEEE thesis draft, high-res UML diagrams, and sample test datasets available in the [IFDL Google Drive Hub](https://drive.google.com/drive/folders/1O-nvwRo_sJt4pqDhEBGY2NlAjQy8A2kY).

### 2. ⚡ 9 Production Engineering Systems
- **Shengen Desk**: Automated European visa application portal with real-time tracking, form validation, and multi-tenant admin dashboards.
- **AI Research Agent**: Autonomous multi-hop research assistant utilizing LangChain, web scraping agents, and vector similarity search.
- **Predictive Data Hub**: Scalable time-series analytics and predictive modeling engine built on FastAPI, scikit-learn, and Pandas.
- **RAG Knowledge Assistant**: Retrieval-Augmented Generation agent indexing dense enterprise documentation with semantic chunking and hybrid search.
- **AI Content Generator**: Production prompt-engineering suite generating structured marketing copy and localized campaigns.
- **Automated Resume Ranker**: Natural Language Processing parser matching candidates against job descriptions using BERT embeddings.
- **Real-Time Crypto Stream Analyzer**: WebSocket-based financial streaming pipeline processing microsecond order-book tickers.
- **Edge IoT Anomaly Detector**: Lightweight edge ML pipeline detecting vibrational anomalies on simulated industrial sensor streams.
- **Microservices Load Balancer & Gateway**: Reverse-proxy gateway with round-robin load distribution, rate limiting, and circuit breaking.

### 3. 🎨 Obsidian Dark Glassmorphic Design System
- **Three.js WebGL Topography**: Dynamic mathematically-rendered wireframe terrain responding subtly to cursor motion.
- **Hardware-Accelerated CSS3**: Glowing status beacons, neon borders, smooth SVG data-flow animations, and zero heavy dependencies.
- **Interactive Terminal**: Embedded CLI emulator supporting help, ifdl, projects, skills, contact, and clear.

---

## 🚀 Quick Start & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (optional, for live reload)
- Any modern web browser (Chrome, Edge, Firefox, Safari)

### Run Locally
`ash
# Clone the repository
git clone https://github.com/MwaleedMADNI/WaleedPortfolio.git

# Navigate to the directory
cd WaleedPortfolio

# Start local server (opens at http://localhost:3000)
npm run dev
`

Alternatively, you can simply double-click index.html to open it in any browser!

---

## 📂 Project Structure

`	ext
WaleedPortfolio/
├── assets/                  # High-res diagrams & project screenshots
│   ├── ifdl-screenshot.png
│   ├── ifdl-dfd-level1.png
│   ├── ifdl-sequence-diagram.png
│   └── ...
├── css/
│   ├── obsidian.css        # BuzzinTech obsidian design system & components
│   └── style.css           # Core typography, reset, and layout styles
├── js/
│   ├── main.js             # Navigation, smooth scroll, terminal, and animations
│   └── topography.js       # Three.js 3D undulating terrain background
├── index.html              # Main single-page portfolio (fully assembled)
├── package.json            # Local dev server script
└── README.md               # Technical overview & documentation
`

---

## 📬 Contact & Inquiries

- **Lead Engineer**: Muhammad Waleed Madni
- **Email**: [madnikmadni@gmail.com](mailto:madnikmadni@gmail.com)
- **WhatsApp**: [+92 316 4613277](https://wa.me/923164613277)
- **Live Portfolio**: [waleed-editor.vercel.app](https://waleed-editor.vercel.app/)
- **GitHub**: [@MwaleedMADNI](https://github.com/MwaleedMADNI)
