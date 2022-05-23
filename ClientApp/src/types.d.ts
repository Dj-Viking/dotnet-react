import type { FC } from "react";
declare module "*.tsx" {
    const comp: FC;
    export default comp;
}