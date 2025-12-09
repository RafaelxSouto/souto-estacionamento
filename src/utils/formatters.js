/**
 * Formata data que pode vir como array [ano, mes, dia] ou string ISO
 */
export const formatDate = (dateArray) => {
  if (!dateArray) return 'N/A'
  // Se for array [ano, mes, dia]
  if (Array.isArray(dateArray)) {
    const [year, month, day] = dateArray
    return new Date(year, month - 1, day).toLocaleDateString('pt-BR')
  }
  // Se for string ISO
  return new Date(dateArray).toLocaleDateString('pt-BR')
}

/**
 * Formata hora que pode vir como array [hora, minuto, segundo] ou string
 */
export const formatTime = (timeArray) => {
  if (!timeArray) return 'N/A'
  // Se for array [hora, minuto, segundo]
  if (Array.isArray(timeArray)) {
    const [hour, minute] = timeArray
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  }
  // Se for string
  return timeArray
}

/**
 * Formata valor monetário em BRL
 */
export const formatCurrency = (value) => {
  if (!value && value !== 0) return 'R$ 0,00'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Aplica máscara de placa brasileira (ABC-1234 ou ABC1D23)
 */
export const formatPlaca = (value) => {
  // Remove tudo que não é letra ou número
  const limpo = value.replace(/[^A-Z0-9]/g, '')
  // Formata ABC1234 ou ABC1D23
  if (limpo.length <= 3) {
    return limpo
  } else if (limpo.length <= 7) {
    return `${limpo.slice(0, 3)}-${limpo.slice(3)}`
  }
  return `${limpo.slice(0, 3)}-${limpo.slice(3, 7)}`
}

/**
 * Remove máscara da placa e retorna apenas letras e números
 */
export const cleanPlaca = (placa) => {
  return placa.replace(/[^A-Z0-9]/g, '')
}

/**
 * Valida formato de placa brasileira
 */
export const isValidPlaca = (placa) => {
  const limpa = cleanPlaca(placa)
  return limpa.length === 7
}
