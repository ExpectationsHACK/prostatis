// Anthropic first-party API list prices, USD per million tokens.
// Verify at https://claude.com/pricing before relying on these, last checked 30 Sept 2026.
export const modelPrices = [
  { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", input: 1, output: 5, note: "Fast and cheap: classification, extraction, simple chat" },
  { id: "claude-sonnet-5-5", name: "Claude Sonnet 5.5", input: 2, output: 10, note: "Best value for most building, writing and chatbot work" },
  { id: "claude-opus-5-5", name: "Claude Opus 5.5", input: 4, output: 20, note: "Hard coding and long agent runs" },
  { id: "claude-sonnet-5", name: "Claude Sonnet 5 (legacy)", input: 2, output: 10, note: "Previous Sonnet: move to Sonnet 5.5" },
  { id: "claude-opus-5", name: "Claude Opus 5 (legacy)", input: 5, output: 25, note: "Previous Opus: Opus 5.5 is cheaper" },
  { id: "claude-fable-5-1", name: "Claude Fable 5.1", input: 10, output: 50, note: "Most capable: reserve for the hardest problems" },
] as const;

// Used only until today's rate loads (the money tools fetch it live). Market rate 1 Oct 2026: about ₦1,329.
export const DEFAULT_NGN_PER_USD = 1330;
