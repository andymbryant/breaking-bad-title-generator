import './Footer.css'
import { useTheme } from '@material-ui/core/styles';

function Footer() {
  const theme = useTheme()
  const footerTitleStyle = {
    color: theme.palette.primary.main,
    fontWeight: 700
  }
  const codeLinkStyle = {
    color: theme.palette.primary.main
  }
  return (
    <footer>
      <span className='footer-ctr'>
        <span style={footerTitleStyle} className='footer-title'>Breaking Bad Title Generator</span>
        <span> • </span>
        <span className='copyright'>© 2021 Andy Bryant</span>
        <span> • </span>
        <a style={codeLinkStyle} className='code-link' href="https://github.com/andymbryant/breaking-bad-title-generator" target='_blank' rel="noreferrer">Code</a>
      </span>
    </footer>
  )
}

export default Footer