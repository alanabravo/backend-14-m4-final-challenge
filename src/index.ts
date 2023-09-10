import minimist from 'minimist';
import { Controller } from './controller/controller'
import pc from "picocolors"

function processParams(params: string[]) { 
    const processedParams = minimist(params);
    
    if (processedParams._[0] === 'findClient'){
        const result = processedParams.name;
        return Controller.findClient(result);
    };

    if (processedParams._[0] === 'clientData'){
        const result = {
            name: processedParams.name,
            data: processedParams.data
        }
        return Controller.clientData(result);
    };

    if(processedParams._[0] === 'addClient'){
        const result = {
            name: processedParams.name,
            appointmentData: {
                day: processedParams.day,
                hour: processedParams.hour,
                service: processedParams.service,
                cost: processedParams.cost,
                attendance: processedParams.attendance,
                paid:processedParams.paid
            }
        }
        return Controller.addClient(result);
    };

    if(processedParams._[0] === 'createAppointment'){
        const result = {
            name: processedParams.name,
            appointmentData: {
                day: processedParams.day,
                hour: processedParams.hour,
                service: processedParams.service,
                cost: processedParams.cost,
                attendance: processedParams.attendance,
                paid:processedParams.paid
            }
        }
        return Controller.createAppointment(result);
    };

    if(processedParams._[0] === 'changeData'){
        const result = {
            name: processedParams.name, 
            data: processedParams.data, 
            newData: processedParams.newData, 
            typeData: processedParams.typeData
        }
        return Controller.changeData(result);
    };

    if(processedParams._[0] === 'totalIncome'){
        if(!processedParams._[1]) return Controller.totalIncome();
    };

    if(processedParams._[0] === 'deleteAppointment'){
        const result = {
            name: processedParams.name,
            day: processedParams.day
        }
        return Controller.deleteAppointment(result)
    };

    if(processedParams._[0] === 'fetchData'){
        if(!processedParams._[1]) return Controller.fetchData();
    };
    
    throw new Error('Please enter a valid param');
};


async function main() { 
    try {
        console.log(
            pc.bgBlack(
            pc.blue(`Hi there! here is the information you requested: `)
            )
        );

        const params = process.argv.slice(2);
        const result = processParams(params);
        const data = await result;
        
        console.log(data)

    } catch (error) {
        console.error('Error:', error);
    }
};
    
main();