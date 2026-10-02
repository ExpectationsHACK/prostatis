import "server-only";
import type { Milestone } from "@/lib/learning/engine";
import type { Lesson, Question } from "../types";
import agentsPersonasKb from "./agents-personas-kb";
import aiDevSetup from "./ai-dev-setup";
import automationsMakeZapierN8n from "./automations-make-zapier-n8n";
import bookingSystems from "./booking-systems";
import buildBusinessSite from "./build-business-site";
import capstone from "./capstone";
import coldOutreach from "./cold-outreach";
import connectTheSystem from "./connect-the-system";
import contentSeoAudit from "./content-seo-audit";
import deliverGetPaid from "./deliver-get-paid";
import deployDomain from "./deploy-domain";
import designBrandKit from "./design-brand-kit";
import findProspects from "./find-prospects";
import landingPages from "./landing-pages";
import layoutsWireframesCopy from "./layouts-wireframes-copy";
import leadMagnetsQualification from "./lead-magnets-qualification";
import localSeoGbp from "./local-seo-gbp";
import mapWorkflows from "./map-workflows";
import monitoringHandover from "./monitoring-handover";
import onlineStorePaystack from "./online-store-paystack";
import packageForClient from "./package-for-client";
import portfolioSite from "./portfolio-site";
import proposalsPricing from "./proposals-pricing";
import responsiveFastAccessible from "./responsive-fast-accessible";
import seoKeywordsOnpage from "./seo-keywords-onpage";
import webAppsAuthDb from "./web-apps-auth-db";
import whatsappBotsCsAgents from "./whatsapp-bots-cs-agents";

/** Small deterministic PRNG so every learner (and every server) sees the same order. */
function seeded(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/**
 * Lessons are written with the answer wherever it reads naturally. Re-order each question's
 * options (stably, the same for everyone) so the right answer moves around the quiz and
 * its position carries no pattern.
 */
function shuffled(lessonId: string, q: Question, i: number): Question {
  const rand = seeded(`${lessonId}:${i}`);
  const others = q.options.map((_, k) => k).filter((k) => k !== q.answer);
  for (let k = others.length - 1; k > 0; k--) {
    const j = Math.floor(rand() * (k + 1));
    [others[k], others[j]] = [others[j], others[k]];
  }
  const start = Math.floor(seeded(lessonId)() * q.options.length);
  const target = (start + i * 3) % q.options.length;
  const order = [...others.slice(0, target), q.answer, ...others.slice(target)];
  return { ...q, options: order.map((k) => q.options[k]), answer: target };
}

/** Every written lesson, by id. Server-only: lessons hold the quiz answers. */
export const lessons: Record<string, Lesson> = Object.fromEntries(
  [agentsPersonasKb, aiDevSetup, automationsMakeZapierN8n, bookingSystems, buildBusinessSite, capstone, coldOutreach, connectTheSystem, contentSeoAudit, deliverGetPaid, deployDomain, designBrandKit, findProspects, landingPages, layoutsWireframesCopy, leadMagnetsQualification, localSeoGbp, mapWorkflows, monitoringHandover, onlineStorePaystack, packageForClient, portfolioSite, proposalsPricing, responsiveFastAccessible, seoKeywordsOnpage, webAppsAuthDb, whatsappBotsCsAgents].map((l) => [l.id, { ...l, quiz: l.quiz.map((q, i) => shuffled(l.id, q, i)) }]),
);

export function getLesson(id: string): Lesson | undefined {
  return lessons[id];
}

/** Every lesson's milestone badge, for the badge shelf and the "new badge" moment. */
export const milestones: Milestone[] = Object.values(lessons).map((l) => ({ lesson: l.id, name: l.celebrate.badge, desc: l.celebrate.badgeDesc }));
