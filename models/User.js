import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "committee", "villager"],
      default: "villager",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     role: {
//       type: String,
//       enum: ["admin", "committee", "villager"],
//       default: "villager",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model("User", userSchema);
// export default User;
