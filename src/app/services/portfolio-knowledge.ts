export interface PortfolioFact {
  title: string;
  content: string;
  source: string;
  keywords: string[];
}

const portfolioFacts: PortfolioFact[] = [
  {
    title: 'Profile',
    content: 'Patrick Baxter is a full-stack web developer based in New York with over 15 years of experience. His work includes Angular and TypeScript front ends, back-end technologies, responsive interfaces, and recent AI integration.',
    source: 'About section',
    keywords: ['profile', 'background', 'developer', 'years', 'location']
  },
  {
    title: 'Intellishift experience',
    content: 'Patrick has worked as a Software Developer at Intellishift from October 2019 to the present in Commack, New York. His work includes fleet management software, Angular interfaces, AI-powered fleet analytics, and cross-functional collaboration.',
    source: 'Experience section',
    keywords: ['intellishift', 'fleet', 'analytics', 'employment', 'career', 'work history']
  },
  {
    title: 'DOOR3 experience',
    content: 'Patrick worked as a Senior Web Developer at DOOR3 Business Applications, Inc. from April 2012 to September 2019 in Manhattan, New York. His work included enterprise web applications, Drupal development, responsive accessible interfaces, and client collaboration.',
    source: 'Experience section',
    keywords: ['door3', 'door 3', 'drupal', 'employment', 'career', 'work history']
  },
  {
    title: 'National Event Connection experience',
    content: 'Patrick worked as a Jr. Web Developer and Content Manager at National Event Connection from March 2008 to April 2012 in Ronkonkoma, New York. He developed and maintained Drupal websites, built a company database system, worked on theming and UI, and managed testing and user feedback.',
    source: 'Experience section',
    keywords: ['national event connection', 'drupal', 'employment', 'career', 'work history']
  },
  {
    title: 'Frontend skills',
    content: 'The portfolio lists Angular, TypeScript, JavaScript, HTML5/CSS3/SCSS, RxJS, and responsive design under frontend development.',
    source: 'Skills section',
    keywords: ['frontend', 'front end', 'angular', 'typescript', 'javascript', 'html', 'css', 'scss', 'rxjs', 'skills', 'technology']
  },
  {
    title: 'Backend and CMS skills',
    content: 'The portfolio lists Node.js, Drupal, WordPress, PHP, RESTful APIs, MySQL, and MongoDB under backend and CMS skills.',
    source: 'Skills section',
    keywords: ['backend', 'back end', 'cms', 'node', 'drupal', 'wordpress', 'php', 'api', 'mysql', 'mongodb', 'skills', 'technology']
  },
  {
    title: 'Specialized skills',
    content: 'The portfolio lists AI integration, Git/version control, unit and end-to-end testing, CI/CD, WCAG accessibility, and Agile methodologies as advanced and specialized skills.',
    source: 'Skills section',
    keywords: ['ai', 'artificial intelligence', 'testing', 'accessibility', 'wcag', 'agile', 'continuous integration', 'skills', 'technology']
  },
  {
    title: 'Certifications',
    content: 'The portfolio lists Angular Developer Certification (2021), Certified Drupal Developer (2018), and Accessibility Compliance Training (WCAG 2.1).',
    source: 'Skills section',
    keywords: ['certification', 'certified', 'qualification', 'angular', 'drupal', 'accessibility']
  },
  {
    title: 'Education',
    content: 'The About section lists an Associate Degree in Computer Science.',
    source: 'About section',
    keywords: ['education', 'degree', 'computer science', 'college', 'study']
  },
  {
    title: 'AI development experience',
    content: 'The portfolio describes AI integration in enterprise applications at Intellishift from 2023 to the present, including AI-powered fleet analytics. It also lists personal AI projects from 2022 to the present using OpenAI API, Angular, and Node.js.',
    source: 'Experience section',
    keywords: ['ai', 'artificial intelligence', 'openai', 'machine learning', 'enterprise', 'experience']
  },
  {
    title: 'AI task management project',
    content: 'The portfolio describes a personal Angular task-management application using the OpenAI API for task prioritization and categorization, listed for 2023 to the present.',
    source: 'Projects section',
    keywords: ['project', 'task management', 'openai', 'angular', 'personal project']
  },
  {
    title: 'Fleet management dashboard project',
    content: 'The portfolio describes an Intellishift fleet dashboard, listed for 2022 to 2023, with vehicle tracking, maintenance schedules, performance metrics, real-time updates, and AI-powered fleet optimization insights.',
    source: 'Projects section',
    keywords: ['project', 'fleet', 'dashboard', 'intellishift', 'data visualization']
  },
  {
    title: 'E-commerce project',
    content: 'The portfolio describes a personal e-commerce platform, listed for 2021 to 2022, with payment processing, inventory and customer management, a responsive frontend, and an admin dashboard. Technologies listed include Angular, Node.js, MongoDB, Stripe, and Express.js.',
    source: 'Projects section',
    keywords: ['project', 'e-commerce', 'ecommerce', 'payment', 'inventory', 'angular', 'node', 'mongodb']
  },
  {
    title: 'NYC workflow application',
    content: 'The portfolio describes an internal Angular 7 workflow application for the NYC Department of Design and Construction, developed at DOOR3 from January to September 2019. It handled applications for new building and infrastructure projects.',
    source: 'Projects section',
    keywords: ['project', 'nyc', 'government', 'workflow', 'angular', 'door3', 'application']
  },
  {
    title: 'Contact information',
    content: 'The portfolio lists Patrick Baxter\'s email as baxterp159@gmail.com, his location as New York, and says his phone number is available upon request. It links to his LinkedIn profile at linkedin.com/in/patrick-baxter-20435b10/ and GitHub profile at github.com/sgtsaughter.',
    source: 'Contact section',
    keywords: ['contact', 'email', 'phone', 'location', 'linkedin', 'github', 'reach']
  },
  {
    title: 'Frameworks and platforms',
    content: 'The portfolio lists Angular, AngularJS, Drupal 8, Drupal 7, Drupal 6, WordPress, and Express.js among Patrick\'s frameworks and platforms.',
    source: 'Skills section',
    keywords: ['framework', 'platform', 'angularjs', 'drupal', 'wordpress', 'express', 'technology', 'skills']
  },
  {
    title: 'Development tools',
    content: 'The portfolio lists Git, VS Code, JIRA, Figma, Docker, Photoshop, and CI/CD pipelines among Patrick\'s tools.',
    source: 'Skills section',
    keywords: ['tool', 'tools', 'git', 'vs code', 'jira', 'figma', 'docker', 'photoshop', 'ci cd']
  },
  {
    title: 'Databases',
    content: 'The portfolio lists MySQL, MongoDB, MariaDB, and PostgreSQL among Patrick\'s database technologies.',
    source: 'Skills section',
    keywords: ['database', 'databases', 'mysql', 'mongodb', 'mariadb', 'postgresql', 'technology']
  },
  {
    title: 'Greenhill.com',
    content: 'At DOOR3, Patrick maintained Greenhill.com, a Drupal 7 site, including translation, right-to-left design, mobile support, and email delivery from September 2018 to January 2019.',
    source: 'Projects section',
    keywords: ['project', 'greenhill', 'drupal 7', 'translation', 'right to left']
  },
  {
    title: 'Peter G. Peterson Foundation',
    content: 'At DOOR3, Patrick maintained the Peter G. Peterson Foundation Drupal 7 website from September 2018 to January 2019.',
    source: 'Projects section',
    keywords: ['project', 'peter g peterson', 'foundation', 'drupal 7', 'maintenance']
  },
  {
    title: 'Peterson Healthcare Foundation',
    content: 'At DOOR3, Patrick maintained the Peterson Healthcare Foundation Drupal 7 website, including mobile support and email delivery, from September 2018 to January 2019.',
    source: 'Projects section',
    keywords: ['project', 'peterson healthcare', 'foundation', 'drupal 7', 'mobile', 'email']
  },
  {
    title: 'AIG Insurance Application',
    content: 'At DOOR3, Patrick implemented features and maintained AIG\'s internal insurance application from November 2017 to September 2018. The project used AngularJS, Bootstrap, HTML5, and SQL.',
    source: 'Projects section',
    keywords: ['project', 'aig', 'insurance', 'application', 'angularjs', 'sql']
  },
  {
    title: 'iFundWomen',
    content: 'At DOOR3, Patrick implemented features and maintained the iFundWomen WordPress website, and estimated and planned its Drupal 8 upgrade from January to November 2017.',
    source: 'Projects section',
    keywords: ['project', 'ifundwomen', 'wordpress', 'drupal 8', 'upgrade']
  },
  {
    title: 'Swarovski Water School',
    content: 'At DOOR3, Patrick developed and maintained the Swarovski Water School website for the company\'s water conservation initiative from April to October 2017.',
    source: 'Projects section',
    keywords: ['project', 'swarovski', 'water school', 'conservation', 'drupal']
  },
  {
    title: 'Bridge To Data',
    content: 'At DOOR3, Patrick implemented features and maintained the Bridge To Data Drupal 6 website, then planned and carried out its upgrade to Drupal 8 from November 2016 to September 2017.',
    source: 'Projects section',
    keywords: ['project', 'bridge to data', 'drupal 6', 'drupal 8', 'upgrade']
  },
  {
    title: 'Attune Insurance Application',
    content: 'At DOOR3, Patrick implemented new features and maintained the existing small-business insurance application for Attune Insurance Services from January to August 2017.',
    source: 'Projects section',
    keywords: ['project', 'attune', 'insurance', 'application', 'insurance app', 'small business']
  },
  {
    title: 'Hamilton Insurance Application Redesign',
    content: 'At DOOR3, Patrick redesigned an internal Hamilton Insurance Group application and created Android and iOS versions using Ionic from November 2016 to February 2017.',
    source: 'Projects section',
    keywords: ['project', 'hamilton', 'insurance', 'application', 'redesign', 'ionic', 'android', 'ios']
  },
  {
    title: 'Two Sigma Graphic Novel',
    content: 'At DOOR3, Patrick created an online graphic-novel reader for Two Sigma as a recruiting tool from August to November 2016.',
    source: 'Projects section',
    keywords: ['project', 'two sigma', 'graphic novel', 'reader', 'recruiting']
  },
  {
    title: 'Queens Library Website Redesign',
    content: 'At DOOR3, Patrick created a Drupal 8 prototype for a Queens Library website redesign from June to October 2016.',
    source: 'Projects section',
    keywords: ['project', 'queens library', 'website', 'redesign', 'drupal 8', 'prototype']
  },
  {
    title: 'WWE Slam City',
    content: 'At DOOR3, Patrick performed Drupal development and maintenance for the WWE Slam City website in March 2014.',
    source: 'Projects section',
    keywords: ['project', 'wwe', 'slam city', 'drupal']
  },
  {
    title: 'Trinity Wallstreet',
    content: 'At DOOR3, Patrick performed Drupal development and maintenance for the Trinity Wallstreet website in August 2013.',
    source: 'Projects section',
    keywords: ['project', 'trinity wallstreet', 'drupal']
  },
  {
    title: 'Weill Cornell Psychiatry Specialty Center',
    content: 'At DOOR3, Patrick performed Drupal development and maintenance for the Weill Cornell Psychiatry Specialty Center website in August 2013.',
    source: 'Projects section',
    keywords: ['project', 'weill cornell', 'psychiatry specialty center', 'drupal']
  },
  {
    title: 'The NeuGroup',
    content: 'At DOOR3, Patrick maintained The NeuGroup website and implemented new features and bug fixes in September 2012.',
    source: 'Projects section',
    keywords: ['project', 'neugroup', 'maintenance', 'features', 'bug fixes']
  },
  {
    title: 'WWE Community',
    content: 'At DOOR3, Patrick performed Drupal development and maintenance for the WWE Community website in September 2012.',
    source: 'Projects section',
    keywords: ['project', 'wwe', 'community', 'drupal']
  },
  {
    title: 'Biodex',
    content: 'At DOOR3, Patrick maintained the Biodex website using Drupal 7 in July 2012.',
    source: 'Projects section',
    keywords: ['project', 'biodex', 'drupal 7', 'maintenance']
  }
];

const stopWords = new Set([
  'a', 'about', 'an', 'and', 'any', 'are', 'at', 'be', 'can', 'did', 'do', 'does', 'for', 'from', 'have',
  'he', 'his', 'how', 'i', 'in', 'is', 'it', 'me', 'of', 'on', 'or', 'patrick', 'please',
  'tell', 'that', 'the', 'their', 'there', 'this', 'to', 'was', 'what', 'when', 'where', 'listed',
  'which', 'who', 'why', 'with', 'would', 'you', 'your'
]);

const retrievalIntentWords = new Set([
  'career', 'expertise', 'experienced', 'experience', 'job', 'professional', 'proficient',
  'skill', 'work', 'worked'
]);

function tokenize(text: string): string[] {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(token => token.length > 1 && !stopWords.has(token))
    .map(token => token.endsWith('ies') ? `${token.slice(0, -3)}y` : token.endsWith('s') ? token.slice(0, -1) : token);
}

function isBroadProfileQuestion(question: string): boolean {
  const asksAboutPatrick = /\b(?:patrick|he|his)\b/i.test(question);
  const asksForOverview = /\b(?:tell me about|who is|overview|background)\b/i.test(question);
  const asksAboutSpecificTopic = /\b(?:skills?|experience|work history|projects?|education|certifications?|contact|email|phone|career|companies)\b/i.test(question);
  return asksAboutPatrick && asksForOverview && !asksAboutSpecificTopic;
}

function isFirstJobQuestion(question: string): boolean {
  return /\b(?:first|earliest|started)\b.{0,30}\b(?:job|role|position|work)\b|\b(?:job|role|position)\b.{0,30}\b(?:first|earliest)\b/i.test(question);
}

export function isAdditionalInformationQuestion(question: string): boolean {
  return /\b(?:anything else|what else|what other|tell me more|more about (?:patrick|him|that))\b/i.test(question);
}

export function findAdditionalPortfolioFacts(previousBotMessages: string[], limit = 4): PortfolioFact[] {
  const answeredTitles = new Set(portfolioFacts
    .filter(fact => previousBotMessages.some(message => message.includes(`${fact.title}:`)))
    .map(fact => fact.title));

  return portfolioFacts
    .filter(fact => !answeredTitles.has(fact.title))
    .slice(0, limit);
}

export function findRelevantPortfolioFacts(question: string, limit = 4): PortfolioFact[] {
  if (isFirstJobQuestion(question)) {
    const firstJob = portfolioFacts.find(fact => fact.title === 'National Event Connection experience');
    return firstJob ? [firstJob] : [];
  }

  if (isBroadProfileQuestion(question)) {
    return portfolioFacts.filter(fact =>
      fact.title === 'Profile' || fact.title.endsWith('experience')
    ).slice(0, limit);
  }

  const questionTokens = [...new Set(tokenize(question.slice(0, 500)))];
  if (questionTokens.length === 0) {
    return [];
  }

  const specificTokens = questionTokens.filter(token => !retrievalIntentWords.has(token));
  const searchTokens = specificTokens.length > 0 ? specificTokens : questionTokens;

  const matches = portfolioFacts.map(fact => {
    const searchableText = tokenize(`${fact.title} ${fact.content} ${fact.keywords.join(' ')}`);
    const searchableTokens = new Set(searchableText);
    const matchingTokens = searchTokens.filter(token => searchableTokens.has(token));
    return { fact, matchingTokens, score: matchingTokens.length };
  }).filter(match => match.score > 0)
    .sort((first, second) => second.score - first.score);

  if (matches.length === 0) {
    return [];
  }

  const matchedQueryTokens = new Set(matches.flatMap(match => match.matchingTokens));
  if (searchTokens.length >= 3 && matchedQueryTokens.size / searchTokens.length < 0.2) {
    return [];
  }

  const topScore = matches[0].score;
  return matches
    .filter(match => match.score === topScore)
    .slice(0, limit)
    .map(match => match.fact);
}

export function answerUnlistedExperienceQuestion(question: string): string | null {
  if (!/\b(?:do|does|has|have|is|was|were|can)\b/i.test(question) ||
      !/\b(?:experience|experienced|skills?|proficient|expertise|work(?:ed)? with|know|knows)\b/i.test(question)) {
    return null;
  }

  const ignoredTerms = new Set([
    'career', 'does', 'do', 'experience', 'experienced', 'expertise', 'have', 'has', 'he', 'his',
    'know', 'knows', 'patrick', 'proficient', 'skill', 'work', 'worked', 'with', 'using', 'use'
  ]);
  const questionTerms = [...new Set(tokenize(question.slice(0, 500)))];
  const specificTerms = questionTerms.filter(term => !ignoredTerms.has(term));
  const portfolioTerms = new Set(portfolioFacts.flatMap(fact => tokenize(`${fact.title} ${fact.content} ${fact.keywords.join(' ')}`)));
  const unlistedTerms = specificTerms.filter(term => !portfolioTerms.has(term));

  if (unlistedTerms.length === 0) {
    return null;
  }

  const subject = unlistedTerms.map(term => `${term[0].toUpperCase()}${term.slice(1)}`).join(', ');
  return `The portfolio does not list ${subject} among Patrick's skills or experience, so I can't confirm experience with it.`;
}
