import { getMovieDetails } from "@/app/actions";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatRuntime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="relative">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        width={1080}
        height={1000}
        className="object-cover w-full"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
      <div className="absolute bottom-0 left-0 right-0 px-6 py-8">
        <div className="flex gap-6">
          <div className="relative flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              height={460}
              width={250}
              className="rounded-lg object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-end">
            <h1 className="text-4xl font-bold flex items-center gap-4">
              {movie.title}
              <span className="text-muted-foreground">
                ({new Date(movie.release_date).getFullYear()})
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
              >
                <Heart className="h-6 w-6" />
              </Button>
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-6">
              <div>
                <p className="font-medium">{formatRuntime(movie.runtime)}</p>
              </div>
            </div>
            {movie.tagline && (
              <p className="mt-2 text-lg italic text-muted-foreground">
                {movie.tagline}
              </p>
            )}
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-2 text-muted-foreground">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
