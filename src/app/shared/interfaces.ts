export interface User {
  email: string
  password: string
}

export interface NewUser {
  name: string
  email: string
  password: string
}

export interface Token {
  idToken: string
}