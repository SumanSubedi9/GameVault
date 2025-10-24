import React from "react";
import { useParams, Link } from "react-router-dom";
import { games } from "../data";

const GameDetails: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const game = games.find(g => g.title === decodeURIComponent(title ?? ""));

  if (!game) {
    return (
      <div className="container">
        <h2>Game not found</h2>
        <Link to="/">Back to Store</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{game.title}</h1>
      <p><strong>Genre:</strong> {game.genre}</p>
      <p><strong>Platform:</strong> {game.platform}</p>
      <p><strong>Price:</strong> ${game.price.toFixed(2)}</p>
      <Link to="/">← Back to Store</Link>
    </div>
  );
};

export default GameDetails;
