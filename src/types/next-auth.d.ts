import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    role: 'CANDIDATE' | 'ACCOUNT_MANAGER' | 'COMPLIANCE' | 'ADMIN'
  }

  interface Session {
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
      role: 'CANDIDATE' | 'ACCOUNT_MANAGER' | 'COMPLIANCE' | 'ADMIN'
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: 'CANDIDATE' | 'ACCOUNT_MANAGER' | 'COMPLIANCE' | 'ADMIN'
    firstName: string
    lastName: string
  }
}
