import { boolean, date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";


export const UserSchema = pgTable('Customers', {
    customerid: serial('customerid').primaryKey(),
    customername: text('Customerame').notNull(),
    customerimage: text('customerimage'),
    customercreatedat: date('created_at').defaultNow(),
    customerKey: integer('customertkey').unique().notNull(),
    status: boolean('status').notNull().default(false)
})

export const LeadSchema = pgTable('Leads', {
    leadid: serial('leadid').primaryKey(),
    clientId: integer("customerId").notNull().references(() => UserSchema.customerKey),
    name:text("client_name").notNull(),
    phone: text("contact"),
    purpose: text('purpose'),
    email: text('email').notNull(),
    status: text('status').default('Neutral'),
    created_at: date('created_at').defaultNow(),
    read: boolean('read').default(false),
    responsetoit: text('response'),
    read_at: date('readat'),
    delteted:boolean('deleted').default(false)
})