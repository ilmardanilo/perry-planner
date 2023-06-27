import { PORT } from "./config/environment-consts";
import { app } from "./config/app";

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} 🚀`);
});
