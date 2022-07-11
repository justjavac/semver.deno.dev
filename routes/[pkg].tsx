/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import type { Handlers, PageProps } from "$fresh/server.ts";
import versionInfo from "version_info";

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
  console.log(data, params.pkg)

  if (!data) {
    return <h1>The module '{params.pkg}' does not exist</h1>;
  }

  return <div>Hello {data}</div>;
}
