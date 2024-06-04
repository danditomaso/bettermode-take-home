import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: ['app/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
