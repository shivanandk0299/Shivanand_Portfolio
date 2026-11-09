"""Lightweight structural checks for the static portfolio."""
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parent

class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.hrefs = []
        self.srcs = []
        self.labels = []
        self.aria_controls = []
        self.h1_count = 0
        self._heading = None
        self._heading_text = []
        self.headings = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            self.ids.append(a["id"])
        if tag == "a" and a.get("href"):
            self.hrefs.append(a["href"])
        if tag in ("img", "script", "link") and a.get("src"):
            self.srcs.append(a["src"])
        if tag == "img" and "alt" not in a:
            self.labels.append("img missing alt")
        if tag == "label" and a.get("for"):
            self.labels.append(("label", a["for"]))
        if a.get("aria-controls"):
            self.aria_controls.append(a["aria-controls"])
        if tag == "h1":
            self.h1_count += 1
        if tag in ("h1", "h2", "h3", "h4"):
            self._heading = tag
            self._heading_text = []

    def handle_data(self, data):
        if self._heading:
            self._heading_text.append(data)

    def handle_endtag(self, tag):
        if self._heading == tag:
            self.headings.append((tag, " ".join(self._heading_text).strip()))
            self._heading = None
            self._heading_text = []


def check(condition, message):
    print(f"[{'PASS' if condition else 'FAIL'}] {message}")
    return condition


def main():
    html_path = ROOT / "index.html"
    config_path = ROOT / "config.js"
    parser = SiteParser()
    parser.feed(html_path.read_text(encoding="utf-8"))
    okay = True

    duplicates = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
    okay &= check(not duplicates, f"No duplicate IDs found{': ' + ', '.join(duplicates) if duplicates else ''}")
    id_set = set(parser.ids)
    internal = [href[1:] for href in parser.hrefs if href.startswith("#") and len(href) > 1]
    missing = sorted({anchor for anchor in internal if anchor not in id_set})
    okay &= check(not missing, f"Internal anchors resolve ({len(internal)} links checked){': ' + ', '.join(missing) if missing else ''}")
    local_refs = []
    for tag in re.findall(r'<(?:a|link|script|img)\b[^>]*>', html_path.read_text(encoding="utf-8"), flags=re.I):
        for attr in ("href", "src"):
            match = re.search(rf'\b{attr}=["\']([^"\']+)["\']', tag, flags=re.I)
            if not match:
                continue
            value = match.group(1)
            if value.startswith(("#", "http://", "https://", "mailto:", "tel:", "data:")):
                continue
            local_refs.append(value.split("?", 1)[0])
    missing_local = sorted({value for value in local_refs if value and not (ROOT / value).is_file()})
    okay &= check(not missing_local, f"Static local file references exist ({len(local_refs)} checked){': ' + ', '.join(missing_local) if missing_local else ''}")
    label_targets = [target for kind, target in parser.labels if isinstance(kind, str) and kind == "label"]
    missing_labels = sorted({target for target in label_targets if target not in id_set})
    okay &= check(not missing_labels, f"Form labels target existing IDs ({len(label_targets)} checked){': ' + ', '.join(missing_labels) if missing_labels else ''}")
    missing_controls = sorted({control for control in parser.aria_controls if control not in id_set})
    okay &= check(not missing_controls, f"aria-controls references resolve{': ' + ', '.join(missing_controls) if missing_controls else ''}")
    okay &= check(parser.h1_count == 1, f"Exactly one h1 (found {parser.h1_count})")
    no_alt = [item for item in parser.labels if item == "img missing alt"]
    okay &= check(not no_alt, "All static img elements include alt attributes")

    config_text = config_path.read_text(encoding="utf-8")
    image_refs = re.findall(r'image:\s*["\']([^"\']+)["\']', config_text)
    missing_images = [image for image in image_refs if not (ROOT / image).is_file()]
    okay &= check(not missing_images, f"Configured project images exist ({len(image_refs)} checked){': ' + ', '.join(missing_images) if missing_images else ''}")
    resume_paths = re.findall(r'resumePath:\s*["\']([^"\']*)["\']', config_text)
    configured_resume = [path for path in resume_paths if path.strip()]
    missing_resume = [path for path in configured_resume if not (ROOT / path).is_file()]
    okay &= check(not missing_resume, f"Configured resume path exists{': ' + ', '.join(missing_resume) if missing_resume else ''}")

    try:
        subprocess.run(["node", "--check", str(ROOT / "config.js")], check=True, capture_output=True, text=True)
        subprocess.run(["node", "--check", str(ROOT / "script.js")], check=True, capture_output=True, text=True)
        okay &= check(True, "JavaScript syntax checks pass")
    except (subprocess.CalledProcessError, FileNotFoundError) as error:
        output = getattr(error, "stderr", "") or str(error)
        okay &= check(False, f"JavaScript syntax check failed: {output.strip()}")

    print("\nResult:", "PASS" if okay else "FAIL — review the checks above")
    return 0 if okay else 1

if __name__ == "__main__":
    sys.exit(main())
