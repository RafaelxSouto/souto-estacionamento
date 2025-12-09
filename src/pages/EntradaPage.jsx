import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import api from '../services/api'

const EntradaPage = () => {
  const [placa, setPlaca] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [veiculoRegistrado, setVeiculoRegistrado] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!placa.trim()) {
      setError('Por favor, informe a placa do veículo.')
      return
    }

    // Validar formato de placa
    const placaLimpa = placa.replace(/[^A-Z0-9]/g, '')
    if (placaLimpa.length !== 7) {
      setError('Placa inválida. Use o formato ABC-1234 ou ABC1D23')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/api/veiculos/entrada', { placa: placaLimpa })
      // A resposta vem em response.data.veiculo
      setVeiculoRegistrado(response.data.veiculo || response.data)
      setOpenModal(true)
      setPlaca('')
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        'Erro ao registrar entrada. Tente novamente.'
      setError(typeof errorMessage === 'string' ? errorMessage : 'Erro ao registrar entrada. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setVeiculoRegistrado(null)
  }

  const formatDate = (dateArray) => {
    if (!dateArray) return 'N/A'
    // Se for array [ano, mes, dia]
    if (Array.isArray(dateArray)) {
      const [year, month, day] = dateArray
      return new Date(year, month - 1, day).toLocaleDateString('pt-BR')
    }
    // Se for string ISO
    return new Date(dateArray).toLocaleDateString('pt-BR')
  }

  const formatTime = (timeArray) => {
    if (!timeArray) return 'N/A'
    // Se for array [hora, minuto, segundo]
    if (Array.isArray(timeArray)) {
      const [hour, minute] = timeArray
      return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    }
    // Se for string
    return timeArray
  }

  const formatPlaca = (value) => {
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
        Entrada de Veículo
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <DirectionsCarIcon sx={{ fontSize: 80, color: 'primary.main' }} />
        </Box>

        <Typography variant="h6" align="center" sx={{ mb: 3 }}>
          Registrar Entrada de Veículo
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            required
            label="Placa do Veículo"
            value={placa}
            onChange={(e) => {
              const value = e.target.value.toUpperCase()
              setPlaca(formatPlaca(value))
            }}
            placeholder="ABC-1234 ou ABC1D23"
            disabled={loading}
            inputProps={{ maxLength: 8, style: { textTransform: 'uppercase' } }}
            helperText="Formato: ABC-1234 (antigo) ou ABC1D23 (Mercosul)"
            sx={{ mb: 3 }}
          />

          <Button type="submit" fullWidth variant="contained" size="large" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Registrar Entrada'}
          </Button>
        </Box>
      </Paper>

      {/* Success Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'success.main', color: 'white' }}>Entrada Registrada com Sucesso!</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {veiculoRegistrado && (
            <Box>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Placa:</strong> {veiculoRegistrado.placa}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Data:</strong> {formatDate(veiculoRegistrado.dataEntrada)}
              </Typography>
              <Typography variant="body1">
                <strong>Horário:</strong> {formatTime(veiculoRegistrado.horarioEntrada)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="contained">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default EntradaPage
