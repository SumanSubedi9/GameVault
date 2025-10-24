import React from "react";
import { useNavigate } from "react-router-dom";
import { games } from "../data";

const GameTable: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (title: string) => {
    navigate(`/details/${encodeURIComponent(title)}`);
  };

  return (
    <div className="container">
      <h1>Game Store</h1>
      <table>
        <thead>
          <tr>
            <th>Genre</th>
            <th>Platform</th>
            <th>Price</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={index}>
              <td>{game.genre}</td>
              <td>{game.platform}</td>
              <td>${game.price.toFixed(2)}</td>
              <td
                className="clickable"
                onClick={() => handleRowClick(game.title)}
              >
                {game.title}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameTable;
