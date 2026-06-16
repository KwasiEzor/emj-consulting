'use client';

import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="glass-dark rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Partager cet article</h3>
      <div className="flex flex-wrap gap-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors"
        >
          <Facebook size={18} className="mr-2" />
          Facebook
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors"
        >
          <Twitter size={18} className="mr-2" />
          Twitter
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors"
        >
          <Linkedin size={18} className="mr-2" />
          LinkedIn
        </a>
        <button
          onClick={copyToClipboard}
          className="flex items-center px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors"
        >
          <LinkIcon size={18} className="mr-2" />
          {copied ? 'Copié !' : 'Copier le lien'}
        </button>
      </div>
    </div>
  );
}
