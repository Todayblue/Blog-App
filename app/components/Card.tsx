import Link from "next/link";
import Image from "next/image";

type CardProps = {
  id: string;
  title: string;
  content: string;
  cover: string;
  category: string;
};

const Card = ({ id, title, cover, content, category }: CardProps) => {
  const cleanBody =
    content &&
    content.replace(/<br\s?\/?>|<u\s?\/?>|<strong\s?\/?>|<em\s?\/?>/g, "");

  return (
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
        <div className="p-6">
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
            dangerouslySetInnerHTML={{ __html: cleanBody }}
            className="line-clamp"
          ></div>
          <p>{category}</p>
          {id && (
            <Link
              href={`/blog/${id}`}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Learn more &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
