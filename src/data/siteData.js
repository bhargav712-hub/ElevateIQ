export const siteInfo = {
  name: 'ElevateIQ',
  tagline: 'Elevate Your Technical Leadership & Mastery',
  email: 'info@elevateiq.com',
  phone: '+1 (555) 123-4567',
  address: '123 Innovation Drive, Tech City, TC 10001',
};

export const courses = [
  {
    id: 1, title: 'Full Stack Web Development', duration: '6 Months', price: 2999, originalPrice: 4999,
    rating: 4.8, students: 1250, category: 'Development', imagePath: '/courses/fullstack.png',
    features: ['HTML/CSS/JS', 'React & Node.js', 'MongoDB & SQL', 'Deployment'],
    description: 'Master the art of building complete web applications from frontend to backend. This comprehensive program covers modern JavaScript frameworks, server-side programming, database management, and cloud deployment.',
    content: [
      'Frontend Development with React & Modern JS',
      'Backend APIs with Node.js & Express',
      'Database Design with MongoDB & PostgreSQL',
      'Authentication, Authorization & Security',
      'RESTful & GraphQL API Development',
      'CI/CD Pipelines & Cloud Deployment'
    ],
    syllabus: [
      { module: 'HTML5, CSS3 & JavaScript Fundamentals', topics: ['Semantic HTML', 'CSS Grid & Flexbox', 'ES6+ Features', 'DOM Manipulation'] },
      { module: 'React Ecosystem', topics: ['Components & Props', 'State Management', 'React Router', 'Hooks Deep Dive'] },
      { module: 'Node.js & Express', topics: ['REST APIs', 'Middleware', 'File Uploads', 'WebSockets'] },
      { module: 'Databases', topics: ['MongoDB Schemas', 'SQL Queries', 'ORM with Prisma', 'Caching with Redis'] },
      { module: 'DevOps & Deployment', topics: ['Docker Containers', 'AWS EC2/S3', 'GitHub Actions', 'Monitoring'] }
    ]
  },
  {
    id: 2, title: 'Data Science & Machine Learning', duration: '5 Months', price: 3499, originalPrice: 5499,
    rating: 4.7, students: 980, category: 'Data Science', imagePath: '/courses/datascience.png',
    features: ['Python & R', 'TensorFlow', 'Statistical Analysis', 'Deep Learning'],
    description: 'Dive into the world of data with our industry-driven curriculum. Learn to extract insights, build predictive models, and deploy ML solutions at scale.',
    content: [
      'Python for Data Analysis & Visualization',
      'Statistical Methods & Hypothesis Testing',
      'Supervised & Unsupervised Learning',
      'Neural Networks & Deep Learning',
      'NLP & Computer Vision Applications',
      'MLOps & Model Deployment'
    ],
    syllabus: [
      { module: 'Python & Data Wrangling', topics: ['NumPy & Pandas', 'Data Cleaning', 'Exploratory Analysis', 'Visualization with Matplotlib'] },
      { module: 'Machine Learning', topics: ['Regression & Classification', 'Ensemble Methods', 'Feature Engineering', 'Model Evaluation'] },
      { module: 'Deep Learning', topics: ['TensorFlow & Keras', 'CNNs for Images', 'RNNs for Sequences', 'Transfer Learning'] },
      { module: 'Data Engineering', topics: ['ETL Pipelines', 'Spark Basics', 'SQL for Analytics', 'Data Warehousing'] },
      { module: 'MLOps & Production', topics: ['Model Serving APIs', 'Docker for ML', 'A/B Testing', 'Monitoring Drift'] }
    ]
  },
  {
    id: 3, title: 'Cloud Architecture (AWS/Azure)', duration: '4 Months', price: 2499, originalPrice: 3999,
    rating: 4.6, students: 750, category: 'Cloud', imagePath: '/courses/cloud.png',
    features: ['AWS & Azure', 'DevOps CI/CD', 'Kubernetes', 'Terraform'],
    description: 'Become a cloud expert with hands-on training on AWS and Azure. Design scalable, secure, and cost-effective cloud infrastructures.',
    content: [
      'AWS Core Services (EC2, S3, RDS, Lambda)',
      'Microsoft Azure Solutions',
      'Infrastructure as Code with Terraform',
      'Container Orchestration with Kubernetes',
      'CI/CD with Jenkins & GitHub Actions',
      'Cloud Security & Compliance'
    ],
    syllabus: [
      { module: 'Cloud Fundamentals', topics: ['AWS Global Infrastructure', 'EC2 & Auto Scaling', 'S3 & Storage Classes', 'VPC & Networking'] },
      { module: 'Azure Services', topics: ['Azure VMs & App Services', 'Azure DevOps', 'Azure SQL & CosmosDB', 'Azure Functions'] },
      { module: 'Infrastructure as Code', topics: ['Terraform Basics', 'State Management', 'Modules & Providers', 'Pulumi Basics'] },
      { module: 'Kubernetes', topics: ['Pod & Deployments', 'Services & Ingress', 'Helm Charts', 'Monitoring with Prometheus'] },
      { module: 'Security & Cost Optimization', topics: ['IAM Policies', 'Encryption', 'Cost Calculators', 'Well-Architected Framework'] }
    ]
  },
  {
    id: 4, title: 'Mobile App Development', duration: '5 Months', price: 2799, originalPrice: 4499,
    rating: 4.5, students: 620, category: 'Development', imagePath: '/courses/mobile.png',
    features: ['React Native', 'Flutter', 'Firebase', 'App Store Deploy'],
    description: 'Build cross-platform mobile apps for iOS and Android using React Native and Flutter. Publish your apps to app stores with confidence.',
    content: [
      'React Native for iOS & Android',
      'Flutter & Dart Fundamentals',
      'State Management (Redux, Provider)',
      'Firebase Backend Integration',
      'App Store & Play Store Publishing',
      'Performance Optimization'
    ],
    syllabus: [
      { module: 'React Native Basics', topics: ['JSX & Components', 'Navigation', 'State & Props', 'Styling & Layout'] },
      { module: 'Flutter Development', topics: ['Dart Language', 'Widgets Tree', 'State Management', 'Animations'] },
      { module: 'Backend & APIs', topics: ['Firebase Auth', 'Cloud Firestore', 'REST APIs', 'Push Notifications'] },
      { module: 'Advanced Features', topics: ['Camera & Gallery', 'Maps & Location', 'Offline Storage', 'Background Tasks'] },
      { module: 'Publishing & Monetization', topics: ['App Store Connect', 'Google Play Console', 'In-App Purchases', 'AdMob'] }
    ]
  },
  {
    id: 5, title: 'Cybersecurity Fundamentals', duration: '3 Months', price: 1999, originalPrice: 3499,
    rating: 4.9, students: 510, category: 'Security', imagePath: '/courses/cybersecurity.png',
    features: ['Network Security', 'Ethical Hacking', 'Compliance', 'Incident Response'],
    description: 'Protect organizations from cyber threats. Learn ethical hacking, network defense, and compliance frameworks used by security professionals.',
    content: [
      'Network Security & Firewalls',
      'Ethical Hacking & Penetration Testing',
      'Web Application Security (OWASP)',
      'Incident Response & Forensics',
      'Compliance (GDPR, HIPAA, SOC2)',
      'SIEM & Threat Intelligence'
    ],
    syllabus: [
      { module: 'Network Security', topics: ['TCP/IP & OSI Model', 'Firewalls & IDS/IPS', 'VPNs & Encryption', 'Wireless Security'] },
      { module: 'Ethical Hacking', topics: ['Reconnaissance', 'Vulnerability Scanning', 'Exploitation', 'Post-Exploitation'] },
      { module: 'Web Security', topics: ['OWASP Top 10', 'SQL Injection', 'XSS & CSRF', 'Authentication Flaws'] },
      { module: 'Incident Response', topics: ['IR Framework', 'Digital Forensics', 'Malware Analysis', 'Reporting'] },
      { module: 'Governance & Compliance', topics: ['Risk Management', 'Security Policies', 'Audit Frameworks', 'Business Continuity'] }
    ]
  },
  {
    id: 6, title: 'UI/UX Design Masterclass', duration: '4 Months', price: 2199, originalPrice: 3799,
    rating: 4.4, students: 890, category: 'Design', imagePath: '/courses/uiux.png',
    features: ['Figma & Sketch', 'User Research', 'Prototyping', 'Design Systems'],
    description: 'Design stunning digital experiences that users love. Master design thinking, prototyping, and build a professional portfolio.',
    content: [
      'Design Thinking & User Research',
      'Figma & Advanced Prototyping',
      'Visual Design & Typography',
      'Design Systems & Component Libraries',
      'Usability Testing & Iteration',
      'Portfolio Building & Freelancing'
    ],
    syllabus: [
      { module: 'Foundations', topics: ['Color Theory', 'Typography Basics', 'Layout & Grids', 'Design Principles'] },
      { module: 'User Research', topics: ['User Interviews', 'Personas & Journeys', 'Competitive Analysis', 'Problem Framing'] },
      { module: 'Prototyping & Testing', topics: ['Low-Fi Wireframes', 'High-Fi Mockups', 'Interactive Prototypes', 'Usability Testing'] },
      { module: 'Design Systems', topics: ['Component Libraries', 'Design Tokens', 'Documentation', 'Handoff to Dev'] },
      { module: 'Career & Portfolio', topics: ['Case Studies', 'Portfolio Website', 'Freelance Platforms', 'Client Management'] }
    ]
  },
];

const avatar = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=150&bold=true`;

export const placements = [
  { id: 1, name: 'Sarah Johnson', role: 'Software Engineer at Google', package: '$120K', image: avatar('Sarah Johnson'), story: 'EduVance Pro transformed my career. The mentorship and placement support were incredible.' },
  { id: 2, name: 'Michael Chen', role: 'Data Scientist at Amazon', package: '$135K', image: avatar('Michael Chen'), story: 'The data science program was rigorous and industry-aligned. I was job-ready in 5 months.' },
  { id: 3, name: 'Priya Sharma', role: 'Cloud Architect at Microsoft', package: '$145K', image: avatar('Priya Sharma'), story: 'The cloud architecture course gave me hands-on experience with real-world projects.' },
  { id: 4, name: 'James Wilson', role: 'Product Designer at Apple', package: '$110K', image: avatar('James Wilson'), story: 'The UI/UX program helped me build an outstanding portfolio that got me hired.' },
];

export const hiringCompanies = [
  'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla', 'IBM',
  'Adobe', 'Salesforce', 'Oracle', 'Intel', 'Cisco', 'Uber', 'Airbnb', 'Spotify'
];

export const achievements = [
  { value: '15,000+', label: 'Students Trained' },
  { value: '92%', label: 'Placement Rate' },
  { value: '500+', label: 'Hiring Partners' },
  { value: '4.8/5', label: 'Student Rating' },
];

export const faqData = [
  { q: 'Who are these courses designed for?', a: 'Our courses are designed for beginners, working professionals looking to upskill, and career switchers. Each program has flexible prerequisites clearly mentioned in the syllabus.' },
  { q: 'What is the weekly time commitment?', a: 'Most courses require 10-15 hours per week including live sessions, self-paced modules, and project work. Weekend batch options are also available.' },
  { q: 'Will I get a certificate upon completion?', a: 'Yes, you will receive a industry-recognized certificate upon completing the course and final project. Certificates are verifiable online.' },
  { q: 'How does the placement assistance work?', a: 'Our placement cell provides resume reviews, mock interviews, LinkedIn optimization, and direct referrals to 200+ hiring partners. Placement support starts from month 3 of your program.' },
  { q: 'Can I switch courses after enrollment?', a: 'Yes, you can switch to any other course within the first 7 days at no additional cost. We want you to find the perfect fit for your career goals.' },
  { q: 'Are there any prerequisites for these courses?', a: 'Each course lists its prerequisites. Most beginner-friendly courses require only basic computer literacy. Advanced courses may require foundational knowledge.' },
];
