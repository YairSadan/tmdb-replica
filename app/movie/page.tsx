import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getMovies } from "../actions";
import Image from "next/image";

type searchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page({
  searchParams,
}: {
  searchParams: searchParams;
}) {
  const params = await searchParams;
  const movies = await getMovies(
    params.pageIndex ? Number(params.pageIndex) : undefined,
    params.airingNow === "true"
  );
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {movies.map((movie) => (
          <Card key={movie.id} className="group relative hover:cursor-pointer">
            <div className="relative">
              <Image
                width={170}
                height={255}
                alt={movie.title}
                className="rounded-lg w-full h-auto transition-transform duration-200 group-hover:opacity-75"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
              <div className="absolute bottom-[-20px] left-2 w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {(movie.vote_average * 10).toFixed(0)}%
                </span>
              </div>
              <svg className="absolute bottom-[-20px] left-2 w-10 h-10">
                <circle
                  className="stroke-current text-gray-300"
                  strokeWidth="3"
                  fill="transparent"
                  r="18"
                  cx="20"
                  cy="20"
                />
                <circle
                  className={`stroke-current ${
                    movie.vote_average >= 7
                      ? "text-green-500"
                      : movie.vote_average >= 4
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                  strokeWidth="3"
                  fill="transparent"
                  r="18"
                  cx="20"
                  cy="20"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 18 * (1 - movie.vote_average / 10)
                  }`}
                  transform="rotate(-90 20 20)"
                />
              </svg>
            </div>
            <CardContent className="pt-6 px-2">
              <h3 className="font-bold text-sm mt-2 hover:text-blue-400">
                {movie.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {new Date(movie.release_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
