import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2024-03-01' });

const result = await client
  .patch('clinicSettings-singleton')
  .setIfMissing({
    heroImageAlt: 'Modern Swastik Healthcare physiotherapy and rehabilitation clinic',
    heroPrimaryCtaLabel: 'Book an Appointment',
    heroSecondaryCtaLabel: 'View Physio Services',
  })
  .commit();

console.log(`Updated ${result._id} at ${result._updatedAt}`);
