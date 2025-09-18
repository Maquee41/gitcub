import GithubLogo from '@/assets/github.svg'
import './Header.scss'

interface HeaderProps {
  logoUrl?: string
}

const Header = ({ logoUrl }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <img
            className="header-logo-image"
            src={GithubLogo}
            alt="github logo"
          />
          <span className="header-logo-title">GitCub</span>
        </div>
        {logoUrl && (
          <img className="header-user-logo" src={logoUrl} alt="user logo" />
        )}
      </div>
    </header>
  )
}

export default Header
