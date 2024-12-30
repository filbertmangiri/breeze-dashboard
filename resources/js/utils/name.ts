export const getNameInitial = (name: string) => {
  const chunks = name.split(',')

  if (chunks.length > 1) {
    const initials: string[] = []
    chunks.forEach((chunk) => initials.push(chunk[0]))
    return initials.join('')
  }

  const [fname, lname] = chunks[0].split(' ')

  return `${fname[0]}${lname ? lname[0] : ''}`
}
