import { getXataClient } from "../xata";
import {drizzle} from "drizzle-orm/xata-http";

const xata = getXataClient();
const db = drizzle(xata);

export default db