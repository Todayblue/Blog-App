"use client";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type CardProps = {
  id: string;
  title: string;
  content: string;
  cover: string;
  category: string;
  slug: string;
};

const Card = ({ id, slug, title, cover, content, category }: CardProps) => {
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
            cover && "h-full"
          }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
        >
          {cover &&
            (id ? (
              <Link href={`/blog/${id}`} aria-label={`Link to ${title}`}>
                <Image
                  alt={title}
                  src={cover}
                  className="object-cover object-center md:h-72 lg:h-60"
                  width={544}
                  height={306}
                />
              </Link>
            ) : (
              <Image
                alt={title}
                src={cover}
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
              <div className="flex flex-row justify-between py-4">
                <div className="badge badge-lg ">{category}</div>
                <Link
                  href={`/blog/${id}`}
                  className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 "
                  aria-label={`Link to ${title}`}
                >
                  read more... &rarr;
                </Link>
              </div>
            )}

            {/* <div className="flex justify-end pb-4">
              <button onClick={handleDelete}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
