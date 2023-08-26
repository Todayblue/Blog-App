// models.ts

export interface Account {
  id: number;
  userId: number;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  id_token: string;
  session_state: string;
  user: User;
}

export interface Session {
  id: number;
  sessionToken: string;
  userId: number;
  expires: Date;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  profile: Profile;
  accounts: Account[];
  sessions: Session[];
  blogs: Blog[];
  role: "USER" | "ADMIN";
}

export interface Profile {
  id: number;
  bio: string;
  user: User;
  userId: number;
}

export interface Blog {
  id: number;
  createdAt: Date;
  title: string;
  content: string;
  coverImage: string;
  author: User;
  authorId: number;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  blogs: Blog[];
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}
