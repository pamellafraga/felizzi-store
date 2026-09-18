export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12.04 3.1A8.9 8.9 0 0 0 3.2 12c0 1.56.4 3.07 1.17 4.4L3 21l4.73-1.24A8.9 8.9 0 0 0 21 12.04 8.9 8.9 0 0 0 12.04 3.1Zm0 16.27a7.35 7.35 0 0 1-3.74-1.03l-.27-.16-2.8.73.75-2.73-.17-.28a7.36 7.36 0 1 1 6.23 3.47Zm4.26-5.5c-.23-.12-1.37-.68-1.58-.75-.21-.08-.37-.12-.52.12-.16.23-.6.75-.73.9-.14.16-.27.18-.5.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.28-1.59-.13-.23-.01-.35.1-.47.1-.1.23-.27.34-.4.12-.14.16-.23.23-.39.08-.16.04-.3-.02-.42-.06-.12-.52-1.26-.71-1.72-.19-.45-.38-.39-.52-.4h-.44c-.16 0-.42.06-.64.3-.23.23-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.37-.56 1.56-1.1.19-.54.19-1 .13-1.1-.06-.1-.21-.16-.44-.27Z" />
    </svg>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}
