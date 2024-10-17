import { CONNECTION } from "./config";
import { DataSource } from "typeorm";

//@ts-ignore
const AppDataSource = new DataSource({
    ...CONNECTION,
    entities: ["*/**/*.entity.ts"],
    migrations: ["src/migrations/*.ts"]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource
