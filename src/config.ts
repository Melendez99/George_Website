// Single place to edit your personal details.
export const SITE = {
  name: 'GeorgeTheDeveloper',
  person: 'George Melody',
  title: 'GeorgeTheDeveloper | AI Automation Developer',
  description:
    'George Melody builds AI automation systems with n8n, Make.com, GoHighLevel and voice agents. Top Rated on Upwork. Based in Lagos, working with clients worldwide.',
  location: 'Lagos, Nigeria',
  email: 'melodygeorge99@gmail.com',
  whatsapp: '2349063498313', // digits only, with country code
  // Optional: URL of an n8n (or Make) webhook that receives contact form submissions. Set PUBLIC_FORM_WEBHOOK in Vercel.
  bookUrl: 'https://www.upwork.com/freelancers/georgem57',
  links: {
    upwork: 'https://www.upwork.com/freelancers/georgem57',
    linkedin: 'https://www.linkedin.com/in/george-melody',
    contra: 'https://contra.com/melody_george_edwwlp05',
    github: 'https://github.com/Melendez99',
    guild: 'https://thedevelopersguild.lovable.app/',
  },
  roles: ['n8n Expert', 'Make.com Automation', 'AI Voice Agents', 'GoHighLevel Systems', 'Claude + OpenAI Integrations'],
  stats: [
    { value: 100, suffix: '%', label: 'Upwork Job Success Score' },
    { text: 'Top Rated', label: 'on Upwork' },
    { text: 'n8n · Make · GHL', label: 'Core stack' },
  ] as Array<{ value?: number; suffix?: string; text?: string; label: string }>,
};
