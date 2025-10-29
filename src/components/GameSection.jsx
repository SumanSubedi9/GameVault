import GameCard from "./GameCard";

const GameSection = ({ title, games, seeMoreLink }) => {
  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {seeMoreLink && (
          <a
            href={seeMoreLink}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
          >
            See more →
          </a>
        )}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} variant="collection" />
        ))}
      </div>
    </section>
  );
};

export default GameSection;
