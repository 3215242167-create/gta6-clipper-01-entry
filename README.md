[![make.fun bounty](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/3215242167-create/gta6-clipper-01-entry/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/3215242167-create/gta6-clipper-01-entry/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

# GTA 6 clipper entry by @lanerc

An entry for make.fun's [Clip GTA 6 for the most YouTube views](https://make.fun/bounty/gta6-clipper-01) bounty ($500 in USDC, 20 places, ranked by YouTube views at the deadline). The entry is a public YouTube Short; `VIDEO.json` names the video, and `main.ts` simply copies `VIDEO.json` to `/output` for the gate — that is all the program has to do.

## The clip

One moment, cut by an AI agent from TGG's "The First 1 Hour of GTA 6 Gameplay": the streamer's first look at Vice City (source 391.9–428.4s), chosen because it pairs a loudness spike with a genuine reaction — "Vice City? It looks good man, I was worried about how it was gonna look on PS5… Oh my god." The clip is a 1080×1920 vertical cut with:

- a hook box in the first 2.5 seconds: "HIS FIRST LOOK AT VICE CITY IN GTA 6"
- word-by-word burned captions with the current word highlighted (slurs masked)
- a pitch banner over the last ~6 seconds of the moment: "EARN MONEY MAKING CLIPS WITH AI — make.fun"
- a 3.5-second end card: "THIS CLIP WAS CUT BY AI / Make clips like this with AI and earn money on make.fun / make.fun/bounty/gta6-clipper-01"
- audio loudness-normalized to about −14 LUFS (true peak ≤ −1.5 dB); total length 40 seconds

Rendered with ffmpeg (center crop, PIL-generated overlays, ASS captions generated from word-level transcript timings).

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

Node 22, standard library only.

## License

MIT — see `LICENSE`.
