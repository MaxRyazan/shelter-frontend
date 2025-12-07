// @ts-ignore
import { defineConfig } from "orval";

export default defineConfig({
    main: {
        input: {
            target: "http://localhost:5083/swagger/v1/swagger.json",
        },
        output: {
            target: "./src/_openapi/api",
            schemas: "src/_openapi/models",
            mode: "tags-split",
            indexFiles: true,
            prettier: true,
            override: {
                mutator: {
                    path: './src/mutator/index.ts',
                    name: 'useFetchMutator'
                }
            }
        },
    },
});