import jsonfile from 'jsonfile'
import db from '../database/appointment.json';
import { ClientData, Appointments, DataObj } from './types';

const PATH = './src/database/appointment.json';
const API_BASE_URL = `https://jsonplaceholder.typicode.com/users`;

async function getAll(data: string): Promise<Appointments[]>{
    try {
        if(data != 'database') {
            throw new Error('Incorrect params');
        }
        return db;
    }
    catch (error: any) {
        console.log(error.message);
        throw error; 
    };
};

async function findClient(name: string): Promise<Appointments>{ 
    try {
        const clientFound = db.find((client) => client.clientData.name.toLocaleLowerCase().includes( name.toLocaleLowerCase()));

        if(!clientFound) {
            throw new Error('Client not found');
        }
        const result = {
            clientData: {
              name: clientFound.clientData.name,
              phone: clientFound.clientData.phone,
            },
            appointments: clientFound.appointments,
          };

        return result;
    }
    catch (error: any) {
        console.log(error.message);
        throw error; 
    };
};

async function clientData(DataObj: DataObj): Promise<any>{
    try {
        const { name, data } = DataObj;
        const clientFound = await findClient(name);

        if(!clientFound) {
            throw new Error('Client not found');
        }
        
        if (!data) {
            throw new Error('Appointment data is undefined');
        }
        
        if (data != 'clientData' && data != 'appointment'){
            throw new Error('Ivalid params')
        }
        
        if (data === 'clientData') { 
            const data =  clientFound.clientData;
            return data;
            
        } else if (data === 'appointment'){ 
            const lastAppointment = clientFound.appointments.slice(-1);
            
            const data = {
                clientData: clientFound.clientData.name,
                appointments: lastAppointment
            }
            return data;
        };
        throw new Error('Something went wrong');
    }
    catch (error: any) {
        console.log(error.message);
        throw error; 
    };
};

async function addClient(DataObj: DataObj): Promise<Appointments>{
    try{
        const { name, appointmentData } = DataObj;
        const clientData = await fetchData();
        const clientFound = clientData.find(client => client.name.toLowerCase().includes(name.toLowerCase()));
        const client = db.find((clients) => clients.clientData.name.toLowerCase().includes( name.toLowerCase()))
        
        if (!clientFound) {
            throw new Error('Client not found');
        }

        if(client){
            throw new Error('This user already exist')
        }

        if(!clientData) {
            throw new Error('Data is not loading');
        }

        if (!appointmentData) {
            throw new Error('Appointment data is undefined');
        }

        const dates = db.find((date) => date.appointments.some(
            (app) => app.day === appointmentData.day && app.hour === appointmentData.hour
            ));
        
        if(dates){
            throw new Error('This date is not avaiable');
        }
     
        const numeroAleatorio = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
        
        const newAppointment: Appointments = {
            clientData: {name: clientFound.name,
                phone: numeroAleatorio
            },
            appointments: [{
                day: appointmentData.day,
                hour: appointmentData.hour,
                service: appointmentData.service,
                cost: appointmentData.cost,
                attendance: Boolean(appointmentData.attendance),
                paid: Boolean(appointmentData.paid)
            }],
        };
            
        db.push(newAppointment);
        jsonfile.writeFileSync(PATH, db);

        console.log('Appointment adeed successfully!')
        return newAppointment;
    }
    catch (error: any) {
        console.log(error.message);
        throw error; 
    };
};

async function createAppointment(dataObj: DataObj): Promise<Appointments>{
    try{ 
        const { name, appointmentData } = dataObj;
        const clientFound = await findClient(name);

        if (!clientFound) {
            throw new Error('Client not found');
        }
        if (!appointmentData) {
            throw new Error('Appointment data is undefined');
        }
        
        const dates = db.find((date) => date.appointments.some(
            (app) => app.day === appointmentData.day && app.hour === appointmentData.hour
            ));

        if(dates){
            throw new Error('This date is not avaiable');
        }
        
        const newAppointment =  {
                day: appointmentData.day,
                hour: appointmentData.hour,
                service: appointmentData.service,
                cost: appointmentData.cost,
                attendance: Boolean(appointmentData.attendance),
                paid: Boolean(appointmentData.paid)
            }
        
        clientFound.appointments.push(newAppointment);
        jsonfile.writeFileSync(PATH, db);

        console.log('Appointment added successfully!');
        return clientFound;
    }
    catch (error: any) {
        console.log(error.message);
        throw error; 
    };
};

async function changeData(dataObj: DataObj): Promise<any> {
    try{
        const { data, newData, typeData } = dataObj;
        const client = await clientData(dataObj);
        const phones = db.find((client) => client.clientData.phone === newData);
        const dates = db.find((date) => date.appointments.some(
            (app) => app.day === newData || app.hour === newData
            ));
                
        if (dates){
            throw new Error('This date is not avaiable');
        }

        if (!client){
            throw new Error('Data not found');
        }

        if(phones){
            throw new Error('Phone number already exist');
        }

        if (data === 'appointment' && 'appointments' in client){
            for(const appointment of client.appointments){ 
                if (typeData === 'day' && 'day' in appointment) {
                    if (typeof(newData) != 'string'){
                        throw new Error('Please enter a valid day');
                    }
                    appointment.day = newData;

                } else if (typeData === 'hour' && 'hour' in appointment) {
                    if (typeof(newData) != 'string'){
                        throw new Error('Please enter an hour');
                    }
                    appointment.hour = newData;

                } else if (typeData === 'service' && 'service' in appointment) {
                    if (typeof(newData) != 'string'){
                        throw new Error('Please enter a valid service');
                    }
                    appointment.service = newData;
                    
                } else if (typeData === 'cost' && 'cost' in appointment) {
                    if (typeof(newData) != 'number'){
                        throw new Error('Please enter a number');
                    }
                    appointment.cost = newData;
                    
                } else if (typeData === 'attendance' && 'attendance' in appointment) {
                    if (newData != 'true' && newData != 'false'){
                        throw new Error('Please enter true or false');
                    }
                    appointment.attendance = Boolean(newData);
                    
                } else if (typeData === 'paid' && 'paid' in appointment) {
                    if (newData != 'true' && newData != 'false'){
                        throw new Error('Please enter true or false');
                    }
                    appointment.paid = Boolean(newData);
                }
            }
        } else if(data === 'clientData' && typeData === 'phone'){
            const clientIndex = db.findIndex((clients) => clients.clientData.phone === client.phone);
            db[clientIndex].clientData.phone = Number(newData);     
        }

        jsonfile.writeFileSync(PATH, db);

        console.log('Data changed successfully');
        return client;
    }
    catch (error: any) {
        console.log(error.message);
        throw error; 
    };
};

async function totalIncome(): Promise<{}> {
    try{
        const allClients = await getAll('database');
        let total = 0;

        if (!allClients){
            throw new Error('Data is not loading');
        }
        for (const client of allClients) {
            if ('appointments' in client) {
                for (const appointment of client.appointments) {
                    total += appointment.cost;
                }
            } 
        }
        const result = {'Total Income': total}
        return result;
    }
    catch (error: any) {
        console.log(error.message);
        throw error; 
    };
};

async function deleteAppointment(dataObj: DataObj): Promise<Appointments> {
    try{
        const { name, day } = dataObj;
        const clientFound = await findClient(name);
        const appointmentFound = clientFound.appointments.find((app) => app.day === day);
        
        if (!clientFound) {
            throw new Error('Client not found');
        }
        if (!appointmentFound) {
            throw new Error('Appointment not found');
        }

        const appointmentIndex = clientFound.appointments.indexOf(appointmentFound);
        clientFound.appointments.splice(appointmentIndex, 1);

        jsonfile.writeFileSync(PATH, db);

        console.log('Appointment deleted successfully');
        return clientFound;

    } catch (error: any) {
        console.log(error.message);
        throw error; 
    };
}

async function fetchData():Promise<ClientData[]> {
    try {
         const response = await fetch(API_BASE_URL);
         if(!response.ok){
            throw new Error('Data is not loading');
        }
 
         const data = await response.json();
 
         const clientData = data.map((client: ClientData) => { 
            return {
                name: client.name,
                phone: client.phone,
            };
        });
            return clientData;
    } 
    catch (error: any) {
        console.log(error.message);
        throw error; 
    };
};

export {  
    findClient, 
    clientData,
    addClient, 
    createAppointment, 
    changeData, 
    totalIncome, 
    deleteAppointment,
    fetchData
};
