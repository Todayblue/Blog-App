export interface Author {
  id: string;
  name: string;
  email: string;
  emailVerified: null | boolean;
  image: string;
  role: "USER" | "ADMIN";
}

export interface Category {
  id: string;
  name: string;
  blogs: Blog[];
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  authorId: string;
  author: Author;
  category: Category;
}
