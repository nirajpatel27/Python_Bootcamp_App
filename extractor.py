import pdfplumber
import json
import re

def extract_content(pdf_path):
    data = []
    current_chapter = {"title": "Introduction", "slug": "intro", "content": "", "summary": ""}
    
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            if not text:
                continue
                
            # Logic to detect headers based on your handbook's likely formatting
            # We look for lines that are short and likely uppercase or title case
            lines = text.split('\n')
            
            for line in lines:
                clean_line = line.strip()
                
                # Heuristic: Detect Chapter Headers (e.g., "1. Introduction", "Section 2:")
                if (len(clean_line) < 50 and 
                   (clean_line[0].isdigit() or clean_line.isupper()) and 
                   "Bootcamp" not in clean_line): # Ignore footer/header noise
                    
                    # Save previous chapter
                    if current_chapter["content"]:
                        data.append(current_chapter)
                    
                    # Start new chapter
                    title = clean_line
                    slug = clean_line.lower().replace(" ", "-").replace(".", "")
                    current_chapter = {"title": title, "slug": slug, "content": "", "summary": ""}
                
                # Heuristic: Detect Code Blocks (indentation or common symbols)
                elif "    " in line or any(x in line for x in ['def ', 'print(', 'class ', 'import ']):
                     current_chapter["content"] += f'<pre><code>{line}</code></pre>'
                
                # Heuristic: Detect Summaries/Key Takeaways
                elif "Summary" in clean_line or "Key Takeaways" in clean_line:
                    current_chapter["content"] += f'<h3>{clean_line}</h3>'
                    current_chapter["summary"] += clean_line + "<br>"
                
                # Regular Text
                else:
                    current_chapter["content"] += f'<p>{line}</p>'

        # Append last chapter
        if current_chapter["content"]:
            data.append(current_chapter)
            
    return data

# Run the extraction
print("Extracting 82 pages... this might take a minute.")
content = extract_content("Python+Handbook.pdf") # Make sure your PDF name matches exactly
with open("content.json", "w") as f:
    json.dump(content, f, indent=4)
print("Success! Created content.json")