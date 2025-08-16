import { connectToDatabase } from "@/lib/mongodb";
import { ContactFormType } from "@/types/contactForm";

export async function getAllContacts() {
    const db = await connectToDatabase();
    return db.collection("ContactForms").find({}).sort({ createdAt: -1 }).toArray();
}

export async function addContact(data: ContactFormType) {
    const db = await connectToDatabase();
    return db.collection("ContactForms").insertOne({
        ...data,
        createdAt: new Date(),
    });
}
