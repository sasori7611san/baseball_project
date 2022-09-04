import { Route, Switch } from "react-router-dom";
import { PlayGamen } from "../PlayGamen";
import { TitleGamen } from "../TitleGamen";
import { Page404 } from "../Page404";

export const Router = () => {
    return (
      <Switch>
        <Route exact path="/">
          <TitleGamen />
        </Route>
        <Route path="/playGamen" >
          <PlayGamen />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    );
}