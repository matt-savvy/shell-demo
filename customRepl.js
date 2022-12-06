const repl = require("repl");
const { connect } = require("./utils/connect");
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/shell-demo";
const { User } = require("./models");
const { UserFactory } = require("./factories");

(async () => {
  console.log("connecting to database...");
  try {
    await connect(MONGO_URI);
    console.log("connected");
    startRepl();
  } catch (err) {
    console.error(err);
  }
})();

// These will be globals for the repl
const context = {
  User,
  UserFactory,
};

function startRepl() {
  const r = repl.start("> ");
  for (let key in context) {
    r.context[key] = context[key];
  }
}
