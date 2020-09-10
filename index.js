const pacientes = [
    {id: 1, nome: "Maria", idade: 20},
    {id: 2, nome: "Joao", idade: 30},
    {id: 3, nome: "Jose", idade: 45}
];

exports.handler = async (event) => {
    // TODO implement
    console.log("EXECUTOU!");
    console.log(event);
    
    const { pacienteId } = event;
    const pacienteEncontrado = pacientes.find(paciente => paciente.id == pacienteId)
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(pacienteEncontrado),
    };
    return response;
};

