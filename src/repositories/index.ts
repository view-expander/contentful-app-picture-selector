import { SourceRepository } from './source'

const repositories = {
  source: new SourceRepository(),
}

export const RepositoryFactory = {
  get(name: keyof typeof repositories): typeof repositories[typeof name] {
    return repositories[name]
  },
}
