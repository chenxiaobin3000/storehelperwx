const imageSrc = ['']
if (typeof __wxConfig == 'object') {
  const version = __wxConfig.envVersion;
  if (version == 'develop') {
    imageSrc.push('http://127.0.0.1:8000/')
  } else if (version == 'trial') {
    imageSrc.push('https://www.jishuzhushou.com/')
  } else if (version == 'release') {
    imageSrc.push('https://www.jishuzhushou.com/')
  }
}

module.exports = {
  imageSrc
}