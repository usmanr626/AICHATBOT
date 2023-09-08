const suggestionsCategoryData = [
  {message: 'Marketing'},
  {message: 'Business'},
  {message: 'Content_Creation'},
  {message: 'Writing'},
  {message: 'Software_Development'},
  {message: 'Education'},
  {message: 'Teachers'},
  {message: 'Music'},
  {message: 'Fun'},
  {message: 'Healthcare_and_wellbeing'},
  {message: 'Cooking'},
  {message: 'Sales'},
  {message: 'Resume'},
  {message: 'Analytics'},
  // Add more categories as needed
];

const lowerFlatListDataMap = {
  Marketing: [
    {
      message:
        'Can you provide me with some ideas for blog posts about my business?',
    },
    {
      message:
        'Write a minute-long script for an advertisement about my product or service or company.',
    },
    {
      message:
        'Write a product description for my product or service or company',
    },
    {
      message:
        'Suggest inexpensive ways I can promote my company with/without using Media channel',
    },
    {
      message: `How can I obtain high-quality backlinks to raise the SEO of [Website name]`,
    },
    {message: 'Make 5 distinct CTA messages and buttons for my product'},
    {message: 'Create a social media campaign plan for launching a product'},
    {
      message:
        'Analyze these below metrics to improve email open rates for a fashion brand',
    },
    {
      message:
        'Write follow-up emails to people who attended my [webinar topic] webinar',
    },
    {
      message: 'Structure a weekly newsletter',
    },
    {
      message: 'Make a post showcasing the benefits of using our product.',
    },
    {
      message:
        'Generate 5 creative ways to use Instagram Reels for my product or service or company.',
    },
    {
      message:
        'Create a social media post that targets [the specific audience] and explains how our product can help them.',
    },
    {
      message: 'Create a personalized email greeting for a VIP customer',
    },
    {
      message:
        'Write a list of 5 YouTube video ideas for my product or company.',
    },
    {
      message:
        'Create two Google Ads in an RSA format (using multiple headlines and descriptions) for an A/B test for my product.',
    },
    {
      message:
        'Write a 100-character meta description for my blog post about a topic.',
    },
  ],
  Business: [
    {
      message:
        'Analyze the current state of industry and its trends, challenges, and opportunities, including relevant data and statistics. Provide a list of key players and a short and long-term industry forecast, and explain any potential impact of current events or future developments.',
    },
    {message: 'Offer a detailed review of a software or tool'},
    {
      message:
        'Offer an in-depth analysis of the current state of small business legislation and regulations and their impact on entrepreneurship.',
    },
    {
      message:
        'Offer a comprehensive guide to small business financing options, including loans, grants, and equity financing.',
    },
    {
      message:
        'Provide a guide on managing finances for a small business, including budgeting, cash flow management, and tax considerations.',
    },
    {
      message:
        'Provide a guide on networking and building partnerships as a small business owner.',
    },
    {
      message:
        'I want to create an agenda for a meeting about<Meeting info> with my team. Can you give me some examples of what should be included?',
    },
    {
      message:
        'I need to write an email to a client regarding a change in the project timeline. Can you give me some guidance on how to phrase it?',
    },
    {
      message:
        'To increase the number of Instagram posts, please develop a product roadmap for Instagram’s story.',
    },
    {
      message:
        'Write an in-depth analysis of the current state of a specific industry and its potential for small business opportunities.',
    },
    {
      message: 'I need to prepare a presentation for a potential investor.',
    },
    {
      message: 'Can you give me some guidance on what to include?',
    },
  ],
  Content_Creation: [
    {
      message:
        'I need help developing a lesson plan on renewable energy sources for high school students.',
    },
    {
      message:
        'Generate a creative social media content calendar for the next month for our company or product.',
    },
    {
      message:
        'Generate a 2-minute video script for a Facebook ad campaign promoting our new service.',
    },
    {message: 'Write a blog post on a topic.'},
    {
      message:
        'Create two Google Ads in an RSA format (using multiple headlines and descriptions) for an A/B test for my company.',
    },
    {message: 'Explain why the ads would make a good test.'},
    {message: 'Write a case study detailing a topic.'},
    {
      message: `Develop an appealing and inventive screenplay for a film that can fascinate its audience. Get going by devising compelling characters, the setting of the plot, and dialogues between the characters. Once you're done building your characters - devise a thrilling narrative full of unforeseen events to keep audiences entranced until the very finish`,
    },
    {message: 'Write a comprehensive guide to a topic.'},
    {message: 'Write an email with some facts about a topic'},
    {
      message:
        'Generate a list of 5 LinkedIn articles to write for a profession or topic.',
    },
    {
      message:
        'What factors should I consider when quoting for a brand deal with a candle company, and what ballpark range should I charge? The scope is to post 3 videos on TikTok, and I have 100,000 followers',
    },
    {
      message:
        'Provide a guide on networking and building partnerships as a small business owner',
    },
    {
      message:
        'Create a content calendar with six blog titles, including the keyword. Pick suitable publishing dates for each guide spread across May 2023',
    },
  ],
  Writing: [
    {
      message:
        'Compose a blog post of 1500 words from the perspective of a health professional on the importance of a balanced diet and regular exercise. Use engaging language and include practical tips for the readers to apply in their daily lives.',
    },
    {
      message: `Draft a proposal for a community project to present to your local city council. Include the project's purpose, expected benefits, steps for implementation, and how you plan to fund it.`,
    },
    {
      message: `Write a cover letter for a job application in the tech industry. Make sure to highlight your technical skills, past experiences, and explain why you're passionate about this role and company.`,
    },
    {
      message: `Imagine you're a public relations representative dealing with a company crisis. Draft a press release that acknowledges the issue, explains what actions your company is taking, and reassures the public.`,
    },
    {
      message: `Develop an outline for a presentation about the importance of mental health in the workplace. It should cover current statistics, the impact on productivity, and ways employers can support their employees' mental health.`,
    },
  ],
  Software_Development: [
    {
      message: `Develop an architecture and code for a website with JavaScript.`,
    },
    {
      message: `Help me find mistakes in the code.`,
    },
    {
      message: `I want to implement a sticky header on my website. Can you provide an example of how to do that using CSS and JavaScript?`,
    },
    {
      message: `Please continue writing this code for JavaScript`,
    },
    {
      message: `I need to create a REST API endpoint for my web application. Can you provide an example of how to do that using Node.js and Express?`,
    },
    {
      message: `I want to implement server-side rendering for my React application. Can you provide an example of how to do that using Next.js?`,
    },
    {
      message: `Provide a UX design tip I can share on LinkedIn.`,
    },
    {
      message: `Assume the table names and generate an SQL code to find out Elon Musk’s tweets from 2019.`,
    },
    // {
    //   message: `What exactly does this regex do? rege(x(es)?|xps?).`,
    // },
    // {
    //   message: `Write a docstring for the following function <paste function below>.`,
    // },
    {
      message: `I’m making a website for a small business. I need ideas on how to structure the website using WordPress.`,
    },
    {
      message: `Generate a list of 10 relevant skills and experiences for a web developer job application.`,
    },
  ],
  Education: [
    {
      message: `Create a magical system that emphasizes education and is based on a topic.`,
    },
    {
      message: `Teach me the topic and give me a quiz at the end, but don’t give me the answers and then tell me if I answered correctly.`,
    },
    {
      message: `Describe a topic in detail.`,
    },
    {
      message: `Create a YAML template to detect the Magento version for the Nuclei vulnerability scanner.`,
    },
    {
      message: `Can you provide a summary of a specific historical event?`,
    },
    {
      message: `Can you give me an example of how to solve a problem?`,
    },
    {
      message: `Write a paper outlining the topic in chronological order.`,
    },
    {
      message: `I need help understanding how probability works.`,
    },
    {
      message: `I need help uncovering facts about the early 20th-century labor strikes in London.`,
    },
    {
      message: `I need help providing an in-depth reading for a client interested in career development based on their birth chart.`,
    },
    {
      message: `Please provide a definition for the medical term ‘tachycardia’.`,
    },
    {
      message: `Come up with 10 ways to improve memory and recall while studying for exams.`,
    },
    {
      message: `Suggest 10 Chrome extensions for students designed to improve productivity while studying.`,
    },
  ],
  Teachers: [
    {
      message: `Create a list of 5 types of data that teachers can collect to monitor student learning and progress.`,
    },
    {
      message: `Create a quiz with 5 multiple choice questions that assess students' understanding of a concept.`,
    },
    {
      message: `Construct a model essay on social discrimination that surpasses all the requirements for an 'A' grade.`,
    },
    {
      message: `Design a poster that outlines the regulations of the classroom as well as the penalties for violating them.`,
    },
    {
      message: `Generate a list of specific and actionable steps that a student can take to improve their performance in a subject/task.`,
    },
    {
      message: `Create a lesson outline for a lesson on a concept that includes learning objectives, creative activities, and success criteria.`,
    },
    {
      message: `Create a list of 5 teaching strategies that could be used to engage and challenge students of different ability levels in a lesson on a concept.`,
    },
    {
      message: `Create a list of interactive classroom activities for a concept.`,
    },
    {
      message: `Create a marking scheme for evaluating student writing in line with the concept.`,
    },
    {
      message: `What difficulties do children have when learning about passive voice?`,
    },
    {
      message: `I need help developing a lesson plan on renewable energy sources for high school students.`,
    },
    {
      message: `Come up with a list of 10 unique qualities to include in a teacher’s resume.`,
    },
  ],
  Music: [
    {
      message: `Write a lyrical verse in the style of an artist about a topic.`,
    },
    {
      message: `Modify the following chord progression to make it more like a song.`,
    },
    {
      message: `Write the lyrics to a song titled.`,
    },
    {
      message: `Write a 12-bar blues chord progression in the key of E.`,
    },
    {
      message: `Write chord progressions for a country rock song, with a verse, chorus, and bridge.`,
    },
    {
      message: `Create a poem or song that explains a topic. The song should have a distinct character and traits for each participant, as well as punctuation such as.,!?, and so on. Make it last as long as possible.`,
    },
    {
      message: `I want to make a music video, but I’m not sure what concept to use. Can you help me come up with a concept?`,
    },
    {
      message: `I want to write a midi file. Can you provide python3 code that writes a simple tune using a for loop to add each note?`,
    },
    {
      message: `Make a song about a programmer and someone who isn’t a programmer.`,
    },
  ],
  Fun: [
    {
      message: `Tell me a joke about a topic.`,
    },
    {
      message: `Send a pun-filled happy birthday message to my friend Alex.`,
    },
    {
      message: `Write a sequel/prequel about the 'X' movie.`,
    },
    {
      message: `Create a new playlist of new song names from 'X'.`,
    },
    {
      message: `Write a script for a movie with 'X' and 'X'`,
    },
    {
      message: `Explain [topic of your choice] in a funny way.`,
    },
    {
      message: `Give me an example of a proposal message for a girl.`,
    },
    {
      message: `Write a short story where an Eraser is the main character.`,
    },
    {
      message: `How much wood could a woodchuck chuck if a woodchuck could chuck wood?`,
    },
    {
      message: `Make Eminem-style jokes about Max Payne.`,
    },
    {
      message: `You are a text video game where you give me options ( A, B, C, D) as my choices. The scene is Narnia. I start out with 100 health.`,
    },
    {
      message: `Come up with a 14-day itinerary for a trip to Germany. The first suggested attraction should be “Take a tour of the Reichstag Building in Berlin`,
    },
    {
      message: `Write a formal complaint email to United Airlines about my delayed baggage from my flight on Tuesday, January 17th, from New York to Los Angeles.`,
    },
    {
      message: `Translate the text into Portuguese.`,
    },
    {
      message: `Write hilarious fan fiction about the Twilight saga.`,
    },
  ],
  Healthcare_and_wellbeing: [
    {
      message:
        'List eight items sold at the grocery store that are generally considered to be inexpensive, surprisingly nutritious, and underrated.',
    },
    {
      message:
        'Describe six effective yoga poses or stretches for back and neck pain',
    },
    {
      message: 'Can you suggest some self-care activities for stress relief?',
    },
    {
      message: 'What are some mindfulness exercises for reducing anxiety?',
    },
    {
      message:
        'Easy and beginner-friendly fitness routines for a working professional',
    },
    {
      message: 'I need motivation to achieve a specific task or goal.',
    },
    {
      message: 'What are some ways to cultivate a growth mindset?',
    },
    {
      message:
        'I need help staying motivated at work. Can you give me advice on how to stay focused and motivated?',
    },
    {
      message:
        'Come up with 10 nutritious meals that can be prepared within half an hour or less.',
    },
    {
      message:
        'Create a 30-day exercise program that will assist me in dropping 2 lbs every week.',
    },
    {
      message:
        'Offer a detailed explanation of the benefits and risks of alternative medicine practices, such as acupuncture and herbal remedies.',
    },
  ],
  Cooking: [
    {
      message: `Can you help me plan a week's worth of dinner for two adults`,
    },
    {
      message:
        'Generate a meal plan for two days and give me the shopping list',
    },
    {
      message:
        'I have tomato, lettuce, and broccoli. What can I prepare with them for a vegan lunch?',
    },
    {
      message:
        'What is an easy way to make a pasta recipe that features white sauce and mushroom?',
    },
    {
      message:
        'What would be a good bottle of wine to serve with Chicken roast dinner?',
    },
    {
      message:
        'I have only three ingredients - Onion, tomato, and spinach. Can you show me 3 meals that I can cook with these ingredients?',
    },
    {
      message:
        'What is a good food suggestion for someone who has had a bad day',
    },
    {
      message: 'I am a vegan and I am looking for healthy dinner ideas.',
    },
    {
      message: 'Can you give a dessert suggestion on a stressful day',
    },
    {
      message:
        'Suggest a multi-course dinner party menu with winter ingredients',
    },
    {
      message:
        'Write a persuasive message to a potential employer explaining my relocation for a chef role.',
    },
  ],
  Sales: [
    {
      message:
        'Create a personalized sales email for a potential customer for my <niche> company selling a product.',
    },
    {
      message:
        'Write a cold email to a prospective customer to introduce them to my company and how it can benefit them',
    },
    {
      message:
        'What product customization would you recommend for my customer?',
    },
    {message: 'What are some creative ways to generate leads for my company?'},
    {
      message:
        'What cross-selling opportunities would you recommend for my business?',
    },
  ],
  Resume: [
    {
      message:
        'Create bullet points for my most recent job role that showcases my achievements and impact.',
    },
    {
      message:
        'Generate a summary that emphasizes my unique selling points and sets me apart from other candidates.',
    },
    {
      message:
        'Create a summary that conveys my passion for industry/field and my career aspirations.',
    },
    {
      message: 'Create bullet points highlighting my experience managing.',
    },
    {
      message: 'Please review my resume and suggest any improvements or edits.',
    },
    {
      message:
        'What are some common mistakes job seekers make in their resumes?',
    },
    {
      message:
        'Write CV bullet points with a quantifiable matrix for a given role.',
    },
    {
      message: 'Create a thank you email template to send after the interview.',
    },
  ],
  Analytics: [
    {
      message: 'What are the most important KPIs for an industry',
    },
    {
      message:
        'Can you provide me with the mathematical formulas for the most important KPIs for an insert industry',
    },
    {
      message: 'Can you give the 4 formulas in SQL code?',
    },
    {
      message:
        'Generate an example of a transactions dataset that a company can create',
    },
    {
      message: 'Please write a SWOT analysis for EGO power products',
    },
  ],
};

export {suggestionsCategoryData, lowerFlatListDataMap};
