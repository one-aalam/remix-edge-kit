import { MetaFunction, LoaderFunction, json } from 'remix'
import { useLoaderData, Link, useCatch } from 'remix'
import faunadb from 'faunadb'
import type { QueryResponse } from '~/lib/fauna/fauna.server'
import { faunaClient, getFaunaError } from '~/lib/fauna/fauna.server'

import RemixEdge from '~/components/RemixEdge'
import SiteLayout from '../components/SiteLayout'

type LoaderData = { notes: Array<any> }


// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader

export let loader: LoaderFunction = async ({ request }): Promise<LoaderData> => {
    const { Collection, Paginate, Documents, Map, Lambda, Get } = faunadb.query;

    try {
        const notes = await faunaClient.query<QueryResponse>(
            Map(
                Paginate(Documents(Collection('Notes'))),
                Lambda(x => Get(x))
            )
        )
        return {
            notes: notes.data.map(r => ({
                id: r.ref.id,
                ...r.data
            }))
        };
    } catch(error) {
        const faunaError = getFaunaError(error);
        throw json(faunaError.description, { status: faunaError.status })
    }
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
          {notes.map((note, index) => (
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

export function ErrorBoundary({ error }: { error: { message: string, stack: any }}) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
}

export function CatchBoundary() {
    const caught = useCatch();

    return (
      <div>
        <h1>Caught</h1>
        <p>Status: {caught.status}</p>
        <pre>
          <code>{JSON.stringify(caught.data, null, 2)}</code>
        </pre>
      </div>
    );
}
