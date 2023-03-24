import { User } from '../types/user'

const dummyUsers: User[] = [
  {
    id: 'id1',
    email: 'user@test.com',
    password: '$2a$10$j2RghrZW4ozZf6Gw6fq.kuPoYJ3T6VUjdNXgvCmH5I/GlbdYYuaHy', //Hashed version of 'testuser'
  },
  {
    id: 'id2',
    email: 'user2@test.com',
    password: '$2a$10$YpAwPRh1x0GvOi/sy1Qa..u1Yh8StpndaQ3lW8WLtBQBQ2NVErrwy', //Hashed version of 'testuser2'
  },
  {
    id: 'id3',
    email: 'user3@test.com',
    password: '$2a$10$PsAVLWT9c8kxzLd.jmD03OvGznDGB1FUvxnLxz.06HUT/HAfxFJ/O', //Hashed version of 'testuser3'
  },
]

export const getUserByEmail = (email: string) => {
  return dummyUsers.find((user) => user.email === email)
}

export const getUserById = (id: string) => {
  return dummyUsers.find((user) => user.id === id)
}
