<h1 align="center"> Desafío Final - TypeScript </h1>

#Aplicación de gestión de turnos

***

_Este programa sirve para la autogestión de turnos de clientes. Lea atentamente las instrucciones de uso:_

- Para ejecutar cada comando debe iniciar el programa utilizando **'npm run dev'**. Los comandos deben llamarse de la siguiente manera:**-- (command) --(param) (value)**

- Para buscar un cliente en específico ejecute el comando **findClient** con el parámetro **name** y el nombre que busca como valor.

- También puede utilizar el comando **clientData** para filtrar según datos del cliente. El comando **clientData** traerá la información según el valor que se indique. Los parámetros deben ser: el nombre del cliente **name**, y **data**. El parámetro data especifica qué debe traer el programa. Si el valor de data es **clientData**, este retornará el nombre y el teléfono del cliente. Si el valor indicado es **appointment**, este retornará los datos del cliente y su ultima cita registrada. _Si ingresa otro valor, el programa retornará error._

- Puedes agregar clientes con el comando **addClient**, pero estos nuevos clientes deben ser parte de una base de datos que debes llamar con el comando **fetchData**. Para ejecutar addClient debes ingresar el parámetro **name** con el nombre de alguna persona existente en fetchData. También, para agregar la cita, deben ir los parametros **day** con el valor de formato **day-month-year**; **hour** con el formato **hour:min**; **service** con los datos del servicio, **cost** con el costo del servicio; **attendance** con **true** o **false** si la persona ya fue atendida o no respectivamente; y **paid** utiliza la misma lógica que attendance en caso de haber recibido el dinero acordado. _Recuerde que es necesario que ingrese todos los parámetros y valores de la manera indicada para que el programa funcione correctamente._
**Ejemplo: npm run dev -- addClient --name (value) --day (value) --hour (value) --service (value) --cost (value) --attendance (value) --paid (value)**

- Usando el comando **createAppointment** puedes agregar una nueva cita a un cliente existente. La lógica de ejecución es la misma que en addClient. Con el parámetro **name** defines a qué cliente decides agregarle la nueva cita, y **day**, **hour**, **service**, **cost**, **attendance**, y **paid** son necesarios para la descripción del nuevo turno.

- Para modificar datos de un paciente utilice el comando **changeData**. Es necesario el parámetro **name** para definir que paciente desea modificar. Con el parámetro **data** define qué desea modificar exactamente. Este puede tener como valor **clientData**, que combinado con el parámetro **typeData** puede modificar el valor de **phone**. SI el parámetro data tiene como valor **appointment**, puede modificar los valores de cualquier dato de la última cita agendada (day, hour, etc). Especifique el nuevo dato a guardar con el parámetro **newData**. 
**Ejemplo: npm run dev -- changeData --name (value) --data (value) --newData (value) --typeData (value)**
_Recomendación: dejar attendance y paid en false para un mejor funcionamiento. Una vez true, no puede haber false_
_Aclaración: Al cambiar el número de teléfono, si este se ejecuta correctamente, el programa retornara 'Data changed successfully' y luego un objeto donde podra ver el número anterior. No te preocupes! Confía en el proceso, los datos han sido modificados correctamente_

- Puedes eliminar un turno utilizando el parámetro **deleteAppointment** especificando el nombre **name** del cliente y el día **day** de la cita a deseada.
_El parámetro **day** debe recibir el valor con el formato mencionado anteriormente_ 

- Por último, calcule el total de sus ingresos utilizando el comando **totalIncome**.

_Esperamos que el programa sea de su agrado. Se aceptan sugerencias para mejoras de funcionamiento_

***

**_ADVERTENCIA: AL BUSCAR POR NOMBRE SOLO TRAE UN SOLO RESULTADO, CUANTO MÁS ESPECÍFICO SEA, MEJOR_**