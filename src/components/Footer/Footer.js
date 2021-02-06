import './Footer.css'

function Footer() {
  return (
    <footer>
      <span className='footer-ctr'>
        <span className='footer-title'>Breaking Bad Title Generator</span>
        <span> • </span>
        <span className='copyright'>© 2021 Andy Bryant</span>
        <span> • </span>
        <a className='code-link' href="https://github.com/andymbryant/breaking-bad-title-generator" target='_blank' rel="noreferrer">Code</a>
      </span>
    </footer>
  )
}

export default Footer