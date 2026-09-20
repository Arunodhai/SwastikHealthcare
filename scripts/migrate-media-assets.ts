import { getCliClient } from 'sanity/cli';
import { GALLERY_ITEMS, TEAM_MEMBERS, TESTIMONIALS } from '../src/data/clinicData';

const client = getCliClient({ apiVersion: '2024-03-01' });

async function uploadRemoteImage(url: string, filename: string) {
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}',
    { filename },
  );
  if (existing?._id) return existing._id as string;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  const asset = await client.assets.upload('image', Buffer.from(await response.arrayBuffer()), { filename });
  return asset._id;
}

const transaction = client.transaction();
const updated: string[] = [];

for (const member of TEAM_MEMBERS) {
  const documentId = `team-${member.id}`;
  const assetId = await uploadRemoteImage(member.photo, `team-${member.id}.jpg`);
  transaction.patch(documentId, (patch) => patch.setIfMissing({
    photo: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
  }));
  updated.push(documentId);
}

for (const testimonial of TESTIMONIALS) {
  if (!testimonial.avatar) continue;
  const documentId = `testimonial-${testimonial.id}`;
  const assetId = await uploadRemoteImage(testimonial.avatar, `testimonial-${testimonial.id}.jpg`);
  transaction.patch(documentId, (patch) => patch.setIfMissing({
    avatar: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
  }));
  updated.push(documentId);
}

for (const item of GALLERY_ITEMS) {
  const documentId = `gallery-${item.id}`;
  const assetId = await uploadRemoteImage(item.image, `gallery-${item.id}.jpg`);
  transaction.patch(documentId, (patch) => patch.setIfMissing({
    image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
  }));
  updated.push(documentId);
}

const result = await transaction.commit({ autoGenerateArrayKeys: true });
console.log(JSON.stringify({ updatedDocuments: updated, transactionId: result.transactionId }, null, 2));
