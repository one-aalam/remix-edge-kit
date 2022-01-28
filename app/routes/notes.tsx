import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, Link } from 'remix'
import type { Note } from '@prisma/client'
import { db } from '~/lib/db.server'

import RemixEdge from '~/components/RemixEdge'
import SiteLayout from '../components/SiteLayout'

type LoaderData = { notes: Array<Note> }

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader

export let loader: LoaderFunction = async ({ request }): Promise<LoaderData> => {
  const notes = await db.note.findMany({})
  return {
      // @ts-ignore
      notes
  };
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Edge Kit - Notes",
    description: "Welcome to Remix Edge Kit - Notes page"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Notes() {
  let { notes } = useLoaderData<LoaderData>();

  return (
      <SiteLayout>
    <div className="min-h-screen flex flex-col justify-center">
      <main>
        <RemixEdge/>
        <p className="text-center">Remix for edge rendered web applications, pretty good setup for eslint, prettier, git hooks, etc. and friction-less and robust UI development with TailwindCSS, DaisyUI and Headless UI</p>
      </main>
      <aside className="text-center mt-4">
        <ul className="flex flex-row justify-center gap-2">
          {notes.map(note => (
            <li key={note.id} className="remix__page__resource">
                <Link className={`btn btn-primary`} to={`/notes/${note.id}`} prefetch="intent">{note.title} &rarr;</Link>
            </li>
          ))}
        </ul>
        <br/>
      </aside>
    </div>
    </SiteLayout>
  );
}
