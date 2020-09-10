'use strict'
const pacientes = [
  { id: 1, nome: 'Maria', dataNascimento: '1984-11-01' },
  { id: 2, nome: 'Joao', dataNascimento: '1980-01-16' },
  { id: 3, nome: 'Jose', dataNascimento: '1998-06-06' }
]

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const params = {
  TableName: 'PACIENTES'
}

module.exports.listarPacientes = async event => {
  try {
    let data = await dynamoDb.scan(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (err) {
    console.log('Error', err)
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : 'Exception',
        message: err.message ? err.message : 'Unknown error'
      })
    }
  }
}

module.exports.obterPaciente = async event => {
  const { pacienteId } = event.pathParameters

  const paciente = pacientes.find(paciente => paciente.id == pacienteId)

  if (paciente === undefined) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Paciente não existe' }, null, 2)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        paciente
      },
      null,
      2
    )
  }
}
