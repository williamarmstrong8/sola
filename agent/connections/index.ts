import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

// Index MCP: read-only search over Gong calls, call insights, thematic
// signals, Slack messages, and Salesforce accounts.
//
// Auth via the team-managed Vercel Connect connector `index.vercel.sh/index-mcp`
// (this `sola` project is already attached to it). Connect owns the Okta
// consent, encrypted token storage, and refresh (offline_access is requested).
//
// The connector is user-scoped (Subject Types: User), so this is a user-scoped
// connection: eve resolves the caller's token before each tool call and emits
// `authorization.required` the first time they use it, resuming after sign-in.
// Schedule/background runs have no user principal, so they can't use Index and
// would fail with `principal_required`.
//
// The Index deployment sits behind Vercel deployment protection, so every data
// request to the MCP endpoint needs the protection-bypass value (Connect only
// supplies the OAuth token; eve makes the actual call to `url`). Passed as a
// header here, sourced from env so the secret isn't committed. Set
// INDEX_MCP_BYPASS in the project env (local .env.local + Vercel envs).
export default defineMcpClientConnection({
  url: "https://index.vercel.sh/api/mcp",
  description:
    "Vercel Index knowledge base (read-only): search Gong call summaries, granular call insights and objections, thematic signals across accounts, Slack messages, and Salesforce accounts. Use for account research, customer sentiment, objections, and cross-account trends.",
  auth: connect("index.vercel.sh/index-mcp"),
  headers: {
    "x-vercel-protection-bypass": process.env.INDEX_MCP_BYPASS!,
  },
});
