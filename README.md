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

`getStaticProps` runs at build time in production, and inside the function, you can fetch external data and send it as props to the page. `getStaticProps` only runs on the server-side. It will never run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.

### Read from file system

Import the function to read from file system in `index.js`. `allPostsData` is passed to the Home component as props.

```javascript
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData
		}
	};
}
```

### Fetch External API

```javascript
export async function getSortedPostsData() {
	// Instead of the file system,
	// fetch post data from an external API endpoint
	const res = await fetch("..");
	return res.json();
}
```

### Query Database

```javascript
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

**Development vs. Production**

- In development (npm run dev or yarn dev), `getStaticProps` runs on every request.
- In production, `getStaticProps` runs at build time. However, this behavior can be enhanced using the `fallback` key returned by `getStaticPaths`
  Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.

**Only Allowed in a Page**
`getStaticProps` can only be exported from a page. You can’t export it from non-page files.

One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

### Fetching Data at Request Time

If you need to fetch data at request time instead of at build time, you can try Server-side Rendering.

To use Server-side Rendering, you need to export `getServerSideProps` instead of `getStaticProps` from your page.

```javascript
export async function getServerSideProps(context) {
	return {
		props: {
			// props for your component
		}
	};
}
```

### Client side rendering

**SWR** : The team behind Next.js has created a React hook for data fetching called SWR. We highly recommend it if you’re fetching data on the client side.

```javascript
import useSWR from "swr";

function Profile() {
	const { data, error } = useSWR("/api/user", fetch);

	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;
	return <div>hello {data.name}!</div>;
}
```

### Each Page Path Depends on External Data

Next.js allows you to statically generate pages with paths that depend on external data. This enables dynamic URLs in Next.js.
We want each post to have the path `/posts/<id>`, where `<id>` is the name of the markdown file under the top-level posts directory. Since we have `ssg-ssr.md` and `pre-rendering.md`, we’d like the paths to be `/posts/ssg-ssr` and `/posts/pre-rendering`.

- create a page called `[id].js` under `pages/posts`. Pages that begin with `[` and end with `]` are dynamic routes in Next.js.
