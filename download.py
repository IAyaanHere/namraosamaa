import os
import re
import urllib.request
import urllib.parse
from html.parser import HTMLParser

BASE_URL = 'https://naqshdigital.in/khwahish/'
DEST_DIR = r'd:\Noor Invites\DESTINY'

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

class ResourceParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.resources = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == 'link' and attrs_dict.get('rel') == 'stylesheet' and 'href' in attrs_dict:
            self.resources.append(('css', attrs_dict['href']))
        elif tag == 'script' and 'src' in attrs_dict:
            self.resources.append(('js', attrs_dict['src']))
        elif tag == 'img' and 'src' in attrs_dict:
            self.resources.append(('img', attrs_dict['src']))
        elif tag in ('audio', 'video', 'source') and 'src' in attrs_dict:
            self.resources.append(('media', attrs_dict['src']))

def download_file(url, local_path):
    try:
        ensure_dir(os.path.dirname(local_path))
        print(f"Downloading {url} to {local_path}")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(local_path, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
            return data
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return None

def main():
    print("Fetching index.html...")
    req = urllib.request.Request(BASE_URL, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            html_content = response.read().decode('utf-8')
    except Exception as e:
        print(f"Failed to fetch index.html: {e}")
        return

    parser = ResourceParser()
    parser.feed(html_content)

    print(f"Found {len(parser.resources)} resources.")
    
    # Save index.html
    with open(os.path.join(DEST_DIR, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html_content)

    css_files = []
    for res_type, rel_url in parser.resources:
        if rel_url.startswith('data:') or rel_url.startswith('#'):
            continue
        
        full_url = urllib.parse.urljoin(BASE_URL, rel_url)
        parsed_url = urllib.parse.urlparse(full_url)
        path = parsed_url.path
        if path.startswith('/khwahish/'):
            path = path[len('/khwahish/'):]
        if not path:
            continue
            
        local_path = os.path.join(DEST_DIR, urllib.parse.unquote(path).lstrip('/'))
        
        # Download resource
        data = download_file(full_url, local_path)
        
        if res_type == 'css' and data:
            css_files.append((full_url, local_path, data.decode('utf-8', errors='ignore')))

    # Process CSS files to find url(...) and @import
    url_pattern = re.compile(r'url\((["\']?)([^)]+)\1\)')
    import_pattern = re.compile(r'@import\s+(?:url\()?["\']?([^"\')]+)["\']?\)?')

    for css_url, local_css_path, css_content in css_files:
        urls_to_download = []
        for match in url_pattern.finditer(css_content):
            url = match.group(2)
            if not url.startswith('data:') and not url.startswith('#'):
                urls_to_download.append(url)
        for match in import_pattern.finditer(css_content):
            url = match.group(1)
            if not url.startswith('data:') and not url.startswith('#'):
                urls_to_download.append(url)
        
        for url in urls_to_download:
            full_url = urllib.parse.urljoin(css_url, url)
            parsed_url = urllib.parse.urlparse(full_url)
            path = parsed_url.path
            if path.startswith('/khwahish/'):
                path = path[len('/khwahish/'):]
            
            # Remove query strings for local path mapping
            clean_path = urllib.parse.unquote(path).lstrip('/')
            local_path = os.path.join(DEST_DIR, clean_path)
            
            download_file(full_url, local_path)

if __name__ == '__main__':
    main()
