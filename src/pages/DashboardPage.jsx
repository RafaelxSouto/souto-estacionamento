import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import RefreshIcon from '@mui/icons-material/Refresh'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../services/api'

const DashboardPage = () => {
  const [veiculos, setVeiculos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchVeiculos = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.get('/api/veiculos')
      setVeiculos(response.data)
    } catch (err) {
      setError('Erro ao carregar veículos. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVeiculos()
  }, [])

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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Visão geral dos veículos estacionados
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={fetchVeiculos}
          disabled={loading}
          sx={{ px: 3 }}
        >
          Atualizar
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              height: '100%',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    Veículos Ativos
                  </Typography>
                  <Typography variant="h2" component="div" sx={{ fontWeight: 700 }}>
                    {veiculos.length}
                  </Typography>
                </Box>
                <DirectionsCarIcon sx={{ fontSize: 70, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Veículos Estacionados
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, backgroundColor: '#f8fafc' }}>Placa</TableCell>
                  <TableCell sx={{ fontWeight: 600, backgroundColor: '#f8fafc' }}>Data de Entrada</TableCell>
                  <TableCell sx={{ fontWeight: 600, backgroundColor: '#f8fafc' }}>Horário de Entrada</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : veiculos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
                      <Typography variant="body1" color="text.secondary">
                        Nenhum veículo estacionado no momento
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  veiculos.map((veiculo, index) => (
                    <TableRow key={veiculo.id || index} hover>
                      <TableCell>{veiculo.placa}</TableCell>
                      <TableCell>{formatDate(veiculo.dataEntrada)}</TableCell>
                      <TableCell>{formatTime(veiculo.horarioEntrada)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default DashboardPage
