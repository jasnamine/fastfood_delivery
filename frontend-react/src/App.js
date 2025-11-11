import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";

import Routers from "./Routers/Routers";
import darkTheme from "./theme/DarkTheme";

function App() {
  // const dispatch = useDispatch();
  // const { auth } = useSelector((store) => store);
  // const user = useSelector(state => state.auth?.user)
  // const jwt = localStorage.getItem("jwt");

  // useEffect(() => {

  //   if (jwt) {
  //     dispatch(getUser({id: user?.id, jwt}));

  //   }
  // }, [auth.jwt]);

  // useEffect(() => {
  //   if (auth.user?.role == "ROLE_RESTAURANT_OWNER") {
  //     dispatch(getRestaurantByUserId(auth.jwt || jwt));
  //   }
  // }, [auth.user]);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
