const imageSrc = ['']
if (typeof __wxConfig == 'object') {
  const version = __wxConfig.envVersion;
  if (version == 'develop') {
    imageSrc.push('http://192.168.0.100:8000/')
  } else if (version == 'trial') {
    imageSrc.push('http://127.0.0.1:8000/')
  } else if (version == 'release') {
    imageSrc.push('http://127.0.0.1:8000/')
  }
}

module.exports = {
  imageSrc
}