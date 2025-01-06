export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden">
      <div className="flex items-center justify-center">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-sm">
            <div className="flex items-center justify-center text-lg font-medium mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              Agentity
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 