export function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-ink-900/10" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white text-grey-500">or continue with email</span>
      </div>
    </div>
  )
}

