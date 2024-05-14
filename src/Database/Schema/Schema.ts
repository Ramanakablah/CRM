import { boolean, date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";


export const UserSchema = pgTable('Customers', {
    customerid: serial('customerid').primaryKey(),
    customername: text('Name').notNull(),
    customerimage: text('customerimage'),
    customercreatedat: date('created_at').defaultNow(),
    customerKey: integer('customertkey').notNull(),
    status: boolean('status').notNull().default(false)
})

export const LeadSchema = pgTable('Leads', {
    leadid: serial('leadid').primaryKey(),
    clientId: integer("customerId").notNull().references(() => UserSchema.customerKey),
    phone: text("contact"),
    purpose: text('purpose'),
    email: text('email').notNull(),
    status: text('status').default('Neutral'),
    read: boolean('read').default(false),
    responsetoit: text('response'),
    read_at: date('readat'),
    delteted:boolean('deleted').default(false)
})