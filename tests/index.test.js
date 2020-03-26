import { main } from "../index";
import { storeJobs, getApiJobs } from "../services";
import dotenv from 'dotenv';
dotenv.config();

const bucketName = process.env.BUCKET_NAME;

let apiJobs;

beforeEach(async () => {
  apiJobs = await getApiJobs(
    "https://api.lever.co/v0/postings/startuplifers?mode=json"
  );
});

describe("Test api", () => {
  test("Jobs api returns something", () => {
    expect(apiJobs.length).toBeGreaterThan(0);
  });
});

describe("Test index function", () => {
  test("Sending all of the jobs when store is empty", async () => {
    const emptyJobs = [];
    await storeJobs(bucketName, "jobs.json", emptyJobs);
    const res = await main();
    expect(res.body.jobsSent.length).toEqual(apiJobs.length);
  }, 30000);
  
  test("Sending none of the jobs when store is same as api", async () => {
    await storeJobs(bucketName, "jobs.json", apiJobs);
    const res = await main();
    expect(res.body.jobsSent.length).toEqual(0);
  }, 30000);
  
  test("The first job is new when it's missing from store", async () => {
    const removedJob = apiJobs.shift();
    await storeJobs(bucketName, "jobs.json", apiJobs);
    const res = await main();
    expect(res.body.jobsSent[0].id).toEqual(removedJob.id);
  }, 30000);
  
  test("Sent jobs array length is 1 when the difference between api and store is 1", async () => {
    apiJobs.shift();
    await storeJobs(bucketName, "jobs.json", apiJobs);
    const res = await main();
    expect(res.body.jobsSent.length).toEqual(1);
  }, 30000);
  
})
