## Web Page Rendering Process

The web page rendering process involves several steps, from retrieving a page's content to rendering it on the user's screen. Here’s a simplified breakdown of the steps:

1. **DNS Lookup**: The browser resolves the domain name into an IP address using DNS to determine where the server is located.

2. **HTTP Request**: The browser sends an HTTP request to the server for the content of the web page (usually an HTML file).

3. **Server Response**: The server processes the request and returns the HTML content, along with resources such as CSS, JavaScript, images, etc.

4. **Parsing HTML and Building the DOM**: 
   - The browser parses the HTML file and builds the **DOM (Document Object Model)**, which is a tree-like structure representing the elements on the web page.
   - If the browser encounters external resources (such as CSS, images, or JavaScript), it will send additional HTTP requests for those.

5. **Parsing CSS and Creating the CSSOM**:
   - The browser parses CSS files and constructs the **CSSOM (CSS Object Model)**. 
   - The CSSOM defines how styles are applied to the elements in the DOM, including layout, colors, fonts, etc.

6. **JavaScript Execution**:
   - The browser encounters `<script>` tags in the HTML or linked JavaScript files and starts executing JavaScript.
   - JavaScript can manipulate both the DOM and CSSOM dynamically, so the browser may need to pause the rendering process to execute scripts, especially if scripts modify content or styles.

7. **Rendering Tree Construction**:
   - The browser combines the DOM and CSSOM to build the **render tree**. 
   - The render tree contains only the visible content, excluding things like `<head>` and elements with `display: none`.

8. **Layout**:
   - The browser calculates the geometry of the elements based on the render tree and applies the CSS rules to determine the position and size of each element on the page. This is often referred to as the **reflow** process.

9. **Painting**:
   - The browser takes the layout information and "paints" the pixels on the screen. This is where the actual visual representation of the page is created, including colors, borders, shadows, and text.

10. **Compositing**:
    - Modern browsers often break the page into multiple layers (such as when using z-index or animations). The layers are combined (or "composited") to produce the final visible page.


