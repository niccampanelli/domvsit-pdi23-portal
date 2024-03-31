interface IShowedUpByAttendantItemAttendant {
    id: number
    name: string
    role: string
}

export interface IShowedUpByAttendantItem {
    eventCount: number
    attendant: IShowedUpByAttendantItemAttendant
}