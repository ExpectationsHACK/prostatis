import {
  Bot, BriefcaseBusiness, CalendarCheck, CloudUpload, Crosshair, Crown, Eye, FileSearch, Flag, Flame, Footprints, Gem, Globe,
  GraduationCap, Handshake, LayoutTemplate, ListChecks, Magnet, Map as MapIcon, MapPin, Medal, MessagesSquare, Milestone, Mountain,
  MousePointerClick, Network, Palette, PenTool, Presentation, Rocket, Search, Send, ShieldCheck, ShoppingCart, Smartphone,
  Timer, Trophy, Wallet, Workflow, Zap, type LucideIcon,
} from "lucide-react";

/**
 * One icon per badge, never shared, so each badge is recognisable at a glance. Keyed by badge id;
 * lesson milestones are `m:<lesson id>`. A new lesson needs an entry here (badge-icons.test.ts checks).
 */
export const badgeIcons: Record<string, LucideIcon> = {
  first: Footprints,
  perfect: Crosshair,
  streak3: Flame,
  streak7: Zap,
  half: Milestone,
  xp1000: Gem,
  done: Trophy,
  cert: GraduationCap,
  week1: Flag,
  week2: MapIcon,
  week3: Mountain,
  week4: Crown,
  "m:design-brand-kit": Palette,
  "m:layouts-wireframes-copy": PenTool,
  "m:ai-dev-setup": Globe,
  "m:build-business-site": LayoutTemplate,
  "m:landing-pages": MousePointerClick,
  "m:deploy-domain": CloudUpload,
  "m:responsive-fast-accessible": Smartphone,
  "m:booking-systems": CalendarCheck,
  "m:online-store-paystack": ShoppingCart,
  "m:web-apps-auth-db": ShieldCheck,
  "m:seo-keywords-onpage": Search,
  "m:local-seo-gbp": MapPin,
  "m:content-seo-audit": FileSearch,
  "m:map-workflows": Timer,
  "m:automations-make-zapier-n8n": Workflow,
  "m:agents-personas-kb": Bot,
  "m:whatsapp-bots-cs-agents": MessagesSquare,
  "m:connect-the-system": Network,
  "m:portfolio-site": BriefcaseBusiness,
  "m:find-prospects": ListChecks,
  "m:cold-outreach": Send,
  "m:lead-magnets-qualification": Magnet,
  "m:proposals-pricing": Handshake,
  "m:package-for-client": Presentation,
  "m:deliver-get-paid": Wallet,
  "m:monitoring-handover": Eye,
  "m:capstone": Rocket,
};

export const badgeIcon = (id: string): LucideIcon => badgeIcons[id] ?? Medal;
