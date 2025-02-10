import { seedCompanies } from './company-seeds.js';
import { seedJobs } from './job-seeds.js';
import { seedUsers } from './user-seeds.js';
import { seedApplications } from './application-seeds.js';
import { seedSkills } from './skill-seeds.js';
import { seedJobContacts } from './jobContactInfo-seeds.js';
import { seedJobQueries } from './jobQuery-seeds.js';
import { sequelize } from '../models/index.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedCompanies();
    console.log('\n----- COMPANIES SEEDED -----\n');
    
    await seedJobs();
    console.log('\n----- JOBS SEEDED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedJobQueries();
    console.log('\n----- JOB QUERIES SEEDED -----\n');
    
    await seedApplications();
    console.log('\n----- APPLICATIONS SEEDED -----\n');
    
    await seedSkills();
    console.log('\n----- SKILLS SEEDED -----\n');
    
    await seedJobContacts();
    console.log('\n----- JOB CONTACTS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
