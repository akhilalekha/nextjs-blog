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

### There are two forms of prerendering

**Static Generation**: is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.

**Server-side Rendering**: is the pre-rendering method that generates the HTML on each request.

**Per page basis**: You can choose which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

### Static site generation with external data

In Next.js, when you export a page component, you can also export an async function called `getStaticProps`.

```javascript
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

`getStaticProps` runs at build time in production, and inside the function, you can fetch external data and send it as props to the page.
