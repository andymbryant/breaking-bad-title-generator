import backgroundImage from '../../assets/smoke-background.png'

function BackgroundImage() {
  const backgroundImageStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    objectFit: 'cover'
  }
  return <img alt='smoke on green background' src={backgroundImage} style={backgroundImageStyle}/>
}

export default BackgroundImage