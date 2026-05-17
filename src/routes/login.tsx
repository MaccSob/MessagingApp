import { createFileRoute } from '@tanstack/react-router'
import LoginComponent from '../login'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

