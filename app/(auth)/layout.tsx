export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Auth pages use the main layout (Header/Footer)
  // This layout exists for potential future auth-specific styling
  return <>{children}</>
}

