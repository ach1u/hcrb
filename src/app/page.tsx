'use client'

import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button,
  Chip,
  Avatar,
  Stack
} from '@mui/material'
import { 
  Person as PersonIcon,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material'
import { useSession } from 'next-auth/react'

export default function HomePage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    )
  }

  if (!session) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box textAlign="center" py={8}>
          <Typography variant="h2" gutterBottom>
            Health Carousel Resume Builder
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Professional resume builder and profile management system for healthcare staffing
          </Typography>
          <Box mt={4}>
            <Button 
              variant="contained" 
              size="large" 
              sx={{ mr: 2 }}
            >
              Sign In
            </Button>
            <Button 
              variant="outlined" 
              size="large"
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    )
  }

  const getDashboardCards = () => {
    const baseCards = [
      {
        title: 'Profile Management',
        description: 'Manage your personal and professional information',
        icon: <PersonIcon />,
        href: '/profile',
        color: 'primary' as const
      },
      {
        title: 'Employment History',
        description: 'Track and validate your work experience',
        icon: <WorkIcon />,
        href: '/profile/employment',
        color: 'secondary' as const
      },
      {
        title: 'Resume Generator',
        description: 'Create professional resumes with AI assistance',
        icon: <AssignmentIcon />,
        href: '/resumes',
        color: 'success' as const
      }
    ]

    if (session.user.role === 'ACCOUNT_MANAGER' || session.user.role === 'ADMIN') {
      baseCards.push({
        title: 'Analytics Dashboard',
        description: 'View candidate metrics and system analytics',
        icon: <AnalyticsIcon />,
        href: '/admin/analytics',
        color: 'secondary' as const
      })
    }

    return baseCards
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {session.user.firstName?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography variant="h4">
              Welcome back, {session.user.firstName || 'User'}!
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Chip 
                label={session.user.role?.replace('_', ' ') || 'User'} 
                size="small" 
                color="primary" 
                variant="outlined" 
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Dashboard Cards */}
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        {getDashboardCards().map((card, index) => (
          <Card 
            key={index}
            sx={{ 
              flex: 1,
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: `${card.color}.main`, mr: 2 }}>
                  {card.icon}
                </Avatar>
                <Typography variant="h6" component="h2">
                  {card.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Quick Stats */}
      <Box mt={6}>
        <Typography variant="h5" gutterBottom>
          Quick Overview
        </Typography>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Box textAlign="center">
                <Typography variant="h3" color="primary.main">
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Resumes Generated
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Box textAlign="center">
                <Typography variant="h3" color="success.main">
                  0%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Profile Completion
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Box textAlign="center">
                <Typography variant="h3" color="warning.main">
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Approvals
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* Recent Activity */}
      <Box mt={6}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
              No recent activity to display. Start by completing your profile!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
