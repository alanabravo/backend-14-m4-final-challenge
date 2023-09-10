import { ClientData, Appointments, DataObj } from '../model/types';
import {
    findClient, 
    clientData,
    addClient, 
    createAppointment, 
    changeData, 
    totalIncome, 
    deleteAppointment,
    fetchData
} from '../model/management'

abstract class Controller {
	static async findClient(name: string): Promise<Appointments> {
		const result = await findClient(name);
		return result;
	};

	static async clientData(dataObj: DataObj): Promise<Appointments> {
		const result = await clientData(dataObj);
		return result;
	};
    
	static async addClient(dataObj: DataObj): Promise<Appointments> {
		const result = await addClient(dataObj);
		return result;
	};
    
	static async createAppointment(dataObj: DataObj): Promise<Appointments> {
		const result = await createAppointment(dataObj);
		return result;
	};
    
	static async changeData(dataObj: DataObj): Promise<Appointments> {
            const result = await changeData(dataObj);
            return result;
    };
        
    static async totalIncome(): Promise<{}> {
        const result = await totalIncome();
        return result;
    };
        
    static async deleteAppointment(dataObj: DataObj): Promise<Appointments> {
        const result = await deleteAppointment(dataObj);
        return result;
    };
        
    static async fetchData(): Promise<ClientData[]> {
        const result = await fetchData();
        return result;
    };
};

export { Controller };