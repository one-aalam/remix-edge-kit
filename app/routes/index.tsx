import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import { supabaseClient } from '~/lib/supabase.server'

import RemixEdge from "~/components/RemixEdge"
import SiteLayout from '../components/SiteLayout'

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  topPages: Array<{ name: string; to: string, isPrimary?: boolean }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
  let data: IndexData = {
    resources: [
      {
        name: "Remix Docs",
        url: "https://remix.run/docs"
      },
      {
        name: "React Router Docs",
        url: "https://reactrouter.com/docs"
      },
      {
        name: "Remix Discord",
        url: "https://discord.gg/VBePs6d"
      }
    ],
    topPages: [
    //   {
    //     to: "/gallery",
    //     name: "Browse Components (Coming soon)"
    //   },
      {
        to: "/",
        name: "Coming Soon",
        isPrimary: true
      },
    ],
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter Kit",
    description: "Welcome to Remix Starter Kit"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
      <SiteLayout>
    <div className="min-h-screen flex flex-col justify-center">
      <main>
        <RemixEdge/>
        <p className="text-center">Remix for edge rendered web applications, pretty good setup for eslint, prettier, git hooks, etc. and friction-less and robust UI development with TailwindCSS, DaisyUI and Headless UI</p>
      </main>
      <aside className="text-center mt-4">
        <ul className="flex flex-row justify-center gap-2">
          {data.topPages.map(page => (
            <li key={page.to} className="remix__page__resource">
                <Link className={`btn btn-primary ${!page.isPrimary && 'btn-outline'}`} to={page.to} prefetch="intent">{page.name} &rarr;</Link>
            </li>
          ))}
        </ul>
        <br/>
        <h2 className="text-purple-400">Remix Resources</h2>
        <ul className="flex flex-row justify-center gap-2">
          {data.resources.map(resource => (
            <li key={resource.url} className="remix__page__resource text-gray-600">
              <a href={resource.url}>{resource.name}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
    </SiteLayout>
  );
}
