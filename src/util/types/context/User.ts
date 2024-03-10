import { IAttendantData, IUser, IUserData } from "../../../types/context/User";

export function isUser(user: IUser): user is IUserData {
    return "role" in user === false;
}

export function isAttendant(user: IUser): user is IAttendantData {
    return "role" in user;
}