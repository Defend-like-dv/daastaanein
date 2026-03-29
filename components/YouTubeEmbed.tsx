export default function YouTubeEmbed({ videoId, title }: { videoId: string; title?: string }) {
  return (
    <div className="my-10">
      {/* Label */}
      <div
        className="font-sans text-[0.65rem] tracking-[.18em] uppercase font-medium mb-3 flex items-center gap-2"
        style={{ color: 'var(--accent)' }}
      >
        <span className="w-5 h-px" style={{ background: 'var(--accent)' }} />
        Listen to the song
      </div>

      {/* Responsive 16:9 iframe */}
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{
          paddingBottom: '56.25%',
          background: 'var(--bg2)',
          border: '1px solid var(--divide)',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={title ?? 'Song'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  )
}
