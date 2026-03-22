import { z } from "zod";

const navItemSchema = z.object({
  label: z.string().min(1),
  path: z.string().min(1),
});

const projectSchema = z.object({
  id: z.string().min(1),
  category: z.enum(["Artificial Intelligence", "Web Development", "UI/UX Design"]),
  title: z.string().min(1),
  concept: z.string().min(1),
  technologies: z.array(z.string().min(1)).min(1),
  image: z.string().min(1),
  details: z.string().min(1),
  reasoning: z.string().min(1),
  links: z.object({
    live: z.string().min(1),
    source: z.string().min(1),
  }),
});

const contentBlockSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  text: z.string().min(1),
});

const journeyEntrySchema = z.object({
  year: z.string().min(1),
  title: z.string().min(1),
  text: z.string().min(1),
  phase: z.number().optional(),
});

const labExperimentSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
});

const certificateSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  date: z.string().min(1),
  credentialId: z.string().optional(),
  credentialUrl: z.string().optional(),
});

const socialLinkSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  href: z.string().min(1),
});

export const navItems = z
  .array(navItemSchema)
  .parse([
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Journey", path: "/journey" },
    { label: "Lab", path: "/lab" },
    { label: "Contact", path: "/contact" },
  ]);

export const featuredProjects = z
  .array(projectSchema)
  .parse([
    {
      id: "ecommerce-platform",
      category: "Web Development",
      title: "E-Commerce Platform",
      concept: "A full-featured e-commerce system built with MERN stack, handling products, payments, and user authentication.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      image:
        "https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details:
        "Complete e-commerce solution with product catalog, shopping cart, payment integration, and admin dashboard. Implemented secure authentication, order management, and responsive design.",
      reasoning:
        "Focused on clean architecture and user experience, creating a scalable system that handles real-world e-commerce needs while maintaining code quality and performance.",
      links: {
        live: "#",
        source: "#",
      },
    },
    {
      id: "hate-detection",
      category: "Artificial Intelligence",
      title: "Algerian Dialect Hate Detection",
      concept: "AI-powered platform for detecting hate speech in Algerian dialect using fine-tuned machine learning models.",
      technologies: ["Python", "FastAPI", "scikit-learn", "NLP", "React"],
      image:
        "https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details:
        "Developed and fine-tuned NLP models specifically for Algerian dialect text processing. Created a web interface for real-time hate speech detection with accuracy metrics and model performance tracking.",
      reasoning:
        "Addressed the gap in hate detection for regional dialects by combining linguistic expertise with machine learning, creating a socially impactful tool with practical applications.",
      links: {
        live: "#",
        source: "#",
      },
    },
    {
      id: "whatsapp-automation",
      category: "Web Development",
      title: "WhatsApp Automation System",
      concept: "Multi-purpose WhatsApp bots for business communication and customer service automation.",
      technologies: ["Node.js", "WhatsApp API", "Express", "MongoDB"],
      image:
        "https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details:
        "Built automated WhatsApp bots for customer service, notifications, and business process automation. Integrated with existing systems for seamless workflow management.",
      reasoning:
        "Leveraged WhatsApp's extensive user base to create practical automation solutions that improve business efficiency and customer engagement.",
      links: {
        live: "#",
        source: "#",
      },
    },
    {
      id: "design-system",
      category: "UI/UX Design",
      title: "Component Design System",
      concept: "A comprehensive design system with reusable components, design tokens, and interaction patterns for modern web applications.",
      technologies: ["Figma", "React", "Storybook", "CSS Variables", "Design Tokens"],
      image:
        "https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details:
        "Created a scalable design system with consistent visual language, component library, and documentation. Implemented design tokens for colors, typography, and spacing across multiple products.",
      reasoning:
        "Built for consistency and efficiency, enabling rapid development while maintaining visual harmony across all digital products and platforms.",
      links: {
        live: "#",
        source: "#",
      },
    },
    {
      id: "ai-dashboard",
      category: "Artificial Intelligence",
      title: "Analytics Dashboard with ML Insights",
      concept: "Real-time analytics dashboard with machine learning-powered insights and predictive analytics.",
      technologies: ["Python", "TensorFlow", "React", "D3.js", "PostgreSQL"],
      image:
        "https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details:
        "Developed an intelligent analytics platform that processes large datasets and provides actionable insights through ML-powered predictions and data visualization.",
      reasoning:
        "Combined data processing capabilities with intuitive interface design to make complex analytics accessible and actionable for business decision-making.",
      links: {
        live: "#",
        source: "#",
      },
    },
    {
      id: "mobile-app-hybrid",
      category: "UI/UX Design",
      title: "Cross-Platform Mobile App",
      concept: "Hybrid mobile application with unified design system across iOS and Android platforms.",
      technologies: ["React Native", "TypeScript", "Redux", "Figma", "Firebase"],
      image:
        "https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details:
        "Designed and developed a cross-platform mobile application with consistent user experience across iOS and Android. Implemented unified design system and responsive layouts.",
      reasoning:
        "Created seamless mobile experience that maintains platform-specific conventions while providing consistent functionality and visual design across all devices.",
      links: {
        live: "#",
        source: "#",
      },
    },
  ]);

export const capabilityColumns = z
  .array(contentBlockSchema)
  .parse([
    {
      eyebrow: "Full-Stack Engineering",
      title: "Modern web systems with clean architecture.",
      text: "Robust applications built with MERN stack, RESTful APIs, and scalable backend logic that deliver performance and maintainability for your digital products.",
    },
    {
      eyebrow: "AI Integration",
      title: "Intelligent features that enhance user experience.",
      text: "Machine learning models, NLP systems, and data-driven insights integrated seamlessly into web applications to create smarter, more responsive digital experiences.",
    },
    {
      eyebrow: "UI/UX Design",
      title: "Interfaces that balance precision with instinct.",
      text: "Visually clear and user-sensitive designs that create contemporary, technically grounded products with calm and controlled aesthetics.",
    },
  ]);

export const journeyEntries = z
  .array(journeyEntrySchema)
  .parse([
    {
      year: "2024-Present",
      title: "Master's in AI & Data Science",
      text: "Advanced studies in Artificial Intelligence and Data Science, focusing on machine learning applications and intelligent system design for next-generation digital solutions.",
      phase: 2,
    },
    {
      year: "2022-2024",
      title: "Bachelor's in Information Technology",
      text: "Undergraduate studies covering web development, database systems, and software engineering fundamentals that provide the technical foundation for modern digital products.",
      phase: 1,
    },
    {
      year: "2023-2024",
      title: "Full-Stack Development Focus",
      text: "Specialization in MERN stack development, building e-commerce platforms and AI-powered web applications with modern architecture for scalable business solutions.",
      phase: 3,
    },
    {
      year: "2023",
      title: "AI Integration Projects",
      text: "Development of hate detection platform for Algerian dialect using fine-tuned machine learning models and NLP techniques to address regional language processing challenges.",
      phase: 4,
    },
  ]);

export const labExperiments = z
  .array(labExperimentSchema)
  .parse([
    {
      title: "Dialect-Specific NLP Models",
      text: "Fine-tuning language models for regional dialects and low-resource languages to create more inclusive and accurate hate detection systems.",
    },
    {
      title: "Real-Time AI Web Interfaces",
      text: "Building responsive frontends that seamlessly integrate machine learning predictions with smooth user interactions for intelligent digital experiences.",
    },
    {
      title: "Automation Bot Architectures",
      text: "Designing scalable bot systems for messaging platforms with intelligent response generation and workflow automation to enhance business efficiency.",
    },
  ]);

export const certificates = z
  .array(certificateSchema)
  .parse([
    {
      title: "Machine Learning Engineering for Production (MLOps) Specialization",
      issuer: "DeepLearning.AI",
      date: "2025",
      credentialId: "DLAI-MLOPS-2025",
      credentialUrl: "#",
    },
    {
      title: "Advanced React and Redux",
      issuer: "Meta",
      date: "2024",
      credentialId: "META-REACT-2024",
      credentialUrl: "#",
    },
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialId: "AWS-SA-2024",
      credentialUrl: "#",
    },
    {
      title: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "2023",
      credentialId: "GOOGLE-TF-2023",
      credentialUrl: "#",
    },
  ]);

export const socialLinks = z
  .array(socialLinkSchema)
  .parse([
    { label: "Email", value: "amjedbellir03@gmail.com", href: "mailto:amjedbellir03@gmail.com" },
    { label: "Phone", value: "+213 556 03 83 31", href: "tel:+213556038331" },
    { label: "LinkedIn", value: "linkedin.com/in/amdjed-bellir", href: "https://linkedin.com/in/amdjed-bellir" },
  ]);
