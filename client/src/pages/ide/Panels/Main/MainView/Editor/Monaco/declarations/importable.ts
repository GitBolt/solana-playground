import * as monaco from "monaco-editor";

import { declareModule } from "./helper";
import type { ClientPackageName, Fn } from "../../../../../../../../utils/pg";

/** All importable package types */
const IMPORTABLE_PACKAGES: [
  ClientPackageName,
  () => Promise<{ default: Fn }>
][] = [
  ["@clockwork-xyz/sdk", () => import("./packages/clockwork")],
  ["@metaplex-foundation/js", () => import("./packages/metaplex")],
  ["@solana/spl-token", () => import("./packages/spl-token")],
];

/** Mapping of package name -> imported */
const cachedTypes: {
  [key in ClientPackageName]?: true | monaco.IDisposable;
} = {};

/**
 * Declare importable types in the editor.
 *
 * This function declares the module as empty when the package is not used in
 * the code. This allows autocompletion when importing packages and the type
 * declarations will only load when the code contains the package name.
 *
 * @param code current editor content
 */
export const declareImportableTypes = async (code: string) => {
  for (const [packageName, importPackage] of IMPORTABLE_PACKAGES) {
    const pkg = cachedTypes[packageName];
    if (pkg === true) continue;

    if (new RegExp(`("|')${packageName}("|')`, "gm").test(code)) {
      const { default: declareTypes } = await importPackage();
      declareTypes();

      // Dispose the old filler declaration if it exists
      pkg?.dispose();

      // Declaration is final, this package will not get declared again
      cachedTypes[packageName] = true;
    } else if (!pkg) {
      // Empty declaration should get disposed if the package is used
      cachedTypes[packageName] =
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          declareModule(packageName)
        );
    }
  }
};
