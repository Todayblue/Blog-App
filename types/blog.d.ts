export interface Category {
  id: string;
  name: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  coverImage: string;
  authorId: string;
  category: Category;
}
