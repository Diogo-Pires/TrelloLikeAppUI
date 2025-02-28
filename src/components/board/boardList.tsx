import { useEffect } from "react";
import { useBoardContext } from "../../contexts/boardContext";
import { fetchBoards } from "../../services/api";

const BoardList = () => {
  const { boards, setBoards } = useBoardContext();

  useEffect(() => {
    const getBoards = async () => {
      try {
        const data = await fetchBoards();
        setBoards(data);
      } catch (error) {
        console.error("Failed to fetch boards", error);
      }
    };

    getBoards();
  }, [setBoards]);

  return (
    <div>
      <h2>Boards</h2>
      <ul>
        {boards.map((board) => (
          <li key={board.id}>{board.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
