import GameCard from "../../components/GameCard/GameCard";
import { Link } from "react-router-dom";
import "./Home.css";

const games = [
  { name: "Tic Tac Toe", description: "A classic game of Xs and Os" },
  { name: "Bingo", description: "Mark the numbers and complete a line!" },
];

const Home = () => {
  return (
    <div className="home">
      <h1>Available Games</h1>
      <div className="game-list">
        {games.map((game) => (
          <Link to={`/game/${game.name}`} key={game.name}>
            <GameCard game={game} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
