import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avartarUrl: String,
  facebookId: Number,
  githubId: Number
});
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
// 어떤 field를 username으로 할 것인지를 알려줘야한다.
const model = mongoose.model("User", UserSchema);

export default model;
