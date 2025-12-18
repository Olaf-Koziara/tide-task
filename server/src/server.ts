import { app } from "./app";
import { env } from "./config/env";

const server = app.listen(env.PORT, () => {
    console.log(`App listening on port ${env.PORT}`);
});

export { server };

