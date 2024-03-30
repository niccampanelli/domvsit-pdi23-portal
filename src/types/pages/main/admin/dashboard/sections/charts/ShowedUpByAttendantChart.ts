interface IShowedUpByAttendantItemAttendant {
    id: number
    name: string
}

export interface IShowedUpByAttendantItem {
    eventCount: number
    attendant: IShowedUpByAttendantItemAttendant
}