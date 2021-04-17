This is a starter template for [Learn Next.js](https://nextjs.org/learn).

- Components are placed in `/components` folder.
- Pages / Routes are placed in `/pages` folder.
- Global css and other utility styles in `/styles` folder.
  - global styles should be imported in `pages/_app.js`. You cannot import global CSS anywhere else.
- Customize html tag - `pages/_document.js`
- Assets in `/public`

---

By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript.

- To see the page with JavaScript disabled : open chrome chrome devtools -> ctrl + shift + p -> search for JavaScript -> choose disable JavaScript -> to disable JavaScript

App gets rendered without JavaScript, because Next.js has pre-rendered the app into static HTML, allowing you to see the app UI without running JavaScript.

### Pre-rendered vs Non pre-rendered

<img src="https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png" alt="pre-rendered page" width="400"/>

<img src="https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png" alt="non pre-rendered" width="400"/>
