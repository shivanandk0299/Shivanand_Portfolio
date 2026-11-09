/*
 * Portfolio Content Configuration — High-Level Developer Portfolio
 * Shivanand Kalashetti | Computer Science & Engineering
 */
window.PORTFOLIO_CONFIG = {
  profile: {
    name: "Shivanand Kalashetti",
    monogram: "SK",
    role: "Aspiring Software Developer & CSE Student",
    title: "Software Developer & Computer Science Student",
    status: "Available for internships & entry-level roles",
    location: "Bengaluru, Karnataka, India",
    timezone: "Asia/Kolkata",
    timezoneLabel: "IST (UTC+5:30)",
    education: "B.E. Computer Science & Engineering · VTU",
    graduation: "Expected July 2027",
    headline: "Architecting software from first principles.",
    tagline: "CSE student at VTU building scalable, well-structured software across Java, Python, modern web architectures, and data systems.",
    bio: "I am a Computer Science & Engineering student in Bengaluru dedicated to deep programming fundamentals and practical software systems. I approach development through deliberate practice: breaking problems into foundational components, structuring clean architectures, and iterating based on performance and user feedback.",
    about: [
      "My core engineering focus spans Object-Oriented Programming with Java, data pipelines and applied machine learning with Python, relational databases with SQL/MySQL, and modern frontend systems with semantic HTML, CSS architecture, and vanilla JavaScript.",
      "I believe the best software is built on strong fundamentals—writing self-documenting code, understanding runtime complexities, and designing systems that are explainable, testable, and maintainable."
    ],
    highlights: [
      { number: "01", title: "First-Principles Engineering", description: "Deep dive into memory, complexity, and internal mechanics before selecting abstractions." },
      { number: "02", title: "Clean & Explainable Code", description: "Writing maintainable systems that prioritize readability, testability, and clear documentation." },
      { number: "03", title: "Continuous Iteration", description: "Benchmarking solutions, debugging edge cases, and measuring real-world performance." }
    ],
    // Public profile links
    githubUrl: "https://github.com/shivanandk0299",
    linkedinUrl: "",
    publicEmail: "shivanand.s.k.8678@gmail.com",
    resumePath: ""
  },

  metrics: [
    { value: "04+", label: "Engineered Projects", detail: "RAG, ML & Web Systems" },
    { value: "2027", label: "VTU Graduation", detail: "B.E. Computer Science" },
    { value: "100%", label: "Core Web Vitals", detail: "Fast, Accessible & Clean" },
    { value: "IST", label: "Bengaluru Based", detail: "UTC+5:30 Timezone" }
  ],

  education: {
    degree: "Bachelor of Engineering",
    discipline: "Computer Science and Engineering",
    institution: "Visvesvaraya Technological University (VTU)",
    location: "Bengaluru, Karnataka, India",
    start: "August 2023",
    end: "July 2027",
    status: "Expected graduation · 2027",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Java)",
      "Database Management Systems (DBMS & SQL)",
      "Operating Systems & Systems Concepts",
      "Computer Networks & Protocols",
      "Software Engineering Principles"
    ]
  },

  focusAreas: [
    {
      id: "programming",
      title: "Core Languages",
      icon: "code",
      items: ["Java", "Python", "JavaScript (ES6+)", "C Fundamentals", "Object-Oriented Design (OOP)"]
    },
    {
      id: "web",
      title: "Web Engineering",
      icon: "layout",
      items: ["HTML5 Semantic Architecture", "CSS3 / Custom Properties / Flex & Grid", "Vanilla JS & DOM APIs", "Responsive Design", "Web Accessibility (WCAG)"]
    },
    {
      id: "data",
      title: "Data & Machine Learning",
      icon: "database",
      items: ["SQL & Relational Schema Design", "MySQL", "Linear Regression Modeling", "Retrieval-Augmented Generation (RAG)", "Data Normalization"]
    },
    {
      id: "workflow",
      title: "Developer Tools & Workflow",
      icon: "terminal",
      items: ["Git & Version Control", "GitHub Workflows", "VS Code Architecture", "Linux / Command Line", "Debugging & Profiling"]
    }
  ],

  projects: [
    {
      id: "offline-rag",
      title: "Offline Multimodal RAG System",
      eyebrow: "Capstone System · AI & Information Retrieval",
      category: "ai",
      status: "In development",
      badge: "Capstone Project",
      image: "assets/images/project-rag.svg",
      alt: "Illustration of documents, images, audio and a local retrieval pipeline",
      description: "A privacy-centric architecture designed for offline ingestion, vector search, and multimodal query processing across PDFs, documents, diagrams, and voice recordings without external API dependencies.",
      architecture: "Local Ingestion Pipeline → Embedding Extraction → Vector Indexing → Semantic Retrieval & Context Injection → Offline Inference",
      highlights: [
        "Eliminates cloud data leakage by running localized vector embedding and retrieval.",
        "Engineered to parse structured documents, technical diagrams, and audio notes under one unified index.",
        "Modular pipeline allowing swappable local embeddings and lightweight quantized models."
      ],
      tags: ["Python", "Multimodal Retrieval", "Vector Search", "Local AI", "Privacy-First"],
      githubUrl: "",
      demoUrl: ""
    },
    {
      id: "climate-modeling",
      title: "Climate Modeling Prediction System",
      eyebrow: "Applied Machine Learning · Predictive Analytics",
      category: "data",
      status: "Project",
      badge: "Machine Learning",
      image: "assets/images/project-climate.svg",
      alt: "Illustrated chart and climate-data visualization for the climate modeling project",
      description: "An applied data science project implementing Linear Regression models to evaluate historical atmospheric and environmental datasets, predicting temperature shifts and identifying long-term climate patterns.",
      architecture: "Raw Kaggle Dataset → Data Cleaning & Imputation → Feature Selection & Normalization → Linear Regression Fitting → Metric Evaluation (MSE/R²)",
      highlights: [
        "End-to-end data preparation including outlier trimming, feature correlation matrices, and missing value imputation.",
        "Comparative evaluation of model coefficients to assess atmospheric parameter significance.",
        "Clean visualization of prediction boundaries and residual errors."
      ],
      tags: ["Python", "Linear Regression", "Data Preprocessing", "Feature Engineering", "Kaggle Dataset"],
      githubUrl: "",
      demoUrl: ""
    },
    {
      id: "portfolio",
      title: "Personal Portfolio & Architecture Engine",
      eyebrow: "Web Engineering · Design System",
      category: "web",
      status: "Current project",
      badge: "Production Ready",
      image: "assets/images/project-portfolio.svg",
      alt: "Illustration of the personal portfolio hero and a code preview",
      description: "A production-grade, high-performance developer portfolio built from scratch with zero framework dependencies. Features an interactive Command Palette (⌘K), live Bengaluru clock, real-time code runner, dynamic theme accents, and WCAG-compliant accessibility.",
      architecture: "Semantic HTML5 Structure → CSS Custom Properties Design System → Progressively Enhanced Vanilla JS → Decoupled JSON-Driven Content Engine",
      highlights: [
        "100% dependency-free vanilla architecture achieving near-instant first contentful paint.",
        "Keyboard-driven Command Palette (⌘K / Ctrl+K) for instant navigation and actions.",
        "Dynamic theme accent customization with client-side persistence.",
        "Strict accessibility adherence: focus management, ARIA contracts, and reduced-motion modes."
      ],
      tags: ["HTML5", "Modern CSS", "Vanilla JavaScript", "Command Palette", "Performance", "WCAG 2.1"],
      githubUrl: "",
      demoUrl: ""
    },
    {
      id: "css-learning",
      title: "CSS Learning Lab & Component System",
      eyebrow: "Frontend Engineering · UI Architecture",
      category: "web",
      status: "Learning project",
      badge: "Hands-on Lab",
      image: "assets/images/project-css.svg",
      alt: "Illustrated responsive browser page beside CSS code",
      description: "A systematic laboratory repository exploring modern CSS layout paradigms, fluid typography, CSS Grid, custom properties, and micro-interaction patterns built through structured experiments.",
      architecture: "Modular CSS Architecture → Fluid Layout Tokens → Grid / Flexbox Experiments → Interactive UI Atoms & Molecules",
      highlights: [
        "Hands-on implementation of responsive grid systems without heavy CSS frameworks.",
        "Deep exploration of CSS layout rendering passes, reflows, and GPU-accelerated transitions.",
        "Tracked on version control with clear commit histories for incremental mastery."
      ],
      tags: ["CSS3", "Grid & Flexbox", "UI Architecture", "Interactive Atoms", "Git & GitHub"],
      githubUrl: "",
      demoUrl: ""
    }
  ],

  learningSnippets: {
    java: {
      label: "Java · Binary Search",
      filename: "BinarySearch.java",
      language: "java",
      complexity: "O(log n) time | O(1) space",
      code: `public class BinarySearch {
    // Fast logarithmic lookup in a sorted array
    public static int search(int[] values, int target) {
        int left = 0;
        int right = values.length - 1;

        while (left <= right) {
            // Avoid integer overflow with safe midpoint calculation
            int mid = left + (right - left) / 2;

            if (values[mid] == target) {
                return mid; // Target found
            }
            if (values[mid] < target) {
                left = mid + 1; // Discard left half
            } else {
                right = mid - 1; // Discard right half
            }
        }
        return -1; // Target not present
    }
}`,
      walkthrough: [
        "Initialize two pointers: left at 0 and right at array.length - 1.",
        "Calculate the midpoint using left + (right - left) / 2 to prevent integer overflow.",
        "Compare the middle element: if matched, return the index immediately.",
        "If target is larger, search right half; if smaller, search left half.",
        "Halves the search space on each iteration, achieving guaranteed O(log n) efficiency."
      ]
    },
    python: {
      label: "Python · Vector Similarity",
      filename: "similarity.py",
      language: "python",
      complexity: "O(d) vector dot product",
      code: `import math

def cosine_similarity(vec_a: list[float], vec_b: list[float]) -> float:
    """Computes semantic closeness between two embedding vectors."""
    dot_product = sum(a * b for a, b in zip(vec_a, vec_b))
    norm_a = math.sqrt(sum(a * a for a in vec_a))
    norm_b = math.sqrt(sum(b * b for b in vec_b))

    if norm_a == 0.0 or norm_b == 0.0:
        return 0.0
    return dot_product / (norm_a * norm_b)`,
      walkthrough: [
        "Take two multi-dimensional dense embedding vectors representing query and document.",
        "Compute the scalar dot product by summing element-wise multiplications.",
        "Calculate Euclidean norms (magnitudes) for both vectors.",
        "Divide dot product by magnitude product to obtain normalized cosine score (-1.0 to +1.0).",
        "Foundational operation for RAG retrieval ranking and nearest-neighbor vector search."
      ]
    },
    sql: {
      label: "SQL · Relational Aggregation",
      filename: "analytics.sql",
      language: "sql",
      complexity: "Index Scan & Group Hash",
      code: `SELECT 
    department,
    COUNT(student_id) AS total_enrolled,
    ROUND(AVG(cgpa), 2) AS average_gpa
FROM students
WHERE enrollment_status = 'ACTIVE'
GROUP BY department
HAVING COUNT(student_id) >= 10
ORDER BY average_gpa DESC;`,
      walkthrough: [
        "Filter active student records before grouping using the WHERE predicate.",
        "Partition data into distinct department clusters using GROUP BY.",
        "Compute aggregate metrics: COUNT for student volume, AVG for grade metrics.",
        "Apply HAVING filter to isolate established cohorts with at least 10 active students.",
        "Sort results by academic performance in descending sequence."
      ]
    },
    javascript: {
      label: "JavaScript · Event Bus & State",
      filename: "eventBus.js",
      language: "javascript",
      complexity: "O(1) emit & subscribe",
      code: `class EventBus {
    constructor() {
        this.listeners = new Map();
    }

    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);
        return () => this.listeners.get(event).delete(callback);
    }

    emit(event, data) {
        const subscribers = this.listeners.get(event);
        if (subscribers) {
            subscribers.forEach((fn) => fn(data));
        }
    }
}`,
      walkthrough: [
        "Utilize Map and Set data structures for constant-time event subscriptions and unicity.",
        "The on() method binds callbacks and returns a teardown function for easy unsubscribing.",
        "The emit() method notifies all active subscribers safely with dispatched payload data.",
        "Encourages loose coupling between decoupled UI components and state stores."
      ]
    }
  },

  contactSettings: {
    endpointUrl: ""
  }
};
