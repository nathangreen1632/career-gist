import { JobModel } from '../models/JobQueryModel';

export const seedJobQueries = async () => {
    await JobModel.bulkCreate([
        {
            query: 'frontend developer remote',
            results: JSON.stringify([{ jobTitle: 'Frontend Developer', company: 'Tech Corp', location: 'Remote' }]),
            user_id: 1,
        },
        {
            query: 'backend developer onsite',
            results: JSON.stringify([{ jobTitle: 'Backend Developer', company: 'Innovate Ltd', location: 'Onsite' }]),
            user_id: 2,
        },
        {
            query: 'full stack engineer hybrid',
            results: JSON.stringify([{ jobTitle: 'Full Stack Engineer', company: 'Dev Solutions', location: 'Hybrid' }]),
            user_id: 3,
        },
    ]);
};