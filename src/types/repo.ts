export type iRepo = {
  picture: string,
  name: string,
  repo: string,
  link: string,
  about: string,
  stars: number,
  forks: number
}

export type iURLParams = {
  language: string
}

export type iRepoCard = {
  repo: iRepo
}