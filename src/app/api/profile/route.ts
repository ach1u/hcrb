import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: {
        employmentHistory: {
          orderBy: { startDate: 'desc' }
        },
        education: {
          orderBy: { endDate: 'desc' }
        },
        certifications: {
          where: { isActive: true },
          orderBy: { issueDate: 'desc' }
        },
        skills: {
          include: {
            skill: true
          }
        },
        specialties: {
          include: {
            specialty: true
          }
        },
        visaHistory: {
          orderBy: { issueDate: 'desc' }
        },
        residenceHistory: {
          orderBy: { startDate: 'desc' }
        },
        familyMembers: true
      }
    })

    if (!profile) {
      // Create a basic profile if none exists
      const newProfile = await prisma.profile.create({
        data: {
          userId: session.user.id,
          profileStatus: 'INCOMPLETE',
          completionScore: 0
        },
        include: {
          employmentHistory: true,
          education: true,
          certifications: true,
          skills: {
            include: {
              skill: true
            }
          },
          specialties: {
            include: {
              specialty: true
            }
          },
          visaHistory: true,
          residenceHistory: true,
          familyMembers: true
        }
      })
      
      return NextResponse.json(newProfile)
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    const updatedProfile = await prisma.profile.update({
      where: { userId: session.user.id },
      data: {
        ...data,
        lastUpdated: new Date()
      },
      include: {
        employmentHistory: {
          orderBy: { startDate: 'desc' }
        },
        education: {
          orderBy: { endDate: 'desc' }
        },
        certifications: {
          where: { isActive: true },
          orderBy: { issueDate: 'desc' }
        },
        skills: {
          include: {
            skill: true
          }
        },
        specialties: {
          include: {
            specialty: true
          }
        },
        visaHistory: {
          orderBy: { issueDate: 'desc' }
        },
        residenceHistory: {
          orderBy: { startDate: 'desc' }
        },
        familyMembers: true
      }
    })

    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
