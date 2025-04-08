# Landing Page Creation Plan

## 1. Information Gathering:

*   Use the `list_files` tool to get a better understanding of the project structure, focusing on the `src/app` and `public` directories to understand the existing site's theme and structure.
*   Use the `read_file` tool to examine the contents of key files like `src/app/page.tsx`, `src/app/layout.tsx`, `tailwind.config.js`, and `src/components/Navigation.tsx` to understand the site's design, layout, and navigation.

## 2. Detailed SEO Research with Perplexity MCP:

*   **Objective:** To identify SEO strategies and keywords that attract users searching for "computer help" and "long beach computer help" while strictly adhering to Google's advertising policies, specifically avoiding terms associated with "repair" or "technical support" and the prohibition of advertising for third-party technical support.
*   **Methodology:** Employ the Perplexity MCP server to conduct deep reasoning queries, focusing on semantic understanding and contextual relevance to bypass policy restrictions effectively.
*   **Questions for Perplexity MCP:**

    1.  "What are the top 10 keywords related to 'computer assistance' and 'Long Beach IT solutions' that comply with Google Ads policies and avoid triggering restrictions related to technical support or repair services?"
    2.  "How can I optimize a landing page for 'local computer experts' in Long Beach without using terms that violate Google's policy against advertising third-party tech support?"
    3.  "What are some effective SEO strategies for attracting users searching for 'computer troubleshooting' and 'PC problem solvers' that don't involve direct offers of technical repair or support?"
    4.  "Can you provide examples of successful Google Ads campaigns in the 'computer help' niche that have effectively navigated Google's policy restrictions and maintained compliance?"
    5.  "What are the best practices for creating a 'computer guidance' landing page that emphasizes educational content and self-help resources to avoid being flagged as a technical support provider?"
    6.  "How can I use schema markup to highlight the 'computer consultation' and 'IT guidance' aspects of my services to improve visibility without violating Google's advertising policies?"
    7.  "What types of content (e.g., blog posts, FAQs, video tutorials) can I include on a 'computer solutions' landing page to attract organic traffic and demonstrate expertise without offering direct technical support?"
    8.  "How can I build high-quality backlinks to a 'computer assistance' landing page using strategies that focus on providing valuable information and resources rather than promoting technical services?"
    9.  "What are the key performance indicators (KPIs) I should track in Google Analytics to measure the success of a 'computer help' landing page and identify areas for improvement while ensuring policy compliance?"
    10. "How can I A/B test different versions of a 'Long Beach computer experts' landing page to optimize its conversion rate while staying within the boundaries of Google's advertising guidelines?"
    11. "What are the most effective ways to use location-based keywords to target users in Long Beach searching for 'computer assistance' without triggering Google's restrictions on technical support advertising?"
    12. "How can I structure the content of a 'computer solutions' landing page to clearly differentiate between providing helpful information and offering direct technical support services?"
*   **Expected Outcomes:**

    *   A list of policy-compliant keywords and phrases.
    *   SEO strategies that focus on education, consultation, and guidance.
    *   Examples of successful landing pages and ad campaigns.
    *   Recommendations for content types and schema markup.
    *   Insights into building high-quality backlinks.
    *   A framework for tracking performance and A/B testing.

## 3. Detailed Landing Page Design and Development:

*   **File Creation:** Create a new page in the `src/app` directory, named `src/app/residential-business/page.tsx`. This file will house the code for the soft landing page.
*   **Theme Consistency:** The landing page's design will closely mirror the existing site's theme, utilizing the blue and orange color scheme defined in `tailwind.config.js`. This ensures a seamless user experience and maintains brand consistency.
*   **Layout Structure:** The landing page will feature a similar layout to the main landing page (`src/app/page.tsx`), including:

    *   **Hero Section:** A visually appealing hero section with a concise headline and a brief description of the services offered. The headline will incorporate the SEO keywords gathered from the Perplexity MCP server. The description will focus on the benefits of choosing LB Computer Help for computer assistance, emphasizing expertise, reliability, and customer satisfaction.
    *   **Services Section:** A section showcasing the services offered, using the `ServiceCard` component. The service descriptions will be carefully crafted to avoid terms like "repair" or "technical support," focusing instead on "computer assistance," "IT solutions," and "problem-solving."
    *   **About Section:** A brief "About Us" section highlighting LB Computer Help's experience and expertise in providing computer assistance to residential and business clients in Long Beach.
    *   **Testimonials Section:** A section featuring testimonials from satisfied clients, showcasing the positive experiences they've had with LB Computer Help's services.
    *   **Contact Form:** A contact form allowing visitors to easily request assistance or ask questions.
*   **Content Strategy:** The landing page's content will be informative and engaging, providing valuable information to visitors while avoiding any language that could be construed as offering direct technical support. The content will focus on:

    *   **Educational Resources:** Providing helpful tips and advice on computer maintenance, troubleshooting, and security.
    *   **Case Studies:** Showcasing successful examples of how LB Computer Help has helped clients solve their computer problems.
    *   **FAQs:** Answering frequently asked questions about computer assistance and IT solutions.
*   **Call to Action:** A clear and compelling call to action, such as "Get Computer Help Now," encouraging visitors to take the next step.
*   **Navigation Integration:** Add a link to the landing page in the site's navigation, under a new "Residential/Business" dropdown menu. This will make the landing page easily accessible to visitors. The `NavDropdown` component in `src/components/Navigation.tsx` will be used to create this new menu.
*   **Mobile Responsiveness:** The landing page will be fully responsive, ensuring it looks and functions perfectly on all devices.
*   **Accessibility:** The landing page will be designed with accessibility in mind, following WCAG guidelines to ensure it is usable by people with disabilities.

## 4. Testing and Optimization:

*   Test the landing page in Google PageSpeed Insights to ensure it loads quickly.
*   Test the landing page on different devices to ensure it is mobile-friendly.
*   Track the landing page's performance in Google Analytics.
*   A/B test different versions of the landing page to improve its conversion rate.

## 5. Documentation:

*   Document the entire process, including the SEO research, landing page design, and testing and optimization.

\`\`\`mermaid
graph TD
    A[Information Gathering] --> B(Detailed SEO Research with Perplexity MCP);
    B --> C(Detailed Landing Page Design and Development);
    C --> D[Testing and Optimization];
    D --> E(Documentation);
\`\`\`