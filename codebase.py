from pathlib import Path
import re

# --- CONFIGURATION ---
PROJECT_ROOT = Path(__file__).resolve().parent
OUTPUT_FILE = PROJECT_ROOT / "codebase.md"

# Limit file size to prevent huge binaries from bloating the context
MAX_FILE_SIZE_KB = 150 
MAX_FILE_SIZE = MAX_FILE_SIZE_KB * 1024

# Directories to completely ignore
IGNORE_DIRS = {
    ".git", ".svn", ".hg",
    ".venv", "venv", "env",
    "node_modules", ".next", "dist", "build", "out",
    "coverage", ".cache", ".parcel-cache", ".turbo",
    "__pycache__", ".pytest_cache", ".mypy_cache",
    ".vscode", ".idea", "logs", "tmp", "temp",
    "uploads", "generated", "tests", # Assuming tests are separate or not needed for main context
}

# Specific files to ignore
IGNORE_FILES = {
    "codebase.md","project-plan.md", "techstack-and-hosting.md", # The output file itself
    ".env", ".env.local", ".env.development", ".env.production", # Secrets!
    ".gitignore", ".gitattributes",
    "package-lock.json", "pnpm-lock.yaml", "yarn.lock", "bun.lock", # Lock files are noise for logic understanding
    ".DS_Store", "Thumbs.db",
    "debug.log", "error.log", "server-out.log",
    "credentials.json", "service-account.json", "secrets.json",
    "CREDENTIALS.md", # Contains secrets
    "oldchat.md", # Historical chat noise
    "generate_placeholders.js", # One-time script
}

# File extensions to ignore (Binaries, Assets, Logs)
IGNORE_EXTENSIONS = {
    ".csv", ".xlsx", ".xls", ".db", ".sqlite", ".sqlite3",
    ".log", ".bak", ".tmp",
    ".zip", ".rar", ".7z", ".tar", ".gz",
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico", # Images are visual, not logical
    ".mp3", ".wav", ".mp4", ".webm", ".avi", ".mov", # Videos
    ".pdf",
    ".woff", ".woff2", ".ttf", ".otf", # Fonts
    ".pem", ".key", ".p12", ".pfx", ".jks", ".crt", ".cert", # Keys
}

# File extensions to INCLUDE (Source Code & Configs)
INCLUDE_EXTENSIONS = {
    ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", # Frontend/Backend JS
    ".py", ".pyi", # Scripts
    ".html", ".css", ".scss", ".sass", # Styles
    ".json", # Configs (package.json, tsconfig, etc.)
    ".yaml", ".yml", ".toml", ".ini", ".conf", # Configs
    ".md", ".txt", # Documentation
    ".sh", ".bat", ".cmd", ".ps1", # Build scripts
}

# Important root files that MUST be included even if they look like config
IMPORTANT_FILES = {
    "README.md", "HOWTORUN.md", "LICENSE",
    "Dockerfile", "Makefile",
    "package.json", # Crucial for dependencies
    "vite.config.js", # Crucial for frontend build understanding
    "tailwind.config.js", # Crucial for design system understanding
    "postcss.config.js",
    ".env.example", # Safe way to show required env vars
    "tsconfig.json", "eslint.config.mjs", "components.json",
}

# Language mapping for Markdown code blocks
LANGUAGE_MAP = {
    ".py": "python", ".js": "javascript", ".jsx": "jsx",
    ".ts": "typescript", ".tsx": "tsx", ".mjs": "javascript",
    ".cjs": "javascript", ".html": "html", ".css": "css",
    ".scss": "scss", ".sass": "sass", ".json": "json",
    ".yaml": "yaml", ".yml": "yaml", ".toml": "toml",
    ".ini": "ini", ".md": "markdown", ".sh": "bash",
    ".bat": "bat", ".cmd": "bat", ".ps1": "powershell",
}

# --- GLOBAL STATE ---
skipped_files = []
all_files = []
included_files = set()
ui_files = {} # Map component name to path
used_ui_components = set()

def rel(path):
    try:
        return path.relative_to(PROJECT_ROOT)
    except ValueError:
        return path

def add_skip(path, reason):
    item = str(rel(path))
    if not any(x[0] == item for x in skipped_files):
        skipped_files.append((item, reason))

def is_inside(path, directory_names):
    try:
        parts = rel(path).parts
    except ValueError:
        return False
    # Check if any part of the path (except the file itself) is in the ignore list
    return any(part in directory_names for part in parts[:-1])

def file_too_large(path):
    try:
        return path.stat().st_size > MAX_FILE_SIZE
    except OSError:
        return True

def is_secret_file(path):
    name = path.name.lower()
    if name in {".env", ".env.local", ".env.development", ".env.production", ".env.test"}:
        return True
    if path.suffix.lower() in {".pem", ".key", ".p12", ".pfx", ".jks"}:
        return True
    return False

def basic_skip(path):
    if path.resolve() == OUTPUT_FILE.resolve():
        return True, "generated output"
    if path.name in IGNORE_FILES:
        return True, "ignored file"
    if is_secret_file(path):
        return True, "secret/credential file"
    if is_inside(path, IGNORE_DIRS):
        return True, "ignored directory"
    if path.suffix.lower() in IGNORE_EXTENSIONS:
        return True, "binary/asset file"
    return False, ""

def is_normal_source_candidate(path):
    skip, _ = basic_skip(path)
    if skip:
        return False
    if path.name in IMPORTANT_FILES:
        return True
    if path.suffix.lower() not in INCLUDE_EXTENSIONS:
        return False
    if file_too_large(path):
        return False
    return True

def scan_project():
    candidates = []
    for path in PROJECT_ROOT.rglob("*"):
        if not path.is_file():
            continue
        
        skip, reason = basic_skip(path)
        if skip:
            if reason != "ignored directory":
                add_skip(path, reason)
            continue
            
        if path.name in IMPORTANT_FILES:
            candidates.append(path)
            continue
            
        if path.suffix.lower() not in INCLUDE_EXTENSIONS:
            add_skip(path, "unsupported file type")
            continue
            
        if file_too_large(path):
            try:
                size = path.stat().st_size / 1024
            except OSError:
                size = 0
            add_skip(path, f"too large ({size:.1f} KB > {MAX_FILE_SIZE_KB} KB)")
            continue
            
        candidates.append(path)
    return sorted(candidates, key=lambda x: str(rel(x)).lower())

def index_ui_components():
    """Find all potential UI components in client/src/components/ui"""
    ui_root = PROJECT_ROOT / "client" / "src" / "components" / "ui"
    if not ui_root.exists():
        return
    for path in ui_root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() in {".ts", ".tsx", ".js", ".jsx"}:
            if not file_too_large(path):
                ui_files[path.stem] = path

def read_text(path):
    try:
        return path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return ""

def find_used_ui_components():
    """Scan source code to find which UI components are actually imported"""
    index_ui_components()
    if not ui_files:
        return set()

    # Patterns for imports like: import { Button } from "@/components/ui/button"
    import_patterns = [
        r'@/components/ui/([A-Za-z0-9_-]+)',
        r'components/ui/([A-Za-z0-9_-]+)',
        r'from ["\'].*?/ui/([A-Za-z0-9_-]+)["\']',
    ]
    
    used = set()
    # Scan all JS/TS/JSX/TSX files in client/src
    source_root = PROJECT_ROOT / "client" / "src"
    if not source_root.exists():
        return used

    for path in source_root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".js", ".jsx", ".ts", ".tsx"}:
            continue
        if is_inside(path, {"node_modules", "dist", "build"}):
            continue
            
        text = read_text(path)
        for pattern in import_patterns:
            for match in re.findall(pattern, text):
                component_name = match.strip()
                if component_name in ui_files:
                    used.add(ui_files[component_name])
    return used

def collect_final_files():
    global all_files, included_files, used_ui_components
    
    base_files = scan_project()
    used_ui = find_used_ui_components()
    used_ui_components = used_ui
    
    final_files = []
    
    # Add base files, excluding the UI folder initially (we add back only used ones)
    for path in base_files:
        # Skip if it's inside the UI folder, we handle that separately
        if "components" in path.parts and "ui" in path.parts:
            continue
        final_files.append(path)
        
    # Add only the used UI components
    for path in sorted(used_ui, key=lambda x: str(rel(x)).lower()):
        final_files.append(path)
        
    # Deduplicate
    unique = {}
    for path in final_files:
        unique[str(rel(path)).lower()] = path
        
    files = sorted(unique.values(), key=lambda x: str(rel(x)).lower())
    included_files = set(files)
    
    # Mark unused UI components as skipped
    if (PROJECT_ROOT / "client" / "src" / "components" / "ui").exists():
        for path in (PROJECT_ROOT / "client" / "src" / "components" / "ui").rglob("*"):
            if not path.is_file():
                continue
            if path.suffix.lower() in {".ts", ".tsx", ".js", ".jsx"}:
                if path not in used_ui:
                    add_skip(path, "unused UI component")
                    
    all_files = files
    return files

def build_tree(files):
    file_set = {path.relative_to(PROJECT_ROOT) for path in files}
    directory_set = {Path(".")}
    
    for file_path in file_set:
        current = file_path.parent
        while True:
            directory_set.add(current)
            if current == Path("."):
                break
            current = current.parent
            
    lines = [PROJECT_ROOT.name]
    
    def walk(directory, prefix=""):
        try:
            items = sorted(directory.iterdir(), key=lambda x: (x.is_file(), x.name.lower()))
        except (PermissionError, OSError):
            return
            
        visible = []
        for item in items:
            if item.is_dir():
                relative_dir = item.relative_to(PROJECT_ROOT)
                if item.name.startswith("."): continue
                if item.name in IGNORE_DIRS: continue
                if relative_dir not in directory_set: continue
                visible.append(item)
            else:
                relative_file = item.relative_to(PROJECT_ROOT)
                if relative_file not in file_set: continue
                visible.append(item)
                
        for index, item in enumerate(visible):
            last = index == len(visible) - 1
            connector = "└── " if last else "├── "
            lines.append(prefix + connector + item.name)
            if item.is_dir():
                walk(item, prefix + ("    " if last else "│   "))
                
    walk(PROJECT_ROOT)
    return lines

def language_for(path):
    return LANGUAGE_MAP.get(path.suffix.lower(), "text")

def write_file(md, path):
    text = read_text(path)
    md.write(f"# FILE: `{rel(path)}`\n\n")
    md.write(f"```{language_for(path)}\n")
    md.write(text)
    if not text.endswith("\n"):
        md.write("\n")
    md.write("```\n\n---\n\n")

def write_skipped(md):
    md.write("# Skipped Files\n\n")
    if not skipped_files:
        md.write("No files were skipped.\n\n")
        return
    md.write("| File | Reason |\n|---|---|\n")
    for file_path, reason in sorted(skipped_files, key=lambda x: x[0].lower()):
        safe_path = file_path.replace("|", "\\|")
        safe_reason = reason.replace("|", "\\|")
        md.write(f"| `{safe_path}` | {safe_reason} |\n")
    md.write("\n")

def main():
    global skipped_files
    skipped_files = []
    
    print("Scanning project...")
    files = collect_final_files()
    
    print("Building tree...")
    tree = build_tree(files)
    
    print("Writing codebase.md...")
    with OUTPUT_FILE.open("w", encoding="utf-8") as md:
        md.write("# NEETVIDYA Project Codebase\n\n")
        md.write("> This file contains the essential source code and configuration for the NEETVIDYA platform. \n")
        md.write("> It excludes binaries, locks, secrets, and unused UI components to optimize for AI context.\n\n")
        
        md.write(f"**Project:** `{PROJECT_ROOT.name}`  \n")
        md.write(f"**Included files:** `{len(files)}`  \n")
        md.write(f"**Skipped files:** `{len(skipped_files)}`  \n")
        md.write(f"**Max file size:** `{MAX_FILE_SIZE_KB} KB`  \n\n")
        md.write("---\n\n")
        
        md.write("# Project Structure\n\n```text\n")
        md.write("\n".join(tree))
        md.write("\n```\n\n---\n\n")
        
        md.write("# Included Files\n\n")
        for path in files:
            md.write(f"- `{rel(path)}`\n")
        md.write("\n---\n\n")
        
        write_skipped(md)
        md.write("---\n\n")
        
        md.write("# Source Files\n\n")
        for path in files:
            write_file(md, path)
            
    print("=" * 50)
    print("Codebase generated successfully")
    print("=" * 50)
    print(f"Output          : {OUTPUT_FILE}")
    print(f"Included files  : {len(files)}")
    print(f"Skipped files   : {len(skipped_files)}")
    print(f"Used UI Comps   : {len(used_ui_components)}")
    print("=" * 50)

if __name__ == "__main__":
    main()