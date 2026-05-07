import {
  Boxes,
  ContactRound,
  FileImage,
  GitBranch,
  LayoutDashboard,
  MessageSquareText,
  Route,
  Sparkles,
} from 'lucide-react'

export const prototypePrinciples = [
  'Recreate screen structure and UX from screenshots as closely as possible.',
  'Use shadcn/ui tokens for the visual baseline instead of copying brand styling blindly.',
  'Name screens, states, and flows clearly so the prototype can become a Figma map later.',
  'Keep each screen component isolated so we can swap screenshots into production-quality mockups.',
]

export const setupChecklist = [
  {
    title: 'Send a screenshot',
    description:
      'Share one platform screen at a time. Include what the user is trying to do on that screen when it matters.',
    icon: FileImage,
  },
  {
    title: 'Recreate the screen',
    description:
      'I will build a matching React screen with shadcn primitives, layout notes, and reusable sections.',
    icon: LayoutDashboard,
  },
  {
    title: 'Connect the flow',
    description:
      'As screens accumulate, navigation, decision points, and relationships will be documented in the app.',
    icon: GitBranch,
  },
  {
    title: 'Prepare for Figma',
    description:
      'Screens stay componentized and token-based so they can later be recreated or documented in Figma.',
    icon: Sparkles,
  },
]

export const starterScreens = [
  {
    name: 'Customer Details Search',
    status: 'Recreated',
    description:
      'Pharmacy search popup opens before customer details are populated.',
    icon: ContactRound,
  },
  {
    name: 'Platform Map',
    status: 'In progress',
    description: 'High-level relationship map between screens, actions, and roles.',
    icon: Route,
  },
  {
    name: 'Shared Components',
    status: 'Prepared',
    description: 'Reusable buttons, cards, tables, dialogs, sheets, tabs, and form controls.',
    icon: Boxes,
  },
  {
    name: 'Notes',
    status: 'Prepared',
    description: 'Questions, assumptions, and team discussion points for every recreated screen.',
    icon: MessageSquareText,
  },
]
