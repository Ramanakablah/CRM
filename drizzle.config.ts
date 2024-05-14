import {defineConfig} from "drizzle-kit"

export default defineConfig({
    schema : "./src/Database/Schema/Schema.ts",
    out:"./drizzle",
    driver:"pg",
    dbCredentials:{
        connectionString :`${process.env.XATA_PG_URL}`
    },
    verbose:true,
    strict:true
}) 