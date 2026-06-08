import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema(
  // {
  //   username: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //   },
  //   firstName: {
  //     type: String,
  //     required: true,
  //   },
  //   lastName: {
  //     type: String,
  //   },
  //   dob: {
  //     type: Date,
  //     required: true,
  //   },
  //   qualification: {
  //     type: String,
  //     required: true,
  //   },
  //   join: {
  //     type: Number,
  //     required: true,
  //   },
  //   location: {
  //     type: String,
  //     required: true,
  //   },
  //   description: {
  //     type: String,
  //   },
  // },
  // { timestamps: true }


  // username,
  // fullName,
  // party,
  // position,
  // age,
  // address,
  // qualification,
  // symbol,
  // location,
  // electionArea,
  // description,
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    party: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      // unique: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    electionArea: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", CandidateSchema);
export default Candidate;
