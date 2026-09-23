import React, { useState } from 'react';
import { 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  ShieldCheck, 
  UploadCloud, 
  Key, 
  Layers, 
  FileText, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface SanityStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToStudio?: () => void;
}

export const SanityStatusModal: React.FC<SanityStatusModalProps> = ({ isOpen, onClose, onNavigateToStudio }) => {
  const { sanityStatus, refreshSanityData, seedSanity, isLoading } = useClinic();
  const [activeTab, setActiveTab] = useState<'status' | 'seed' | 'instructions'>('status');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Seed state
  const [seedToken, setSeedToken] = useState('');
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState<string | null>(null);
  const [seedError, setSeedError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshSanityData();
    setIsRefreshing(false);
  };

  const handleRunSeed = async () => {
    if (!seedToken.trim()) {
      setSeedError('Please paste your Sanity API Write Token from manage.sanity.io');
      return;
    }
    setIsSeeding(true);
    setSeedError(null);
    setSeedSuccess(null);
    try {
      await seedSanity(seedToken.trim());
      setSeedSuccess('Successfully seeded all clinic data into your Sanity dataset! The site is now completely live from Sanity CMS.');
      await refreshSanityData();
    } catch (err: any) {
      setSeedError(err?.message || 'Failed to seed Sanity dataset. Please verify your token has Editor permissions.');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col border border-slate-200">
        
        {/* Modal Topbar */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/90">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#f03e2f] text-white flex items-center justify-center font-bold shadow-md shadow-[#f03e2f]/20">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-bold text-[#0f2330] font-heading">
                  Sanity CMS Manager
                </h3>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                  sanityStatus.hasCustomContent 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-blue-100 text-blue-800 border-blue-300'
                }`}>
                  {sanityStatus.hasCustomContent ? 'Live Sanity Data' : 'Connected (Fallback Active)'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Project ID: <span className="font-mono font-semibold text-slate-800">{sanityStatus.projectId}</span> • Dataset: <span className="font-mono font-semibold text-slate-800">{sanityStatus.dataset}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-6 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'status'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Connection &amp; Documents</span>
          </button>
          <button
            onClick={() => setActiveTab('seed')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'seed'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Seed Data to Sanity</span>
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'instructions'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Studio Access &amp; Guide</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm">
          
          {/* TAB 1: STATUS & DOCUMENT COUNTS */}
          {activeTab === 'status' && (
            <div className="space-y-5">
              {/* Status Banner */}
              <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                sanityStatus.connected 
                  ? (sanityStatus.hasCustomContent ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' : 'bg-blue-50/80 border-blue-200 text-blue-950')
                  : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}>
                {sanityStatus.connected ? (
                  <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${sanityStatus.hasCustomContent ? 'text-emerald-600' : 'text-blue-600'}`} />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm">
                      {sanityStatus.connected 
                        ? (sanityStatus.hasCustomContent ? 'Site is 100% Live from Sanity CMS' : 'Sanity Connected • Ready for Content')
                        : 'Checking Sanity Connection...'}
                    </p>
                  </div>
                  <p className="mt-1.5 text-slate-600 leading-relaxed">
                    {sanityStatus.hasCustomContent
                      ? `All content on this website is currently being served in real-time from your Sanity dataset "${sanityStatus.dataset}" (${sanityStatus.totalSanityDocs} published documents).`
                      : `Your website is connected to Sanity project "${sanityStatus.projectId}". Because the dataset is currently empty, the site is displaying the full clinic baseline so nothing is broken. Use the "Seed Data to Sanity" tab to push all clinic data into your Sanity project with one click!`}
                  </p>
                </div>
              </div>

              {/* Sanity Document Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                    Content Types &amp; Document Counts
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    {sanityStatus.hasCustomContent ? 'Live from Sanity' : 'Baseline Fallback Active'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <p className="text-[11px] text-slate-500 font-medium">Treatments</p>
                    <p className="text-lg font-bold text-slate-900">{sanityStatus.itemCounts.treatments}</p>
                    <p className="text-[10px] text-slate-400">Services &amp; Pricing</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <p className="text-[11px] text-slate-500 font-medium">Conditions</p>
                    <p className="text-lg font-bold text-slate-900">{sanityStatus.itemCounts.conditions}</p>
                    <p className="text-[10px] text-slate-400">Musculoskeletal</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <p className="text-[11px] text-slate-500 font-medium">Team Members</p>
                    <p className="text-lg font-bold text-slate-900">{sanityStatus.itemCounts.team}</p>
                    <p className="text-[10px] text-slate-400">Physiotherapists</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <p className="text-[11px] text-slate-500 font-medium">Testimonials</p>
                    <p className="text-lg font-bold text-slate-900">{sanityStatus.itemCounts.testimonials}</p>
                    <p className="text-[10px] text-slate-400">Verified Reviews</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <p className="text-[11px] text-slate-500 font-medium">Gallery</p>
                    <p className="text-lg font-bold text-slate-900">{sanityStatus.itemCounts.gallery}</p>
                    <p className="text-[10px] text-slate-400">Photos &amp; Rooms</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <p className="text-[11px] text-slate-500 font-medium">Locations</p>
                    <p className="text-lg font-bold text-slate-900">{sanityStatus.itemCounts.locations}</p>
                    <p className="text-[10px] text-slate-400">Kollam Clinics</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <p className="text-[11px] text-slate-500 font-medium">Custom Pages</p>
                    <p className="text-lg font-bold text-slate-900">{sanityStatus.itemCounts.customPages}</p>
                    <p className="text-[10px] text-slate-400">Dynamic Builder</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <p className="text-[11px] text-slate-500 font-medium">Clinic Settings</p>
                    <p className="text-sm font-bold text-emerald-700 mt-1">Configured</p>
                    <p className="text-[10px] text-slate-400">Hero, Hours, Phone</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`https://manage.sanity.io/projects/${sanityStatus.projectId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0f2330] hover:bg-[#193b50] text-white transition-colors inline-flex items-center gap-2 shadow-xs"
                >
                  <span>Open Sanity Project Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {onNavigateToStudio && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToStudio();
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Launch Sanity Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SEED DATA TO SANITY */}
          {activeTab === 'seed' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs leading-relaxed space-y-1.5">
                <h4 className="font-bold text-sm flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4 text-emerald-700" />
                  One-Click Sanity Population Tool
                </h4>
                <p>
                  This tool pushes the entire Swastik Healthcare clinic structure (all 6 Treatments, 6 Conditions, Team Members, Testimonials, Locations, Settings, and Custom Pages) directly into your Sanity project in <strong>one transaction</strong>.
                </p>
              </div>

              {seedSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">Migration Complete!</p>
                    <p className="mt-1">{seedSuccess}</p>
                  </div>
                </div>
              )}

              {seedError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Error uploading to Sanity</p>
                    <p className="mt-1">{seedError}</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Step 1: Get a Write Token from Sanity
                </label>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <p>
                    1. Open <a href={`https://manage.sanity.io/projects/${sanityStatus.projectId}/api`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline inline-flex items-center gap-1">manage.sanity.io &rarr; Project {sanityStatus.projectId} &rarr; API <ExternalLink className="w-3 h-3" /></a>
                  </p>
                  <p>
                    2. Click <strong>Add API token</strong>, name it <em>"Website Editor"</em>, and select <strong>Editor</strong> permission.
                  </p>
                  <p>
                    3. Copy the token and paste it below:
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Step 2: Paste Sanity Token
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    placeholder="sk... (Sanity Editor Token)"
                    value={seedToken}
                    onChange={(e) => setSeedToken(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>
              </div>

              <button
                onClick={handleRunSeed}
                disabled={isSeeding}
                className="w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-all flex items-center justify-center gap-2"
              >
                <UploadCloud className={`w-4 h-4 ${isSeeding ? 'animate-bounce' : ''}`} />
                <span>{isSeeding ? 'Pushing Documents to Sanity...' : 'Upload & Seed Everything to Sanity'}</span>
              </button>
            </div>
          )}

          {/* TAB 3: STUDIO ACCESS & HOW TO ADD PAGES */}
          {activeTab === 'instructions' && (
            <div className="space-y-5 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-[#0f2330] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  How to Add New Pages &amp; Manage Content
                </h4>
                <p>
                  With Sanity CMS, you have complete control over every single piece of text, photo, and page on this website:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                  <strong className="text-slate-900 block font-bold text-sm">1. Adding New Treatments &amp; Services</strong>
                  <p className="text-slate-600">
                    Create a new <code>treatment</code> document in Sanity. The website will immediately generate a dedicated page at <code>/treatments/your-slug</code> with its own benefits, FAQs, and booking triggers.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                  <strong className="text-slate-900 block font-bold text-sm">2. Adding New Musculoskeletal Conditions</strong>
                  <p className="text-slate-600">
                    Create a new <code>condition</code> document in Sanity. It will automatically show up in the conditions directory and have its own page at <code>/conditions/your-slug</code>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                  <strong className="text-slate-900 block font-bold text-sm">3. Creating Arbitrary Custom Pages (NDIS, Rates, Telehealth)</strong>
                  <p className="text-slate-600">
                    Create a new <code>customPage</code> document. Give it a slug (e.g. <code>ndis-support</code>), banner image, and content sections with bullet points. It automatically renders at <code>/pages/ndis-support</code>!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                  <strong className="text-slate-900 block font-bold text-sm">4. Deploying Sanity Studio to the Web</strong>
                  <p className="text-slate-600">
                    To have an online editorial dashboard at <code>swastik-healthcare.sanity.studio</code> where your team can log in from anywhere:
                  </p>
                  <pre className="bg-slate-900 text-slate-200 p-2.5 rounded-lg text-[11px] font-mono mt-1.5 overflow-x-auto">
                    npx sanity deploy
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Checking...' : 'Refresh Sanity Content'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#0f2330] hover:bg-[#193b50] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
