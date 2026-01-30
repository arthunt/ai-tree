"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabase";

const LeadSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    goals: z.string().optional(),
    programId: z.string().min(1, "Program ID is required"),
});

export type LeadState = {
    success?: boolean;
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        goals?: string[];
        programId?: string[];
        _form?: string[];
    };
};

export async function submitLead(prevState: LeadState, formData: FormData): Promise<LeadState> {
    const validatedFields = LeadSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        goals: formData.get("goals"),
        programId: formData.get("programId"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, phone, goals, programId } = validatedFields.data;

    try {
        const { error } = await supabase.from("leads").insert({
            name,
            email,
            phone: phone || null,
            goals: goals || null,
            program_id: programId,
            status: "new",
        });

        if (error) {
            console.error("Supabase Error:", error);
            return {
                errors: {
                    _form: ["Failed to submit. Please try again later."],
                },
            };
        }

        return { success: true };
    } catch (err) {
        console.error("Server Action Error:", err);
        return {
            errors: {
                _form: ["An unexpected error occurred."],
            },
        };
    }
}
