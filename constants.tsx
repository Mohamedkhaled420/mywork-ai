
import { MBTIQuestion, TKIQuestion, TKIStyle, MBTIPersonalityType } from './types';
import { Sparkles, Users, Scale, MessageCircle, Lightbulb, Zap, ShieldQuestion, Brain } from 'lucide-react'; // Example icons

export const MBTI_QUESTIONS: MBTIQuestion[] = [
  { id: 'm1', text: 'I prefer to focus on the outer world of people and things.', dimension: 'E/I', polePositive: 'E' },
  { id: 'm2', text: 'I get energized by spending time alone.', dimension: 'E/I', polePositive: 'I' },
  { id: 'm3', text: 'I am more interested in what is actual and real.', dimension: 'S/N', polePositive: 'S' },
  { id: 'm4', text: 'I am more interested in future possibilities and insights.', dimension: 'S/N', polePositive: 'N' },
  { id: 'm5', text: 'I make decisions based on logic and objective analysis.', dimension: 'T/F', polePositive: 'T' },
  { id: 'm6', text: 'I make decisions based on values and impact on people.', dimension: 'T/F', polePositive: 'F' },
  { id: 'm7', text: 'I like my life to be planned and organized.', dimension: 'J/P', polePositive: 'J' },
  { id: 'm8', text: 'I prefer to be flexible and spontaneous.', dimension: 'J/P', polePositive: 'P' },
  { id: 'm9', text: 'When in a group, I often initiate conversations.', dimension: 'E/I', polePositive: 'E' },
  { id: 'm10', text: 'I tend to focus on the details rather than the big picture.', dimension: 'S/N', polePositive: 'S' },
  { id: 'm11', text: 'I value fairness and justice above compassion.', dimension: 'T/F', polePositive: 'T' },
  { id: 'm12', text: 'I like to keep my options open and adapt as I go.', dimension: 'J/P', polePositive: 'P' },
];

export const MBTI_DESCRIPTIONS: Record<MBTIPersonalityType, string> = {
  ISTJ: "Quiet, serious, earn success by thoroughness and dependability. Practical, matter-of-fact, realistic, and responsible.",
  ISFJ: "Quiet, friendly, responsible, and conscientious. Committed and steady in meeting their obligations.",
  INFJ: "Seek meaning and connection in ideas, relationships, and material possessions. Want to understand what motivates people.",
  INTJ: "Have original minds and great drive for implementing their ideas and achieving their goals. Quickly see patterns.",
  ISTP: "Tolerant and flexible, quiet observers until a problem appears, then act quickly to find workable solutions.",
  ISFP: "Quiet, friendly, sensitive, and kind. Enjoy the present moment, what's going on around them.",
  INFP: "Idealistic, loyal to their values and to people who are important to them. Want an external life that is congruent with their values.",
  INTP: "Seek to develop logical explanations for everything that interests them. Theoretical and abstract, interested more in ideas.",
  ESTP: "Flexible and tolerant, they take a pragmatic approach focused on immediate results. Theories and conceptual explanations bore them.",
  ESFP: "Outgoing, friendly, and accepting. Exuberant lovers of life, people, and material comforts.",
  ENFP: "Warmly enthusiastic and imaginative. See life as full of possibilities. Make connections between events and information very quickly.",
  ENTP: "Quick, ingenious, stimulating, alert, and outspoken. Resourceful in solving new and challenging problems.",
  ESTJ: "Practical, realistic, matter-of-fact. Decisive, quickly move to implement decisions. Organize projects and people.",
  ESFJ: "Warmhearted, conscientious, and cooperative. Want harmony in their environment, work with determination to establish it.",
  ENFJ: "Warm, empathetic, responsive, and responsible. Highly attuned to the emotions, needs, and motivations of others.",
  ENTJ: "Frank, decisive, assume leadership readily. Quickly see illogical and inefficient procedures and policies.",
};

export const TKI_QUESTIONS: TKIQuestion[] = [
  { id: 't1', statementA: "I am usually firm in pursuing my goals.", styleA: TKIStyle.Competing, statementB: "I try to soothe the other's feelings and preserve our relationship.", styleB: TKIStyle.Accommodating },
  { id: 't2', statementA: "I try to find a compromise solution.", styleA: TKIStyle.Compromising, statementB: "I attempt to deal with all of his/her and my concerns.", styleB: TKIStyle.Collaborating },
  { id: 't3', statementA: "I try to avoid creating unpleasantness for myself.", styleA: TKIStyle.Avoiding, statementB: "I sometimes sacrifice my own wishes for the wishes of the other person.", styleB: TKIStyle.Accommodating },
  { id: 't4', statementA: "I feel that differences are not always worth worrying about.", styleA: TKIStyle.Avoiding, statementB: "I make some effort to get my way.", styleB: TKIStyle.Competing },
  { id: 't5', statementA: "I consistently seek the other's help in working out a solution.", styleA: TKIStyle.Collaborating, statementB: "I try to do what is necessary to avoid tensions.", styleB: TKIStyle.Avoiding },
  { id: 't6', statementA: "I propose a middle ground.", styleA: TKIStyle.Compromising, statementB: "I press to get my points made.", styleB: TKIStyle.Competing },
  { id: 't7', statementA: "I might try to win the other person over to my side.", styleA: TKIStyle.Competing, statementB: "I try to find a solution that satisfies us both.", styleB: TKIStyle.Collaborating },
  { id: 't8', statementA: "I try to postpone the issue until I have had some time to think it over.", styleA: TKIStyle.Avoiding, statementB: "I give up some points in exchange for others.", styleB: TKIStyle.Compromising },
  { id: 't9', statementA: "I am almost always willing to accommodate the other person's wishes.", styleA: TKIStyle.Accommodating, statementB: "I look for the 'give and take' so that a compromise can be made.", styleB: TKIStyle.Compromising },
  { id: 't10', statementA: "I am firm in defending my position.", styleA: TKIStyle.Competing, statementB: "I try to show the logic and benefits of my position.", styleB: TKIStyle.Collaborating }, // Note: Both seem assertive. Adjusted for distinction.
  { id: 't11', statementA: "If it makes other people happy, I am willing to go along with their ideas.", styleA: TKIStyle.Accommodating, statementB: "I will actively work to find a solution that addresses everyone's needs.", styleB: TKIStyle.Collaborating },
  { id: 't12', statementA: "I'd rather not get involved in disagreements.", styleA: TKIStyle.Avoiding, statementB: "I'm willing to negotiate to find a fair outcome.", styleB: TKIStyle.Compromising },
];

export const TKI_DESCRIPTIONS: Record<TKIStyle, string> = {
  [TKIStyle.Competing]: "Assertive and uncooperative. Pursues own concerns at the other person's expense. Power-oriented.",
  [TKIStyle.Accommodating]: "Unassertive and cooperative. Neglects own concerns to satisfy the concerns of the other person. Element of self-sacrifice.",
  [TKIStyle.Avoiding]: "Unassertive and uncooperative. Does not immediately pursue own concerns or those of the other person. Sidesteps issues.",
  [TKIStyle.Collaborating]: "Assertive and cooperative. Attempts to work with others to find some solution that fully satisfies their concerns. Problem-solving.",
  [TKIStyle.Compromising]: "Intermediate in both assertiveness and cooperativeness. Aims to find an expedient, mutually acceptable solution that partially satisfies both parties. Splitting the difference.",
};

export const THEME_COLORS = {
  mbti: {
    primary: 'cyan-500',
    secondary: 'cyan-400',
    accentText: 'text-cyan-300',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-teal-500',
    icon: Brain,
  },
  tki: {
    primary: 'pink-500',
    secondary: 'pink-400',
    accentText: 'text-pink-300',
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-rose-500',
    icon: Users,
  },
  chatbot: {
    primary: 'purple-600',
    secondary: 'purple-500',
    accentText: 'text-purple-300',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-indigo-600',
    icon: MessageCircle,
  },
  home: {
    primary: 'blue-500', // A general futuristic blue
    secondary: 'blue-400',
    accentText: 'text-blue-300',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-indigo-500',
    icon: Sparkles,
  },
};

export const RATING_LABELS = [
  "Strongly Disagree", // 1
  "Disagree",          // 2
  "Slightly Disagree", // 3
  "Neutral",           // 4
  "Slightly Agree",    // 5
  "Agree",             // 6
  "Strongly Agree"     // 7
];

export const GEMINI_CHAT_SYSTEM_INSTRUCTION = "You are a helpful and insightful AI assistant specializing in personality psychology, learning styles, and career development. Your primary goal is to provide supportive, constructive, and professional guidance based on established psychological principles. When discussing personality types (like MBTI) or conflict styles (like TKI), explain concepts clearly and offer actionable advice. Avoid making definitive diagnoses or predictions. Focus on empowering users to understand themselves better and explore personal growth opportunities. Maintain a positive and encouraging tone.";
export const GEMINI_MODEL_CHAT = 'gemini-2.5-flash-preview-04-17';

