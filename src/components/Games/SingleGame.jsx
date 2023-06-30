import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGames as getGamesApi } from "../../apis";

const SingleGame = () => {
  const location = useLocation();

  const [gameHtml, setGameHtml] = useState(null);

  useEffect(() => {
    if (location.pathname) {
      const pathnameArr = location.pathname.split("/");
      getGamesData(pathnameArr[2]);
    }
  }, [location]);

  async function getGamesData(type) {
    const data = await getGamesApi({ data: { type: type } });
    const game = data?.data?.game;
    setGameHtml(game);
  }

  return (
    <div style={{ paddingTop: "12rem" }}>
      {gameHtml ? <div dangerouslySetInnerHTML={{ __html: gameHtml }} /> : null}
    </div>
  );
};

export default SingleGame;
