import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "4r82uy47",
    dataset: "production",
    apiVersion: "2023-05-03",
    useCdn: true,
});