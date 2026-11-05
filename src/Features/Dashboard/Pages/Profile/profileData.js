import {
  Activity,
  AtSign,
  Briefcase,
  BriefcaseBusiness,
  CircleHelp,
  Code,
  DollarSign,
  FileText,
  Gift,
  Globe,
  Home,
  LockKeyhole,
  MessageSquare,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  Trophy,
  Wallet,
  Zap,
} from 'lucide-react'

// Tabs shown across the top of the profile body.
// Each tab maps to an icon — non-Overview tabs render a placeholder state
// until you wire them to real data.
export const profileTabs = [
  { label: 'Overview', icon: Home },
  { label: 'Bounties', icon: Target },
  { label: 'Hackathons', icon: Trophy },
  { label: 'Grants', icon: BriefcaseBusiness },
  { label: 'Activity', icon: Activity },
  { label: 'Reviews', icon: MessageSquare },
]

// Descriptive copy shown on the placeholder state for each non-Overview tab.
export const tabDescriptions = {
  Bounties:
    'Your active, submitted and completed bounty work will appear here.',
  Hackathons:
    'Hackathons joined and their submission progress will appear here.',
  Grants: 'Grant applications and funding activity will appear here.',
  Activity: 'Recent profile and platform activity will appear here.',
  Reviews: 'Feedback and ratings from clients will appear here.',
}

// Featured work cards. Replace `image` with real project image URLs or
// local imports from src/Assets when you have them.
export const featuredProjects = [
  {
    title: 'DeFi Yield Optimizer',
    category: 'DeFi',
    description: 'Autonomous protocol for optimizing yield farming on Solana.',
    image:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'DAO Governance Hub',
    category: 'DAO',
    description: 'A dashboard for managing proposals and voting for DAOs.',
    image:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'NFT Marketplace UI',
    category: 'NFT',
    description: 'Modern NFT marketplace UI built with React and Tailwind.',
    image:
      'https://images.unsplash.com/photo-1646469829162-7f3f9a4f5e4b?auto=format&fit=crop&w=900&q=85',
  },
]

// Skill chips shown under the bio.
export const skills = [
  'Solidity',
  'Smart Contract',
  'React',
  'TypeScript',
  'Web3.js',
  'Next.js',
  'Ethers.js',
  'Hardhat',
  'Tailwind CSS',
  'IPFS',
]

// Top skills with progress bars (right sidebar).
export const topSkills = [
  { name: 'Solidity', score: 95 },
  { name: 'React', score: 81 },
  { name: 'TypeScript', score: 90 },
  { name: 'Web3.js', score: 95 },
  { name: 'DeFi', score: 89 },
]

// Compact skill tags shown inline in the profile header.
export const skillTags = [
  'Solidity',
  'Smart Contract',
  'React',
  'TypeScript',
  'Web3.js',
  'DeFi',
  'UI/UX',
  '+3',
]

// Badges grid (right sidebar).
export const badges = [
  { name: 'Top Performer', icon: Zap, style: 'bg-blue-50 text-blue-600' },
  {
    name: 'Verified Builder',
    icon: ShieldCheck,
    style: 'bg-violet-50 text-violet-600',
  },
  {
    name: 'Security Expert',
    icon: ShieldCheck,
    style: 'bg-emerald-50 text-emerald-700',
  },
  { name: 'DeFi Specialist', icon: Wallet, style: 'bg-cyan-50 text-cyan-700' },
  {
    name: '10+ Bounties',
    icon: Sparkles,
    style: 'bg-fuchsia-50 text-fuchsia-600',
  },
  { name: '5 Star Rating', icon: Star, style: 'bg-orange-50 text-orange-600' },
]

// Social link buttons. lucide-react v1.25 dropped brand icons (Github/Twitter/
// Linkedin), so we use generic stand-ins: Code (GitHub), AtSign (Twitter/X),
// Briefcase (LinkedIn), Globe (website). Replace hrefs with the user's real
// profiles when wired.
export const socialLinks = [
  { label: 'GitHub', icon: Code, href: 'https://github.com' },
  { label: 'Twitter', icon: AtSign, href: 'https://twitter.com' },
  { label: 'LinkedIn', icon: Briefcase, href: 'https://linkedin.com' },
  { label: 'Website', icon: Globe, href: 'https://example.com' },
]

// Fallback stats shown in the profile header until the dashboard-stats API
// returns real numbers. Shape matches what ProfileCard expects.
export const profileStatsFallback = [
  { value: '24', label: 'Bounties Completed' },
  { value: '$18,450', label: 'Total Earned' },
  { value: '4.9', label: 'Average Rating', isRating: true },
  { value: '97%', label: 'Success Rate' },
  { value: '18', label: 'Reviews' },
  { value: '13', label: 'Repeat Clients' },
]

// Settings list shown at the bottom of the Overview tab. Each row expands
// to reveal its description; clicking "Manage" is a frontend placeholder.
export const settingsItems = [
  {
    title: 'Account & security',
    description: 'Manage your account password and account security.',
    icon: LockKeyhole,
  },
  {
    title: 'Preference',
    description: 'Manage your account preferences and personalization.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Privacy & security',
    description: 'Control your privacy and security settings.',
    icon: ShieldCheck,
  },
  {
    title: 'Help & support',
    description: 'Get help and find answers to common questions.',
    icon: CircleHelp,
  },
  {
    title: 'Notifications',
    description: 'Manage how and when you receive notifications.',
    icon: Gift,
  },
]
