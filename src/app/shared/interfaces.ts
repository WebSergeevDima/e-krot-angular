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

export interface FeedbackMessage {
  message: string
  name: string
  email: string
  accessToken: string
}

