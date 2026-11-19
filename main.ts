// Entry point for the gta6-meme-x-01 submission.
//
// The grader drops this repository into a bot directory and points two
// environment variables at us:
//   MAKEFUN_BOT_DIR     where the bot's files live (default "/bot")
//   MAKEFUN_OUTPUT_DIR  where it collects the results (default "/output")
//
// Our whole job is to hand back the one deliverable this bounty asks for:
// the POST.json file that names the public X post carrying the meme.
// So: make sure the output directory exists, copy POST.json across, and
// read the copy back to prove it arrived byte-for-byte intact.
// Stay quiet on success; complain on stderr and exit 1 if anything fails.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function main() {
  const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

  const source = join(botDir, "POST.json");
  const target = join(outputDir, "POST.json");

  try {
    mkdirSync(outputDir, { recursive: true });
    copyFileSync(source, target);

    // A copy that silently truncates would sink the entry, so verify the
    // delivered bytes against the original before declaring success.
    const original = readFileSync(source);
    const delivered = readFileSync(target);
    if (!original.equals(delivered)) {
      console.error("POST.json copy does not match the original bytes");
      process.exit(1);
    }
  } catch (err) {
    console.error(`failed to deliver POST.json: ${err.message}`);
    process.exit(1);
  }
}

main();
