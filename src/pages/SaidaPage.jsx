import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import SearchIcon from '@mui/icons-material/Search'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import api from '../services/api'

const SaidaPage = () => {
  const [placa, setPlaca] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [veiculoEncontrado, setVeiculoEncontrado] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [recibo, setRecibo] = useState(null)
  const [searchMode, setSearchMode] = useState(true)

  const handleSearch = async (e) => {
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
      const response = await api.get('/api/veiculos')
      const veiculo = response.data.find((v) => v.placa.replace(/[^A-Z0-9]/g, '') === placaLimpa)

      if (veiculo) {
        setVeiculoEncontrado(veiculo)
        setSearchMode(false)
      } else {
        setError('Veículo não encontrado no estacionamento.')
      }
    } catch (err) {
      setError('Erro ao buscar veículo. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegistrarSaida = async () => {
    setLoading(true)
    setError('')

    try {
      const placaLimpa = veiculoEncontrado.placa.replace(/[^A-Z0-9]/g, '')
      const response = await api.put('/api/veiculos/saida', { placa: placaLimpa })
      // A resposta vem em response.data.veiculo
      setRecibo(response.data.veiculo || response.data)
      setOpenModal(true)
      setVeiculoEncontrado(null)
      setPlaca('')
      setSearchMode(true)
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        'Erro ao registrar saída. Tente novamente.'
      setError(typeof errorMessage === 'string' ? errorMessage : 'Erro ao registrar saída. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setRecibo(null)
  }

  const handleNovaConsulta = () => {
    setVeiculoEncontrado(null)
    setPlaca('')
    setSearchMode(true)
    setError('')
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

  const formatCurrency = (value) => {
    if (!value && value !== 0) return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
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
        Saída de Veículo
      </Typography>

      {searchMode ? (
        // Search Mode
        <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <SearchIcon sx={{ fontSize: 80, color: 'primary.main' }} />
          </Box>

          <Typography variant="h6" align="center" sx={{ mb: 3 }}>
            Buscar Veículo
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSearch} noValidate>
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
            >
              {loading ? 'Buscando...' : 'Buscar Veículo'}
            </Button>
          </Box>
        </Paper>
      ) : (
        // Confirmation Mode
        <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <ExitToAppIcon sx={{ fontSize: 80, color: 'primary.main' }} />
          </Box>

          <Typography variant="h6" align="center" sx={{ mb: 3 }}>
            Confirmar Saída
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {veiculoEncontrado.placa}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Data de Entrada:</strong> {formatDate(veiculoEncontrado.dataEntrada)}
              </Typography>
              <Typography variant="body1">
                <strong>Horário de Entrada:</strong> {formatTime(veiculoEncontrado.horarioEntrada)}
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button fullWidth variant="outlined" onClick={handleNovaConsulta} disabled={loading}>
              Cancelar
            </Button>
            <Button fullWidth variant="contained" color="success" onClick={handleRegistrarSaida} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Registrar Saída'}
            </Button>
          </Box>
        </Paper>
      )}

      {/* Receipt Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'success.main', color: 'white' }}>Saída Registrada com Sucesso!</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {recibo && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Recibo de Pagamento
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Placa:</strong> {recibo.placa}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Entrada:</strong> {formatDate(recibo.dataEntrada)} às {formatTime(recibo.horarioEntrada)}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Saída:</strong> {formatDate(recibo.dataSaida)} às {formatTime(recibo.horarioSaida)}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" color="primary" align="center">
                <strong>Valor a Pagar: {formatCurrency(recibo.valorPago)}</strong>
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

export default SaidaPage
