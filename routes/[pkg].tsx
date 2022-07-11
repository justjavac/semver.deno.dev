/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import versionInfo from "version_info";
import { tw } from "@twind";
import Semver from "../islands/Semver.tsx";

export const handler: Handlers<string[] | null> = {
  async GET(_, ctx) {
    const { pkg } = ctx.params;
    const versions = await versionInfo(pkg);
    if (versions == null) {
      return ctx.render(null);
    }
    return ctx.render(versions.versions);
  },
};

export default function Pkg({ data, params }: PageProps<string[] | null>) {
  return (
    <>
      <Head>
        <title>Deno package semver calculator</title>
      </Head>
      <header class={tw`relative section-x-inset-sm pt-10 pb-10 flex flex-col items-center`}>
        <h1 class={tw`font-extrabold text-5xl leading-10 tracking-tight text-gray-900`}>
          Deno package semver calculator
        </h1>
      </header>
      <div class={tw`relative mx-auto max-w-screen-md`}>
        <input
          type="text"
          name="pkg"
          id="pkg"
          class={tw
            `block w-full px-4 py-2 mt-2 mb-1 leading-normal bg-white border border-gray-300 rounded-lg outline-none shadow-sm appearance-none`}
          autoComplete="off"
          placeholder="Enter a Deno package name..."
          value={params.pkg}
          required
          // @ts-ignore onKeyDown does support strings
          onKeyDown="event.key==='Enter' && (location.href=`/${document.getElementById('pkg').value}`)"
        />
        <button
          role="submit"
          class={tw
            `absolute top-0 right-0 px-4 py-2 border border-gray-300 text-md font-medium rounded-lg text-gray-700 bg-gray-100 hover:text-gray-800 hover:bg-gray-50 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition duration-150 ease-in-out`}
          // @ts-ignore onClick does support strings
          onClick="location.href=`/${document.getElementById('pkg').value}`"
        >
          Submit
        </button>
      </div>
      {data == null
        ? <p class={tw`mt-8 mx-auto max-w-screen-md text-red-500`}>The module '{params.pkg}' does not exist.</p>
        : <Semver versions={data} />}
    </>
  );
}
