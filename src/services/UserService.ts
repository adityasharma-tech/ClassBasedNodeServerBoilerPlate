import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DrizzleDB } from "../database";
import { usersTable } from "../database/schemas";
import logger from "./Logger";

export class UserService {
    private dbInstance: NodePgDatabase;
    constructor(){
        this.dbInstance = (new DrizzleDB()).initializeDb();
    }

    async create(data: any){
        const user: typeof usersTable.$inferInsert = {
            name: data.name,
            email: data.email,
            uid: data.uid,
            photoUrl: data.photoUrl
        }
        await this.dbInstance.insert(usersTable).values(user);
        logger.log("info", `user:created | ${JSON.stringify(data)}`)
    }

    async findAllUser() {
        const users = await this.dbInstance.select().from(usersTable);
        logger.log("info", `user:find | ${JSON.stringify(users)}`)
        return users
    }
}