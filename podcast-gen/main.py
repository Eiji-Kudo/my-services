import sys

from src.generate_audio import generate_audio
from src.generate_image import generate_image


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python main.py <audio|image>")
        sys.exit(1)

    command = sys.argv[1]

    if command == "audio":
        script_path = sys.argv[2] if len(sys.argv) > 2 else "content/episode_001.md"
        generate_audio(script_path)
    elif command == "image":
        generate_image()
    else:
        print(f"Unknown command: {command}")
        print("Usage: python main.py <audio|image>")
        sys.exit(1)


if __name__ == "__main__":
    main()
