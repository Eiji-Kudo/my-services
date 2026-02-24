import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, "..", "assets");

const WIDTH = 1376;
const HEIGHT = 768;

function loadFont(name: string): ArrayBuffer {
  const buf = readFileSync(join(ASSETS_DIR, name));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

function buildThumbnail(title: string) {
  const ACCENT = "#0055FF";
  const ACCENT_LIGHT = "#E8F0FE";

  const waveBarCount = 32;
  const waveHeights = Array.from({ length: waveBarCount }, (_, i) => {
    const center = waveBarCount / 2;
    const normalizedDist = Math.abs(i - center) / center;
    const envelope = Math.cos(normalizedDist * Math.PI * 0.5);
    return Math.max(6, envelope * 72 + Math.sin(i * 1.2) * 12);
  });

  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAFCFF",
        fontFamily: "NotoSansJP",
        position: "relative",
        overflow: "hidden",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "-180px",
              right: "-120px",
              width: "520px",
              height: "520px",
              borderRadius: "50%",
              background: ACCENT_LIGHT,
              opacity: 0.7,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "-200px",
              left: "-80px",
              width: "440px",
              height: "440px",
              borderRadius: "50%",
              background: ACCENT_LIGHT,
              opacity: 0.5,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "0",
              left: "0",
              width: "8px",
              height: "100%",
              background: ACCENT,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "36px",
              left: "40px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: ACCENT,
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "18px",
                    fontWeight: 700,
                    color: ACCENT,
                    letterSpacing: "0.12em",
                  },
                  children: "AI CAST",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#94A3B8",
                    letterSpacing: "0.05em",
                    marginLeft: "4px",
                  },
                  children: "— PODCAST FOR ENGINEERS",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: "4px",
              marginBottom: "36px",
            },
            children: waveHeights.map((h) => ({
              type: "div",
              props: {
                style: {
                  width: "6px",
                  height: `${h}px`,
                  background: ACCENT,
                  borderRadius: "3px",
                },
              },
            })),
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: "62px",
              fontWeight: 700,
              color: "#0F172A",
              lineHeight: 1.4,
              textAlign: "center",
              maxWidth: "1060px",
              padding: "0 60px",
              letterSpacing: "-0.02em",
            },
            children: title,
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "36px",
              display: "flex",
              alignItems: "center",
              gap: "3px",
            },
            children: Array.from({ length: 120 }, (_, i) => {
              const progress = i / 120;
              const isPlayed = progress < 0.35;
              return {
                type: "div",
                props: {
                  style: {
                    width: "3px",
                    height: `${3 + Math.sin(i * 0.22) * 10 + Math.abs(Math.cos(i * 0.11)) * 6}px`,
                    background: isPlayed ? ACCENT : "#CBD5E1",
                    borderRadius: "2px",
                    opacity: isPlayed ? 0.7 : 0.35,
                  },
                },
              };
            }),
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "32px",
              right: "48px",
              fontSize: "15px",
              fontWeight: 400,
              color: "#94A3B8",
            },
            children: "EP.002 — 5 min",
          },
        },
      ],
    },
  };
}

export async function generateImage(
  title: string,
  outputPath: string = "output/podcast_thumbnail.png",
): Promise<void> {
  const fontBold = loadFont("NotoSansJP-Bold.ttf");
  const fontRegular = loadFont("NotoSansJP-Regular.ttf");

  const svg = await satori(buildThumbnail(title) as any, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "NotoSansJP", data: fontBold, weight: 700, style: "normal" },
      { name: "NotoSansJP", data: fontRegular, weight: 400, style: "normal" },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
  });
  const png = resvg.render().asPng();
  writeFileSync(outputPath, png);
  console.log(`${outputPath} を生成しました`);
}
