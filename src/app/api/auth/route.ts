import { login } from "@/controllers/login.controller";

export async function POST(req: Request){
    return login(req);
}