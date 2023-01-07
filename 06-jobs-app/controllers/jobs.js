const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// getting all jobs created by the authenticated user
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs, countJobs: jobs.length });
};

// getting a single job created by the authenticated user
const getJob = async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) throw new NotFoundError(`No job with id ${jobId}`);
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  // remember: req.user is set at the authentication middleware
  // (see './middleware/authentication.js')
  const userId = req.user.userId;
  const newJob = await Job.create({
    ...req.body,
    createdBy: userId,
  });
  res.status(StatusCodes.CREATED).json({ newJob });
};

const updateJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const { company, position } = req.body;

  if (company === "" || position === "")
    throw new BadRequestError("Please provide company and position");

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    { ...req.body },
    {
      runValidators: true,
      returnDocument: "after",
    }
  );
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) throw new NotFoundError(`No job with id ${jobId}`);
  res.status(StatusCodes.OK).json({ job });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
