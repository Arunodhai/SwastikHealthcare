import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';

// Complete Sanity Studio Configuration for Swastik Healthcare
// Project ID: 41uk25bi | Dataset: production

export const config = defineConfig({
  name: 'default',
  title: 'Swastik Healthcare CMS Studio',
  projectId: '41uk25bi',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

export default config;
