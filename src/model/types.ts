interface ClientData {
    name: string;
    phone: number;
}

interface AppointmentData {
    day: string,
    hour: string,
    service: string,
    cost: number,
    attendance: boolean,
    paid: boolean 
}

interface Appointments {
    clientData: ClientData;
    appointments: AppointmentData[];
}

interface DataObj {
    name: string,
    data?: string,
    newData?: string | number | boolean,
    typeData?: string,
    appointmentData?: AppointmentData,
    day?: string
}

export { ClientData, AppointmentData, Appointments, DataObj }