import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-4 md:h-16 md:flex-row md:py-0 max-w-screen-2xl">
        <div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} UniversalDash. Todos os direitos
          reservados.
        </div>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="#" className="transition-colors hover:text-foreground">
            Termos de Serviço
          </Link>
          <Link to="#" className="transition-colors hover:text-foreground">
            Política de Privacidade
          </Link>
        </nav>
      </div>
    </footer>
  )
}
