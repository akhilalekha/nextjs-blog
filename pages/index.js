import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>
					Hello, I'm <strong>Akhila</strong>. I'm a software engineer. You can
					contact me on{" "}
					<a href="https://www.linkedin.com/in/akhila-c-r/">LinkedIn</a>
				</p>
			</section>
		</Layout>
	);
}
