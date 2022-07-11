/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import * as semver from "semver";
import { tw } from "@twind";

interface SemverProps {
  versions: string[];
}

export default function Semver(props: SemverProps) {
  const [version, setVersion] = useState("1.x");

  return (
    <>
      <div class={tw`flex flex-col mt-5 gag-2 mx-auto max-w-screen-md`}>
        <label for="version" class={tw`font-medium`}>Enter a semver range</label>
        <input
          type="text"
          name="version"
          id="version"
          class={tw
            `border border-gray-300 bg-white h-9 lt-sm:flex-grow sm:w-70 px-3 outline-none focus:border-gray-500 hover:border-gray-500 transition-colors`}
          autoComplete="off"
          placeholder="Enter a semver range..."
          value={version}
          onInput={(e) => setVersion((e.target as HTMLInputElement).value)}
          required
        />
      </div>
      <ul class={tw`flex flex-row flex-wrap gap-3 p-8 list-disc w-screen`}>
        {props.versions.map((x) => (
          <li class={tw`w-32`}>
            <span class={tw`text-gray-500 ${semver.satisfies(x, version) ? "bg-yellow-300" : ""}`}>{x}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
