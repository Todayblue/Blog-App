"use client";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Tag } from "@/types/model";

type CardProps = {
  id: number;
  title: string;
  content: string;
  coverImage: string;
  // authorId: number;
  tags: Tag[];
};

const Card = ({ id, title, coverImage, content, tags }: CardProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      axios.delete(`/api/blog/${id}`);
      toast.success("Delete Blog Successfully");
      router.push("/blog");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-md mx-auto">
        <div
          className={`${
            coverImage && "h-full"
          }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
        >
          {coverImage &&
            (id ? (
              <Link href={`/blog/${id}`} aria-label={`Link to ${title}`}>
                <Image
                  alt={title}
                  src={coverImage}
                  className="object-cover object-center md:h-72 lg:h-60"
                  width={544}
                  height={306}
                />
              </Link>
            ) : (
              <Image
                alt={title}
                src={coverImage}
                className="object-cover object-center md:h-72 lg:h-60"
                width={544}
                height={306}
              />
            ))}

          <div className="px-5 pt-4">
            <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
              {id ? (
                <Link href={`/blog/${id}`} aria-label={`Link to ${title}`}>
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="line-clamp"
            ></div>

            {id && (
              <div className="flex flex-row justify-between py-4 ">
                <div className="flex flex-row space-x-3 font-medium ">
                  {tags.map((tag) => (
                    <div className="badge badge-lg">{tag.name}</div>
                  ))}
                </div>
                <Link
                  href={`/blog/${id}`}
                  className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 "
                  aria-label={`Link to ${title}`}
                >
                  read more... &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
