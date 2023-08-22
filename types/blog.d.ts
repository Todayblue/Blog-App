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
  category: Category;
}
