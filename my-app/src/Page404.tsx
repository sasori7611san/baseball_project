import { FC }from "react";
import { Link } from "react-router-dom";


export const Page404 = () => {
  return (
    <div>
      <h1>ページが見つかりません</h1>
      <Link to="/">タイトルに戻る</Link>
    </div>
  );
};