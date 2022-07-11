/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";

export default function Pkg(props: PageProps) {
  return <div>Hello {props.params.pkg}</div>;
}
