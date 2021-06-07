import { UserData } from "src/app/common/data/user-full-data";

export interface UserSession {
    sessionId: string;
    userData: UserData
}