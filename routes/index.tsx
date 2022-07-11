import { Handlers } from "$fresh/server.ts";
import Pkg, { handler as pkgHandler } from "./[pkg].tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    ctx.params.pkg = "oak";
    return pkgHandler.GET!(req, ctx);
  },
};

export default Pkg;
