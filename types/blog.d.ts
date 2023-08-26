export interface Author {
  id: number;
  name: string;
  email: string;
  emailVerified: null | boolean;
  image: string;
  role: "USER" | "ADMIN";
}

export interface Category {
  id: string;
  name: string;
  blogIDs: string[];
  blogs: Blog[];
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string;
  coverImage: string;
  authorId: string;
  author: Author;
  categoryIDs: string[];
  categories: Category[];
}
