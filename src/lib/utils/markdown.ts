/**
 * Simple, lightweight markdown-to-HTML parser.
 * Converts headings, bold text, lists, links, and paragraphs into styled HTML strings.
 */
export function parseMarkdown(markdown: string): string {
    if (!markdown) return "";

    const lines = markdown.split(/\r?\n/);
    let html = "";
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // Handle empty lines (paragraph boundaries / list terminations)
        if (line === "") {
            if (inList) {
                html += "</ul>\n";
                inList = false;
            }
            continue;
        }

        // Handle horizontal rule
        if (line === "---") {
            if (inList) {
                html += "</ul>\n";
                inList = false;
            }
            html += '<hr class="border-secondary/40 my-8" />\n';
            continue;
        }

        // Handle headings
        const h3Match = line.match(/^###\s+(.*)/);
        if (h3Match) {
            if (inList) {
                html += "</ul>\n";
                inList = false;
            }
            html += `<h3 class="text-[1.3rem] font-bold text-neutral mt-8 mb-4 tracking-tight">${h3Match[1]}</h3>\n`;
            continue;
        }

        const h2Match = line.match(/^##\s+(.*)/);
        if (h2Match) {
            if (inList) {
                html += "</ul>\n";
                inList = false;
            }
            html += `<h2 class="text-[1.8rem] font-bold text-primary mt-10 mb-5 tracking-tight border-b border-secondary/20 pb-2">${h2Match[1]}</h2>\n`;
            continue;
        }

        const h1Match = line.match(/^#\s+(.*)/);
        if (h1Match) {
            if (inList) {
                html += "</ul>\n";
                inList = false;
            }
            html += `<h1 class="text-[2.2rem] font-bold text-primary mt-12 mb-6 tracking-tight">${h1Match[1]}</h1>\n`;
            continue;
        }

        // Handle lists
        const listMatch = line.match(/^-\s+(.*)/);
        if (listMatch) {
            if (!inList) {
                html += '<ul class="list-disc pl-6 mb-6 space-y-2 text-neutral/70">\n';
                inList = true;
            }
            let content = inlineParse(listMatch[1]);
            html += `<li class="text-[0.95rem] leading-[1.6]">${content}</li>\n`;
            continue;
        }

        // If we were in a list, but this line is not a list item, close the list
        if (inList) {
            html += "</ul>\n";
            inList = false;
        }

        // Treat standard lines as paragraphs
        let content = inlineParse(line);
        html += `<p class="text-[0.95rem] text-neutral/70 leading-[1.75] mb-5">${content}</p>\n`;
    }

    // Close any unclosed lists at the end
    if (inList) {
        html += "</ul>\n";
    }

    return html;
}

/**
 * Parses inline elements like bold (**text**) and links ([text](url))
 */
function inlineParse(text: string): string {
    let result = text;

    // Bold text (**bold**)
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-neutral">$1</strong>');

    // Links ([text](url))
    result = result.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline font-semibold">$1</a>'
    );

    return result;
}
