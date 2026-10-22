// Puts sound on the rendered videos:
//   prostatis-ad-N-<name>.mp4             voiceover + music (music ducks under the voice)
//   prostatis-ad-N-<name>-music-only.mp4  music only, for recording your own voiceover
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const FF = require("@ffmpeg-installer/ffmpeg").path;
const out = process.argv[2];
const names = ["1-the-skill", "2-no-coding", "3-cost", "4-phone", "5-businesses"];
const ads = (process.argv[3] ?? "0,1,2,3,4").split(",").map(Number);

for (const ad of ads) {
  const video = `silent/prostatis-ad-${names[ad]}.mp4`;
  const enc = ["-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart"];
  // Voice + music. The music is pulled down by the voice (sidechain ducking), then both are mixed and limited.
  execFileSync(FF, ["-y", "-loglevel", "error", "-i", video, "-i", `music/ad${ad}.wav`, "-i", `voice/ad${ad}.wav`, "-filter_complex",
    "[2:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,asplit=2[vo][sc];[1:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,volume=0.32[m];[m][sc]sidechaincompress=threshold=0.02:ratio=6:attack=15:release=350[md];" +
    "[md][vo]amix=inputs=2:duration=first:dropout_transition=0,volume=2,loudnorm=I=-14:TP=-1.5:LRA=9[a]",
    "-map", "0:v", "-map", "[a]", ...enc, `${out}/prostatis-ad-${names[ad]}.mp4`]);
  // Music only, a little quieter than full level so a voice recorded on top still sits clearly.
  execFileSync(FF, ["-y", "-loglevel", "error", "-i", video, "-i", `music/ad${ad}.wav`, "-filter_complex", "[1:a]loudnorm=I=-16:TP=-1.5:LRA=9[a]",
    "-map", "0:v", "-map", "[a]", ...enc, `${out}/prostatis-ad-${names[ad]}-music-only.mp4`]);
  console.log(`done ad ${ad + 1}`);
}
