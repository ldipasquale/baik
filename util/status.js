import status from 'constants/status'

const estados = {
  disponible: status.AVAILABLE,
  vacia: status.EMPTY,
  inhabilitada: status.DISABLED,
}

function mapEstadoToStatus(estado) {
  return estados[estado]
}

export {
  mapEstadoToStatus,
}
